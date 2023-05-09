---
title:  "Python Bluetooth Locker"
excerpt: "Spent a few hours writing the first python-tk gui app!"
# subtitle: " "
tag: "Misc"
layout: post
---

As I was looking for an app that supports auto lock when I'm away from my desk... I couldn't find any that works with my Android phone, not even Microsoft's native one.
So I decided to write one myself.

First time writing a program with GUI, with the help of chatGPT... we have this one.

Setting a shortcut pointing to this target:
`"pythonw.exe" bluetoothlocker.py`
and it works.

```python
import tkinter as tk
import time
import bluetooth
import logging
import ctypes
import threading

global socket
global thread

MAC_ADDRESS = <MAC>
BT_NAME = <NAME>
PORT = 2

def lock_windows_screen():
    """Using the LockWorkStation to lock windows screen
    resume the program when the foreground window is not the locked window
    """
    ctypes.windll.user32.LockWorkStation()
    time.sleep(3)
    locked_window = ctypes.windll.user32.GetForegroundWindow()
    while ctypes.windll.user32.GetForegroundWindow() == locked_window:
        time.sleep(10)
    time.sleep(15)


class App:
    def __init__(self) -> None:

        # create the window
        root = tk.Tk()
        root.title("Bluetooth locker")
        self.root = root

        # create the start button and add click event handler
        start_button = tk.Button(root, text="Start", command=self.start_button_click)
        start_button.pack()
        self.start_button = start_button

        # create the stop button and disable it
        stop_button = tk.Button(root, text="Stop", command=self.stop_button_click, state="disabled")
        stop_button.pack()
        self.stop_button = stop_button
        self.stop_button_pressed = tk.BooleanVar()

        # create a text widget to display logger's output
        logger_text = tk.Text(root, height=10, width=60)
        logger_text.pack()

        # create a handler for the logger to output to the text widget
        class WidgetHandler(logging.Handler):
            def emit(self, record):
                msg = self.format(record) + '\n'
                root.after(0, lambda: logger_text.insert('end', msg))

        # configure logger to output to both console and text widget
        logger = logging.getLogger()
        logger.setLevel(logging.DEBUG)
        formatter = logging.Formatter('%(asctime)s - %(levelname)s : %(message)s')
        widget_handler = WidgetHandler(logging.DEBUG)
        widget_handler.setFormatter(formatter)
        logger.addHandler(widget_handler)

        self.logger = logger

    def start_button_click(self):
        # disable the start button
        self.start_button.config(state="disabled")
        # enable the stop button
        self.stop_button.config(state="normal")
        # disable the close button
        self.root.protocol("WM_DELETE_WINDOW", "")
        self.stop_button_pressed.set(False)

        thread = threading.Thread(target=self.main_loop)
        thread.start()

    def stop_button_click(self):
        self.logger.debug("stop button clicked")
        self.stop_button_pressed.set(True)


    def main_loop(self):
        """run an infinite loop that test connection to the mac_address every 10 seconds:
            using socket.connect for the first time to connect to the mac_address,
            then use test_if_connected to test if still connected
            If connection is broken, reconnect using socket.connect,
            and lock the windows screen
        """
        mac_address = MAC_ADDRESS
        bt_name = BT_NAME
        port = PORT
        socket = self.try_connect(mac_address, port, bt_name)
        while True:
            time.sleep(3)
            self.logger.debug("test connection again...")
            if not self.test_if_connected(socket, bt_name):
                lock_windows_screen()
                socket = self.try_connect(mac_address, port, bt_name)

            # check if stop button is pressed
            if self.stop_button_pressed.get():
                # if yes, close the socket connection
                socket.close()
                # change state of buttons
                self.start_button.config(state="normal")
                self.stop_button.config(state="disabled")
                # enable the close button
                # root.protocol("WM_DELETE_WINDOW", on_close)
                return

    def try_connect(self, mac_address, port, bt_name):
        try:
            global socket
            socket = bluetooth.BluetoothSocket(bluetooth.RFCOMM)
            socket.connect((mac_address, port))
        except OSError:
            self.logger.debug("Failed to connect to %s", mac_address)
            socket.close()
            return None
        else:
            self.logger.debug("Connected to %s", bt_name)
            self.logger.debug("MAC: %s", mac_address)
            return socket

    def test_if_connected(self, socket, bt_name):
        if socket is None:
            self.logger.debug("Lost connection to %s", bt_name)
            return False

        try:
            socket.send("1")
        except OSError:
            self.logger.debug("Lost connection to %s", bt_name)
            socket.close()
            return False
        else:
            self.logger.debug("Still connected to %s", bt_name)
            return True

app = App()
# start the window's event loop
app.root.mainloop()

```
