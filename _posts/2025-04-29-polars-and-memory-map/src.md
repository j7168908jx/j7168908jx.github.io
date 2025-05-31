---
title:  "Memory-Mapped Polars DataFrames and File Deletion in Linux"
subtitle: ""
tag: "Python"
layout: post
excerpt: ""
---

Key takeaways:

1. **File Deletion (`unlink`)**:
   - Removes the file’s *directory entry* (its name/path).
   - **Does *not* immediately remove the file’s data** if it's still opened by any process (via `open` or `mmap`).
   - The file’s **inode and data blocks** remain alive in the filesystem.
2. **Write After Delete**:
   - If a process holds an open file descriptor (or readable/writable mmap), it can **continue to read/write to the file**.
   - The data **goes to the same inode**, and is preserved in memory or on disk.
   - However, the file has **no name** in the filesystem anymore—it's "anonymous" until the process releases it.
3. **When the Process Exits**:
   - Once all file descriptors and memory mappings are closed, the kernel **frees the inode and reclaims the space**.
   - Any written data that was not persisted elsewhere is lost forever.


Memory mapping is a widely used technique to optimize memory usage and minimize unnecessary I/O operations.
Polars, a fast DataFrame library in Rust and Python, supports memory mapping for reading and writing DataFrames using the **Feather** file format—a simple, user-friendly flavor of the Arrow IPC format.

For performance reasons, we leverage Polars DataFrames to help reduce memory consumption when processing large volumes of data.

---

## Background

As many Python developers know, the Global Interpreter Lock (GIL) limits true thread-based parallelism for CPU-bound tasks (at least for now!). As a result, users often turn to **process-based parallelism**.
When parallelizing workloads over large datasets, it becomes important to efficiently share data across processes. Copying gigabytes of data for each worker would be highly inefficient, both in terms of time and memory.

This is where **memory mapping** becomes incredibly useful:
It allows multiple processes to access the same data **in memory** (read-only in this case) without duplicating it—saving substantial time and system resources.

---

## The Challenge

In my setup, I initially had **200 files** of **1 GB** each, ordered by date. Each processing task required reading data from **two sequential dates**. So for each task, I would need to read **2 GB** of data into memory if the work is parallelized to distinct processes.

My original approach:
- When a file was accessed for the first time, it would be read from the disk (compressed) and saved into a shared memory file.
- This shared memory was then memory-mapped into each worker process using Polars.

The results were excellent:
- Multiple processes could share the same memory-mapped data efficiently.
- Memory usage dropped from **400 GB** to around **200 GB**, which was critical since the machine only had **512 GB** of RAM.
- At Python's exit, I registered a cleanup function to delete these temporary shared files.

---

## Scaling Problem

However, the situation changed when the workload increased to **1000 files**, each still **1 GB**.

At this scale, I could no longer defer cleanup until the end. Instead, files had to be deleted **dynamically** as soon as they were no longer needed, to avoid running out of memory and disk space during computation.

Inspired by **C++ shared pointers**, I implemented a **reference counting** mechanism:
- A simple text file would track how many processes were still using each shared file.
- When the reference count dropped to zero, the file would be safely deleted.

---

## The Core Question

At this point, a critical question arose:

> **What happens if a file is memory-mapped into a process (e.g., via a Polars DataFrame), and another process deletes the underlying file?**

Would the memory mapping still work? Would the process crash? Would there be subtle corruption?

---

## Experiment Time

Let’s dive into an experiment to find out.



```python
import os
import psutil
import polars as pl
import numpy as np

if os.path.exists("/dev/shm/tmp.feather"):
    os.remove("/dev/shm/tmp.feather")

# create a large DataFrame with random data
a = np.random.randn(10**9)
b = pl.DataFrame(a)
# save the DataFrame to a uncompressed feather file
b.write_ipc("/dev/shm/tmp.feather", compression="uncompressed")

```


```python
%reset
```


```python
import os
import psutil
import polars as pl
import numpy as np

# define a printing function for memory monitor
def get_current_memory_usage(prev=None):
    memory = psutil.virtual_memory()
    if prev is None:
        # print all types of memory in MB
        print(f"Total Memory: {memory.total / (1024 ** 2):.2f} MB")
        print(f"Available Memory: {memory.available / (1024 ** 2):.2f} MB")
        print(f"Used Memory: {memory.used / (1024 ** 2):.2f} MB")
        print(f"Free Memory: {memory.free / (1024 ** 2):.2f} MB")
        print(f"active: {memory.active / (1024 ** 2):.2f} MB")
        print(f"inactive: {memory.inactive / (1024 ** 2):.2f} MB")
        print(f"buffered: {memory.buffers / (1024 ** 2):.2f} MB")
        print(f"cached: {memory.cached / (1024 ** 2):.2f} MB")
        print(f"shared: {memory.shared / (1024 ** 2):.2f} MB")
        print(f"slab: {memory.slab / (1024 ** 2):.2f} MB")
    else:
        # print the difference in memory usage
        print(f"Avail Change: {memory.available / (1024 ** 2) - prev.available / (1024 ** 2):+.2f} MB")
        print(f"Used Change: {memory.used / (1024 ** 2) - prev.used / (1024 ** 2):+.2f} MB")
        print(f"Free Change: {memory.free / (1024 ** 2) - prev.free / (1024 ** 2):+.2f} MB")
        print(f"active Change: {memory.active / (1024 ** 2) - prev.active / (1024 ** 2):+.2f} MB")
        print(f"inactive Change: {memory.inactive / (1024 ** 2) - prev.inactive / (1024 ** 2):+.2f} MB")
        print(f"buffered Change: {memory.buffers / (1024 ** 2) - prev.buffers / (1024 ** 2):+.2f} MB")
        print(f"cached Change: {memory.cached / (1024 ** 2) - prev.cached / (1024 ** 2):+.2f} MB")
        print(f"shared Change: {memory.shared / (1024 ** 2) - prev.shared / (1024 ** 2):+.2f} MB")
        print(f"slab Change: {memory.slab / (1024 ** 2) - prev.slab / (1024 ** 2):+.2f} MB")
    return memory

prev = get_current_memory_usage()
```

    Total Memory: 515866.79 MB
    Available Memory: 498916.36 MB
    Used Memory: 6385.39 MB
    Free Memory: 497244.23 MB
    active: 920.27 MB
    inactive: 15717.31 MB
    buffered: 8.88 MB
    cached: 12228.29 MB
    shared: 7638.29 MB
    slab: 712.84 MB



```python
c = pl.read_ipc("/dev/shm/tmp.feather", memory_map=True)
prev = get_current_memory_usage(prev)
```

    Avail Change: -17.41 MB
    Used Change: +16.57 MB
    Free Change: -17.51 MB
    active Change: +0.85 MB
    inactive Change: +10.88 MB
    buffered Change: +0.00 MB
    cached Change: +0.94 MB
    shared Change: +0.86 MB
    slab Change: +0.30 MB



```python
import os
os.remove("/dev/shm/tmp.feather")
prev = get_current_memory_usage(prev)
```

    Avail Change: +5.14 MB
    Used Change: -5.60 MB
    Free Change: +5.08 MB
    active Change: +0.43 MB
    inactive Change: +6.89 MB
    buffered Change: +0.00 MB
    cached Change: +0.52 MB
    shared Change: +0.44 MB
    slab Change: -0.07 MB



```python
# remove dataframe
del c
prev = get_current_memory_usage(prev)
```

    Avail Change: +7630.62 MB
    Used Change: +6.18 MB
    Free Change: +7638.85 MB
    active Change: +0.45 MB
    inactive Change: -7627.67 MB
    buffered Change: +0.00 MB
    cached Change: -7645.03 MB
    shared Change: -7628.55 MB
    slab Change: -16.83 MB


From the experiment above, we observe an interesting result:
Even after the file is deleted from /dev/shm, the memory-mapped data remains accessible.

This naturally leads to the question: What does file deletion actually mean?

Fortunately, the answer isn't too complicated.
Linux manages files through file descriptors (fd) and memory mappings (mmap), maintaining internal references even after a file is "deleted."

Based on our experiment, we can infer that deleting a file primarily means removing its entry from the directory tree—not immediately erasing its data from storage.
The underlying inode (the actual file data structure) persists until all references to it (open file descriptors or active memory mappings) are closed. Only then is the storage space reclaimed.

This behavior isn't unique to memory-mapped files in /dev/shm;
It applies to files on traditional disk storage as well.
Disk space is only reclaimed once no process holds an open file descriptor or a memory mapping to the deleted file.

---

Note: the texts are partially generated by AI.

