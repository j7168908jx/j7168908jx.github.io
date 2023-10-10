---
title:  "Setup EasyConnect in Docker in WSL"
excerpt: "Limit EasyConnect inside the Container."
# subtitle: " "
tag: "Misc"
layout: post
---

# Setup Easyconnect in Docker in WSL

As watching videos in Bilibili, I found some said that EasyConnect (a VPN software used by many institutions in CN) might have abused its permissions.

The first, and the most vital evidence is that it installs a **Root CA** on your computer! The worst possibility is that it might be listening to your encrypted network traffic!

Luckily, netizens are developing ways to bypass this situation. Generally 3 options

- Uninstall and stop using EasyConnect;
- Inverse software engineering EasyConnect and develop an open source one;
- Limit the traffic that flows through the EasyConnect VPN gate.

Both the first and second ways are not that possible in that we need this functionality and don't want to do over much work on this software.

The best way then goes to limit EasyConnect.

To limit the traffic, the software must not run directly on the computer. Anyway, EasyConnect would finally install a CA that can detect all the traffic on that machine.
How to separate the software from the PC environment? Thanks to the Linux version of EasyConnect, we have generally 2 ways

- Buy a separate machine. Recently, soft--routers and NAS are becoming popular and most people can afford buying one. Installing a Linux environment and running EasyConnect there will be a simple choice.
- Use VM. Virtualization on the machine separates a different and (almost) isolated environment so that it would be rather safe running dooms inside.

Both ways require some basic knowledge of Linux commands and networking.

For me, I will install a docker environment on WSL2 so that this adds not much complexity to my working environment.

## Installing Docker on WSL2

Following the references will be rather fine to setup docker (and the docker backend) on the WSL2.

1. [Get started with Docker remote containers on WSL 2](https://learn.microsoft.com/en-us/windows/wsl/tutorials/wsl-containers)
1. [Docker Desktop WSL 2 backend on Windows
](https://docs.docker.com/desktop/windows/wsl/)

While I was testing the connectivity from WSL(ubuntu) to docker daemon. I encountered

```shell
$ docker run hello-world
docker: Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?.
```

The answer is from the comment of this question

[Why am I getting a "Cannot connect to the Docker daemon" error in WSL2?](https://stackoverflow.com/questions/60708229/why-am-i-getting-a-cannot-connect-to-the-docker-daemon-error-in-wsl2)

It works after `unset DOCKER_HOST`, although I didn't find the corresponding one when I tried `env | grep DOCKER`.

## Start EasyConnect Container in Docker

Following the instructions above, you should have already downloaded the Docker Desktop application and have tested the `hello-world` container.

Now, copy the command to pull the images from docker hub:

```shell
docker run  --device /dev/net/tun --cap-add NET_ADMIN -ti -p 127.0.0.1:1080:1080 -p 127.0.0.1:8888:8888 -v /tmp/.X11-unix:/tmp/.X11-unix -e EC_VER=7.6.7 -e DISPLAY hagb/docker-easyconnect:vncless-7.6.7
```

This starts a container preconfigured to run EasyConnect v7.6.7(Check your version before running!). If nothing goes wrong, an EasyConnect console will appear and it will be just the same as if you start EasyConnect normally from Windows.

Enter the address of your VPN server, and in my case, an error occurs:

```text
Path selection failed, possibly because network connection error occurs. Please try again later.
```

After browsing [reference](https://github.com/Hagb/docker-easyconnect/issues/184) and testing, the problem should be that another proxy (Clash) is running on windows. Close it for now, and we will come back to it after we have tested EasyConnect.

If EasyConnect proceeds to the normal procedure and a small logo is displayed indicating it is running, congraulations!

## Connecting to this EasyConnect

### From inside WSL2

We start from testing if SSH to a server inside local network (nn@10.0.0.1:6666) working. Configure SSH config in WSL2(`~/.ssh/config`)

```text
Host <hostname_alias>
    User nn
    Hostname 10.0.0.1
    Port 10666
    IdentityFile <file_path>
    ProxyCommand connect-proxy -S localhost:1080 %h %p

```

We will omit the explanation of each row in this config, just replace with your arguments. Save this config and install the required package

```shell
sudo apt update
sudo apt install connect-proxy
```

Try your connection

```shell
ssh <hostname_alias>
```

Congratulations if the connection works!

### From Windows

We will use Clash for Windows as the handler(router) of all traffic. It dispatches connections based on where you want to connect to.

You would probably need to open

- TUN mode (which enables to handle non-system handled traffic(usually non-HTTP traffic belongs to this);
- Mixin (which allows global injections into downloaded/configured proxy rules).

Remove the `10.0.0.0/8` entry in Bypass Domain/IPNet.

Change the mode of Mixin to JavaScript, and here's an example setting of Mixin (not a complete one, but you should be able to understand and edit JS scripts:-) :

```JavaScript
module.exports.parse = async (
  { content, name, url },
  { axios, yaml, notify }
) => {
  const extra1 = [{
    name: "vpn1",
    type: "socks5",
    server: "127.0.0.1",
    port: "1080"
  }];
  const extra2 = ["IP-CIDR,10.0.0.0/8,vpn1"];
  if ("proxies" in content) {
    content["proxies"] = [...extra1, ...content["proxies"]];
  }
  if ("rules" in content) {

    let hasIpAddr = false;

    for (let i = 0; i < content["rules"].length; i++) {
      if (content["rules"][i].startsWith('IP-CIDR,10.0.0.0')) {
        hasIpAddr = true;
        break;
      }
    }

    if (hasIpAddr) {
      content["rules"] = content["rules"].filter(item => !item.startsWith('IP-CIDR,10.0.0.0'));
    }
    content["rules"] = [...extra2, ...content["rules"]];
  }
  return content;
};
```

Congratulations!

## General Rule if some changes do not work

Restart everything related to your change. (Clash, WSL2, Docker Desktop)
