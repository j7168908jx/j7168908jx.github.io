---
title:  "Optimizing Business Code Using Eigen"
excerpt: "Always pay **great attention** when the requests are changed!!"
# subtitle: " "
tag: "High-performance Computing"
layout: post
---

It was this afternoon when my colleague came to me and told me my code was not performing well... in speed.
He showed me some hotspots on the flame graph for me to start.
The problem seems somewhat related to Eigen's array/matrix conversion.
Let's try it.

![](/assets/img/2023-02-22-optimizing-eigen-code/claymation-of-a-programmer-during-crunch-time.webp){: width="400"}
<center>https://openart.ai/discovery/sd-1006285672442761266</center>

The code itself can be abstracted like this [1a].
It is equivalent to testing if the smallest distance between two vectors is above a lower bound.
It was designed to run on a relatively large `n>=50,` but currently, the tests (in the business) focus mainly on `n` about 1, 2, or 3.

Here we have some definitions before the following code snippet:

```c++
using vector = Eigen::VectorXd;
```

`n` and `total_iters` are passed in as parameters in the shell command.
Some variables come in abbreviations. Hope that they will not affect the reading.

```c++
// [1a]
    vector cu(n), u(n), uu(n);
    double e1 = 1e-8, e2 = 1e-6, ch=1e-4, hh=1e-3;

    for (int i = 0; i < 1000000; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;
        Eigen::Array<FP, Eigen::Dynamic, 1> ae = e1 * ls.cwiseAbs().array() + e2;

        bool flag = (ae - (ns - ls).cwiseAbs().array()).minCoeff() >= 0;
    }
```

Testing the speed of the code...

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 4.26199e+06 us
Function cost: 534654 us
Function cost: 202414 us
Function cost: 121498 us
Function cost: 110764 us
Function cost: 109624 us
Function cost: 103853 us
```

Okay, try to reduce the `.array()` operation:

```c++
// [1b]
    for (int i = 0; i < 1000000; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;

        bool flag = ((e1 * ls.cwiseAbs() - (ns - ls).cwiseAbs()).array() + e2).minCoeff() >= 0;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 3.79126e+06 us
Function cost: 428019 us
Function cost: 140856 us
Function cost: 81426 us
Function cost: 74258 us
Function cost: 73070 us
Function cost: 72077 us
```

Wow. Why not again reduce the `.array()` operation?

```c++
// [1c]
    vector ee2(n);
    ee2.setConstant(e2);

    t1.start();
    for (int i = 0; i < 1000000; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;

        bool flag = ((e1 * ls.cwiseAbs() - (ns - ls).cwiseAbs() + ee2)).minCoeff() >= 0;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 3.80329e+06 us
Function cost: 427039 us
Function cost: 141791 us
Function cost: 79205 us
Function cost: 72939 us
Function cost: 71640 us
Function cost: 70065 us
```

Hmmm. Not that effective. But at least I know how to eliminate the vector `ee2`.


```c++
// [1d]
    for (int i = 0; i < 1000000; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;
        bool flag = ((e1 * ls.cwiseAbs() - (ns - ls).cwiseAbs())).minCoeff() >= -e2;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 3.82174e+06 us
Function cost: 427834 us
Function cost: 166692 us
Function cost: 78771 us
Function cost: 72967 us
Function cost: 72205 us
Function cost: 70529 us
```

How about setting aside some computation?

```c++
// [1e]
    for (int i = 0; i < 1000000; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;
        ns = -(ns - ls).cwiseAbs();
        bool flag = ((e1 * ls.cwiseAbs() + ns)).minCoeff() >= -e2;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 4.3066e+06 us
Function cost: 497025 us
Function cost: 150238 us
Function cost: 82568 us
Function cost: 74489 us
Function cost: 72516 us
Function cost: 70869 us
```

Oh no, that drastically reduces long vector operation speed. Let's get it back... and how about putting more computation into the single statement?

```c++
// [1f]
    for (int i = 0; i < 1000000; ++i) {
        vector ls = (u-uu) / hh;
        bool flag = ((e1 * ls.cwiseAbs() - ((cu-u) / ch - ls).cwiseAbs())).minCoeff() >= -e2;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 1.96975e+06 us
Function cost: 248907 us
Function cost: 73088 us
Function cost: 39330 us
Function cost: 36263 us
Function cost: 35825 us
Function cost: 35391 us
```

OHHHHHHHH! So the key is to reduce vector allocation(object allocation!)

![OHHHHHH](/assets/img/2023-02-22-optimizing-eigen-code/ohhhh.jpg){: width="600"}
<center>https://i2.hdslb.com/bfs/archive/d3e7600b11dafede431d35e81e8422ff9747c2fd.jpg</center>

Let's put it all into one!

```c++
// [1g]
    for (int i = 0; i < 1000000; ++i) {
        bool flag = ((e1 / hh * ((u-uu)).cwiseAbs() - ((cu-u) / ch - (u-uu) / hh).cwiseAbs())).minCoeff() >= -e2;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 1.97221e+06 us
Function cost: 251214 us
Function cost: 70014 us
Function cost: 39329 us
Function cost: 36254 us
Function cost: 35834 us
Function cost: 35414 us
```

Haha, that's right. Eigen will allocate the necessary temporary space for variables since the evaluation is too complicated to do without extra space.


```c++
// [1h]
    for (int i = 0; i < 1000000; ++i) {
        bool flag = ((e1 * ((u-uu)).cwiseAbs() - ((cu-u) / ch * hh- (u-uu)).cwiseAbs())).minCoeff() >= -e2 * hh;
    }
```

```shell
$ ./test.x 1000 && ./test.x 100 && ./test.x 20 && ./test.x 10 && ./test.x 3 && ./test.x 2 && ./test.x 1
Function cost: 149362 us
Function cost: 12280 us
Function cost: 5259 us
Function cost: 1318 us
Function cost: 879 us
Function cost: 882 us
Function cost: 876 us
```

EMMMMMMMMM??????????????????? What's happening???? I know it probably gives some speedup, but ... what?
Add a safety check to ensure the computation is actually happening.
Also, add more trial times to ensure the total time will be in several seconds.
(P.S. I changed from `gettimeofday` to `std::chrono` but found little timing difference.)

```c++
// [2h]
    std::vector<int> a(total_times, 0);

    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        a[i] = ((e1 * ((u-uu)).cwiseAbs() - ((cu-u) / ch * hh- (u-uu)).cwiseAbs())).minCoeff() >= -e2 * hh;
    }
    auto end = std::chrono::high_resolution_clock::now();


    return std::accumulate(a.begin(), a.end(), 0ll);
```

```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 1787762 us, iteration = 1M iter.
Function cost: 1768469 us, iteration = 10M iter.
Function cost: 1758746 us, iteration = 50M iter.
Function cost: 1759887 us, iteration = 100M iter.
Function cost: 702713 us, iteration = 100M iter.
Function cost: 356687 us, iteration = 100M iter.
Function cost: 353405 us, iteration = 100M iter.
```

The time cost does rise to something normal. Let's compare it to other previous versions.

```c++
// [2g]
    std::vector<int> a(1000000, 0);

    t1.start();
    for (int i = 0; i < 1000000; ++i) {
        a[i] = ((e1 / hh * ((u-uu)).cwiseAbs() - ((cu-u) / ch - (u-uu) / hh).cwiseAbs())).minCoeff() >= -e2;
    }
    t1.stop();

    return std::accumulate(a.begin(), a.end(), 0);
```

```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 3566737 us, iteration = 1M iter.
Function cost: 3549733 us, iteration = 10M iter.
Function cost: 3563195 us, iteration = 50M iter.
Function cost: 3591849 us, iteration = 100M iter.
Function cost: 1411591 us, iteration = 100M iter.
Function cost: 710022 us, iteration = 100M iter.
Function cost: 703551 us, iteration = 100M iter.
```


So it looks like the final optimization really has a good effect. Let's test against the first version.

```c++
// [2a]
    std::vector<int> a(total_times, 0);

    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;
        Eigen::Array<FP, Eigen::Dynamic, 1> ae = e1 * ls.cwiseAbs().array() + e2;

        a[i] = (ae - (ns - ls).cwiseAbs().array()).minCoeff() >= 0;
    }
    auto end = std::chrono::high_resolution_clock::now();
```

```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 4753151 us, iteration = 1M iter.
Function cost: 5620846 us, iteration = 10M iter.
Function cost: 10190706 us, iteration = 50M iter.
Function cost: 12253938 us, iteration = 100M iter.
Function cost: 11553031 us, iteration = 100M iter.
Function cost: 10748303 us, iteration = 100M iter.
Function cost: 10594569 us, iteration = 100M iter.
```


Here we can see the initial version will cause significant performance issues when the scale is small.
This explains why my colleague will complain about the code.


```c++
// [2c]
    vector ee2(n);
    ee2.setConstant(e2);
    std::vector<int> a(total_times, 0);

    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;

        a[i] = ((e1 * ls.cwiseAbs() - (ns - ls).cwiseAbs() + ee2)).minCoeff() >= 0;
    }
    auto end = std::chrono::high_resolution_clock::now();
```

```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 4542773 us, iteration = 1M iter.
Function cost: 4978909 us, iteration = 10M iter.
Function cost: 7773574 us, iteration = 50M iter.
Function cost: 9694908 us, iteration = 100M iter.
Function cost: 7896457 us, iteration = 100M iter.
Function cost: 7739315 us, iteration = 100M iter.
Function cost: 7388428 us, iteration = 100M iter.
```


```c++
// [2b]
    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        vector ns = (cu-u) / ch;
        vector ls = (u-uu) / hh;

        a[i] = ((e1 * ls.cwiseAbs() - (ns - ls).cwiseAbs()).array() + e2).minCoeff() >= 0;
    }
    auto end = std::chrono::high_resolution_clock::now();
```


```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 4574839 us, iteration = 1M iter.
Function cost: 4959054 us, iteration = 10M iter.
Function cost: 7742486 us, iteration = 50M iter.
Function cost: 8830995 us, iteration = 100M iter.
Function cost: 7893616 us, iteration = 100M iter.
Function cost: 7492250 us, iteration = 100M iter.
Function cost: 7368494 us, iteration = 100M iter.
```

These two show that there will not be much difference if we use or don't use `.array()` here.


Back to optimizing, comparing to [2h], if we unfold the vector add/sub...

```c++
// [2i]
    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        a[i] = ((e1 * ((u-uu)).cwiseAbs() - (cu / ch * hh - u * (1 + hh/ch) + uu).cwiseAbs())).minCoeff() >= -e2 * hh;
    }
    auto end = std::chrono::high_resolution_clock::now();
```
```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 1774530 us, iteration = 1M iter.
Function cost: 1750331 us, iteration = 10M iter.
Function cost: 1759521 us, iteration = 50M iter.
Function cost: 1757114 us, iteration = 100M iter.
Function cost: 700923 us, iteration = 100M iter.
Function cost: 370994 us, iteration = 100M iter.
Function cost: 263239 us, iteration = 100M iter.
```
Speeds for size 1 and size 2 vectors differ, and it costs slightly more for size 2.
(P.s. I have tested them many times, and the difference still exists.)

```c++
// [2j]
    auto start = std::chrono::high_resolution_clock::now();
    for (long long i = 0; i < total_times; ++i) {
        a[i] = (((e1*u-e1*uu).cwiseAbs() - (cu / ch * hh - u * (1 + hh/ch) + uu).cwiseAbs())).minCoeff() >= -e2 * hh;
    }
    auto end = std::chrono::high_resolution_clock::now();
```

```shell
$ ./test.x 1000 1 && ./test.x 100 10 && ./test.x 20 50 && ./test.x 10 100 && ./test.x 3 100 && ./test.x 2 100 && ./test.x 1 100
Function cost: 1784462 us, iteration = 1M iter.
Function cost: 1752745 us, iteration = 10M iter.
Function cost: 1758610 us, iteration = 50M iter.
Function cost: 1766483 us, iteration = 100M iter.
Function cost: 709392 us, iteration = 100M iter.
Function cost: 365841 us, iteration = 100M iter.
Function cost: 263375 us, iteration = 100M iter.
```

Moving `e1` inside slightly (but stably) increases the speed of size 2.

That's it! I don't have any faster way to this one... Help me if you can beat this!
