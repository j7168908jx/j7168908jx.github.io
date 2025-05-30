---
title:  "Worker Initialization in Multiprocessing and Joblib"
subtitle: ""
tag: "Python"
layout: post
excerpt: "This post presents practical examples that demonstrate the complexity of worker initialization in Python's process-based parallelization."
---

There has been a long-standing issue regarding how the `multiprocessing` and `joblib` packages initialize worker processes. You may have heard of the terms `fork` and `spawn` in this context. This post examines some commonly confusing cases.

**TL;DR:**

For `multiprocessing`:

- `fork` preserves the state of the parent process. Imported modules are not re-executed.
- `spawn` creates a new process and re-imports the module. The state of the parent process is not preserved.

For `joblib`:

- The `loky` backend in `joblib` behaves similarly to `spawn`. It starts fresh and does not inherit the parent process state.
- However, the `loky` backend sometimes reuses existing worker processes. In such cases, the worker’s state is preserved across different `joblib` `Parallel` calls. It is **not safe to assume a clean state** at the beginning of every task.

## Method

We create three Python scripts: `foo.py`, `main.py`, and `main2.py` for testing.
`main.py` tests the `multiprocessing` package, while `main2.py` tests the `joblib` package.

We use logging to simulate the state of the parent process. Specifically, the number of handlers attached to the logger serves as our "state."

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

def f2():
    # add handler to the root logger
    time.sleep(1)
    logging.getLogger().addHandler(logging.StreamHandler())
    print("foo.f2() call, pid =", os.getpid())
    print("foo.f2() logger: ", end="")
    print_handlers()

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
# joblib_main.py
from joblib import Parallel, delayed
from foo import f, print_handlers, f2
import logging
print("main top level")

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

```

## Results

Running `main.py`, we observe that:

1. In `spawn` mode, logger handlers from the parent are not preserved.
2. In `fork` mode, logger handlers are preserved.

Raw output:

```bash
$ python main.py
foo top level
logger.handlers: [<StreamHandler>]
main spawn
foo top level
foo.f() call, pid = 72230
foo.f() logger: logger.handlers: []
main fork
foo.f() call, pid = 72245
foo.f() logger: logger.handlers: [<StreamHandler>]
```

Running `main2.py`, we observe the following:

1. In the 1st round, the `loky` backend does not preserve logger handlers.
1. Comparing the 1st and 2nd rounds (same `n_jobs`, more tasks), `joblib` reuses worker processes across different calls. This reuse is independent of the number of tasks.
1. In the 3rd and 4th rounds, reused worker processes retain their state (i.e., additional handlers) across different calls.
1. In the 5th round, even though the number of tasks is the same as in the 3rd, a change in `n_jobs` causes `joblib` to spawn new workers instead of reusing old ones.
1. When workers are not reused, the module is re-imported, which is evident from the foo top level print statements.

```bash
$ python main2.py
foo top level
main top level
logger.handlers: [<StreamHandler>]
===main first round===
foo top level
foo top level
foo.f() call, pid = 76093
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76094
foo.f() logger: logger.handlers: []
===main second round===
foo.f() call, pid = 76093
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76094
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76094
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76093
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76094
foo.f() logger: logger.handlers: []
foo.f() call, pid = 76093
foo.f() logger: logger.handlers: []
===main third round===
foo.f2() call, pid = 76094
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76093
foo.f2() logger: logger.handlers: [<StreamHandler>]
===main fourth round===
foo.f2() call, pid = 76093
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 76094
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 76093
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 76094
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 76093
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>, <StreamHandler>]
foo.f2() call, pid = 76094
foo.f2() logger: logger.handlers: [<StreamHandler>, <StreamHandler>, <StreamHandler>, <StreamHandler>]
===main fifth round===
foo top level
foo top level
foo top level
foo.f2() call, pid = 76303
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76305
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76304
foo.f2() logger: logger.handlers: [<StreamHandler>]
===main sixth round===
foo top level
foo top level
foo top level
foo top level
foo top level
foo top level
foo.f2() call, pid = 76371
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76370
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76372
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76373
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76374
foo.f2() logger: logger.handlers: [<StreamHandler>]
foo.f2() call, pid = 76375
foo.f2() logger: logger.handlers: [<StreamHandler>]
```


## Environment

```bash
$ python
Python 3.10.13 (main, Apr 18 2025, 16:11:27) [GCC 11.4.0] on linux

$ python -m pip freeze | grep joblib
joblib==1.3.2
```
