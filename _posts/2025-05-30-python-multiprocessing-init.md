---
title:  "Worker Initialization in Multiprocessing and Joblib"
subtitle: ""
tag: "Python"
layout: post
excerpt: "This post presents practical examples that demonstrate the complexity of worker initialization in Python's process-based parallelization."
toc: true
---

The story starts when I tried to implement a customized logger from the `logging` module in Python, which I wanted to use in a parallelized task. Then I defined a global variable logger and used tricks to ensure it is initialized when first imported. When I move on to parallelize my application, I was surprised (no I don't) to find that the logger's state was not preserved across different worker processes (i.e., the handlers, the formatters, etc.). This led me to investigate how worker processes are initialized in Python's `multiprocessing` and `joblib` packages.

There has been a long-standing issue regarding how the `multiprocessing` and `joblib` packages initialize worker processes. You may have heard of the terms `fork` and `spawn` in this context. This post examines some commonly confusing cases.

I believe the experience can be similarly applied to the case in Windows. The process initialization mechanism in Windows is different from that in Unix-like systems, but the principles of how modules are imported and how state is preserved across processes remain relevant.

**TL;DR:**

For `multiprocessing`:

- `fork` preserves the state of the parent process. Imported modules are not re-executed.
- `spawn` creates a new process and re-imports the module. The state of the parent process is not preserved.

| Multiprocessing | Re-imported? | Logger Handlers Preserved? |
|-----------------|--------------|----------------------------|
| `fork`          | No           | Yes                        |
| `spawn`         | Yes          | No                         |

For `joblib`:

- The `loky` backend in `joblib` behaves similarly to `spawn`. It starts fresh and does not inherit the parent process state.
- However, the `loky` backend sometimes reuses existing worker processes. In such cases, the worker’s state is preserved across different `joblib` `Parallel` calls. It is **not safe to assume a clean state** at the beginning of every task.
- Even when `loky` is not reusing workers, one should be careful that it only re-imports the module when something is explicitly called in the task. See the following summary table.

| #  | # jobs | # tasks | What                                                    | Foo re-imported? | Bar re-imported? | Baz re-imported? | Why                                                                |
|----|--------|---------|---------------------------------------------------------|------------------|------------------|------------------|--------------------------------------------------------------------|
| 1  | 2      | 2       | call f() in foo                                         | Yes              | **No**           | **No**           | Only f() is called                                                 |
| 2  | 2      | 6       | call f() in foo again                                   | **No**           | No               | No               | Process reusing                                                    |
| 3  | 2      | 2       | call f2() in foo                                        | **No**           | No               | No               | same as #2                                                         |
| 4  | 2      | 6       | call f2() in foo again                                  | **No**           | No               | No               | Process reusing, causing more handlers appended to the same logger |
| 5  | 3      | 2       | call f2() in foo again                                  | **No**           | No               | No               | Process not reusing                                                |
| 6  | 6      | 6       | call f2() in foo again                                  | **No**           | No               | No               | same as #5                                                         |
| 7  | 2      | 2       | call g() in bar                                         | No               | Yes              | **Yes**          | bar is re-imported                                                 |
| 8  | 3      | 2       | print global value in bar                               | No               | **No**           | No               | value is already serialized to worker (guess)                      |
| 9  | 2      | 2       | instantiate class Bar in bar                            | No               | **Yes**          | Yes              | class instantiate is somehow like function call                    |
| 10 | 3      | 2       | call global instance Bar's methods (defined in Bar)     | No               | **Yes**          | Yes              | method call is somehow like function call                          |
| 11 | 4      | 2       | call global instance Baz's methods (**defined in Bar**) | No               | **No**           | **Yes**          | method is defined in baz only (guess)                              |

Source code and raw output are simply listed below.


## Method

I create three Python scripts: `foo.py`, `main.py`, and `main2.py` for testing.
`main.py` tests the `multiprocessing` package, while `main2.py` tests the `joblib` package.

I use logging to simulate the state of the parent process. Specifically, the number of handlers attached to the logger serves as our "state."

```python
# foo.py
import time
import logging
import os

print("foo top level")

def print_handlers():
    logger = logging.getLogger()
    print("logger.handlers:", logger.handlers)


def f():
    time.sleep(1)
    print("foo.f() call, pid =", os.getpid())
    print("foo.f() logger: ", end="")
    print_handlers()
    logging.getLogger().info("foo.f() logger info message")

def f2():
    # add handler to the root logger
    time.sleep(1)
    logging.getLogger().addHandler(logging.StreamHandler())
    print("foo.f2() call, pid =", os.getpid())
    print("foo.f2() logger: ", end="")
    print_handlers()
```

```python
# bar.py
import time
import os
from baz import Baz

print("bar top level")
bar_global_value = "bar_global_value"

def g():
    time.sleep(0.5)
    print("bar.g() call, pid =", os.getpid())


class Bar:
    def __init__(self):
        print("bar.Bar.__init__() call, pid =", os.getpid())

    def print(self):
        print("bar.Bar.print() call, pid =", os.getpid())

bar_global_instance = Bar()
baz_global_instance = Baz()
```

```python
# baz.py
import os
print("baz top level")

class Baz:
    def __init__(self):
        print("baz.Baz.__init__() call, pid =", os.getpid())

    def print(self):
        print("baz.Baz.print() call, pid =", os.getpid())

```

```python
# main.py
from multiprocessing import Process
from foo import f, print_handlers
import multiprocessing
import logging

def run():
    ctx = multiprocessing.get_context('spawn')
    p = ctx.Process(target=f)
    p.start()
    p.join()

def run2():
    p = Process(target=f)
    p.start()
    p.join()

if __name__ == "__main__":
    # set a special handler for the root logger
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    print_handlers()
    print("main spawn")
    run()
    print("main fork")
    run2()
```

```python
# main2.py
import os
from joblib import Parallel, delayed
import logging
import time

from foo import f, print_handlers, f2
from bar import g, bar_global_value, Bar, bar_global_instance, baz_global_instance

print("main top level")

def getbar():
    g()

def getbar2():
    time.sleep(0.5)
    print("bar_global:", bar_global_value)

def getbar3():
    time.sleep(0.5)
    b = Bar()
    print("get_bar3 call, pid =", os.getpid())

def getbar4():
    time.sleep(0.5)
    bar_global_instance.print()

def getbar5():
    time.sleep(0.5)
    baz_global_instance.print()

if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')
    print_handlers()

    print("===main first round===")
    result = Parallel(n_jobs=2)(delayed(f)() for i in range(2))

    print("===main second round===")
    result = Parallel(n_jobs=2)(delayed(f)() for i in range(6))

    print("===main third round===")
    result = Parallel(n_jobs=2)(delayed(f2)() for i in range(2))

    print("===main fourth round===")
    result = Parallel(n_jobs=2)(delayed(f2)() for i in range(6))

    print("===main fifth round===")
    result = Parallel(n_jobs=3)(delayed(f2)() for i in range(2))

    print("===main sixth round===")
    result = Parallel(n_jobs=6)(delayed(f2)() for i in range(6))

    print("===main seventh round===")
    result = Parallel(n_jobs=2)(delayed(getbar)() for i in range(2))

    print("===main eighth round===")
    result = Parallel(n_jobs=3)(delayed(getbar2)() for i in range(2))

    print("===main ninth round===")
    result = Parallel(n_jobs=2)(delayed(getbar3)() for i in range(2))

    print("===main tenth round===")
    result = Parallel(n_jobs=3)(delayed(getbar4)() for i in range(2))

    print("===main eleventh round===")
    result = Parallel(n_jobs=4)(delayed(getbar5)() for i in range(2))
```

## Results


Now let's run the `main.py` script:

```bash
$ python main.py
foo top level
logger.handlers: [<StreamHandler>]
main spawn
foo top level
foo.f() call, pid = 18140
foo.f() logger: logger.handlers: []
main fork
foo.f() call, pid = 18157
foo.f() logger: logger.handlers: [<StreamHandler>]
2025-05-31 11:34:40,151 - INFO - foo.f() logger info message
```

Running `main.py`, I observe that:

1. In `spawn` mode, logger handlers from the parent are not preserved.
2. In `fork` mode, logger handlers are preserved.


I then run the `main2.py` script:

```bash
$ python main2.py
foo top level
baz top level
bar top level
bar.Bar.__init__() call, pid = 16370
baz.Baz.__init__() call, pid = 16370
main top level
logger.handlers: [<StreamHandler>]
===main first round===
foo top level
foo top level
foo.f() call, pid = 16436
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16437
foo.f() logger: logger.handlers: []
===main second round===
foo.f() call, pid = 16436
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16437
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16436
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16437
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16436
foo.f() logger: logger.handlers: []
foo.f() call, pid = 16437
foo.f() logger: logger.handlers: []
===main third round===
foo.f2() call, pid = 16437
foo.f2() call, pid = 16436
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() logger: logger.handlers: [<StreamHandler>]
===main fourth round===
foo.f2() call, pid = 16437
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 16436
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 16437
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 16436
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 16437
foo.f2() call, pid = 16436
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>, <StreamHandler>]
===main fifth round===
foo top level
foo top level
foo.f2() call, pid = 16593
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16594
foo.f2() logger: logger.handlers: [<StreamHandler>]
===main sixth round===
foo top level
foo top level
foo top level
foo top level
foo top level
foo top level
foo.f2() call, pid = 16660
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16658
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16661
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16659
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16663
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 16662
foo.f2() logger: logger.handlers: [<StreamHandler>]
===main seventh round===
baz top level
bar top level
bar.Bar.__init__() call, pid = 16733
baz.Baz.__init__() call, pid = 16733
baz top level
bar top level
bar.Bar.__init__() call, pid = 16732
baz.Baz.__init__() call, pid = 16732
bar.g() call, pid = 16733
bar.g() call, pid = 16732
===main eighth round===
bar_global: bar_global_value
bar_global: bar_global_value
===main ninth round===
baz top level
bar top level
bar.Bar.__init__() call, pid = 16876
baz.Baz.__init__() call, pid = 16876
baz top level
bar top level
bar.Bar.__init__() call, pid = 16877
baz.Baz.__init__() call, pid = 16877
bar.Bar.__init__() call, pid = 16876
get_bar3 call, pid = 16876
bar.Bar.__init__() call, pid = 16877
get_bar3 call, pid = 16877
===main tenth round===
baz top level
bar top level
bar.Bar.__init__() call, pid = 16944
baz.Baz.__init__() call, pid = 16944
baz top level
bar top level
bar.Bar.__init__() call, pid = 16945
baz.Baz.__init__() call, pid = 16945
bar.Bar.print() call, pid = 16944
bar.Bar.print() call, pid = 16945
===main eleventh round===
baz top level
baz top level
baz.Baz.print() call, pid = 17011
baz.Baz.print() call, pid = 17010
```

Running `main2.py`, I observe the following:

1. In the 1st round, the `loky` backend does not preserve logger handlers.
1. Comparing the 1st and 2nd rounds (same `n_jobs`, more tasks), `joblib` reuses worker processes across different calls. This reuse is independent of the number of tasks.
1. In the 3rd and 4th rounds, reused worker processes retain their state (i.e., additional handlers) across different calls.
1. In the 5th round, even though the number of tasks is the same as in the 3rd, a change in `n_jobs` causes `joblib` to spawn new workers instead of reusing old ones.
1. When workers are not reused, the module is re-imported, which is evident from the foo top level print statements.
1. In the 7th and 8th rounds, the `bar` module is re-imported only when a function in `bar` is explicitly called in the task. The global variable `bar_global` is not re-imported, as shown in the 8th round.
1. In the 9th round, as expected, creating a new `Bar` instance triggers the re-import of the `bar` module, which is evident from the `bar.Bar.__init__()` print statements.
1. In the 10th round, to our suprise, the `bar_global_instance` behaves differently compared to the 8th round. It triggers the re-import of the `bar` module.
1. In the 11th round, the `bar` module is not re-imported however the `baz` module is re-imported.



## Notes

Environment:

```bash
$ python
Python 3.10.13 (main, Apr 18 2025, 16:11:27) [GCC 11.4.0] on linux

$ python -m pip freeze | grep joblib
joblib==1.3.2
```

I use `time.sleep` to ensure the task takes some time to execute.

Disclaimer: This post is only for fun and testing purpose. The code examples are simplified and may not cover all edge cases. Always refer to the official documentation for `multiprocessing` and `joblib` for production use.
Some of the text in this post is generated by GPT. However, the code examples are manually verified to ensure correctness.
