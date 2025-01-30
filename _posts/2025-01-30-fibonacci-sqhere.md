---
title:  "AIGC: Fibonacci Sphere Algorithm"
excerpt: "Visualization of how points may be evenly distributed on a sphere."
# subtitle: " "
tag: "Fast Algorithm"
layout: post
---

<style>
iframe {
    width: 100%;
    height: 500px;
    border: none
}
</style>

I want to have a visualization of how points may be evenly distributed on a sphere.

I found this question on Stackoverflow: [Evenly distributing n points on a sphere](https://stackoverflow.com/questions/9600801/evenly-distributing-n-points-on-a-sphere)
and I called [QWen-2.5](https://tongyi.aliyun.com/) in Code mode to generate the page for me. I think the outcome looks good.

I manually adjusted the camera position and point size and color for better visualization.

<iframe src="/fibonacci-sphere.html"></iframe>

There is only one single prompt:

```text
根据这个算法，生成一个网页，其中有一个拖动条可以控制这个参数n，你应该把这个python代码转为js代码，画出一个3d的球面图

` ` `python
import math


def fibonacci_sphere(samples=1000):

    points = []
    phi = math.pi * (math.sqrt(5.) - 1.)  # golden angle in radians

    for i in range(samples):
        y = 1 - (i / float(samples - 1)) * 2  # y goes from 1 to -1
        radius = math.sqrt(1 - y * y)  # radius at y

        theta = phi * i  # golden angle increment

        x = math.cos(theta) * radius
        z = math.sin(theta) * radius

        points.append((x, y, z))

    return points
` ` `

```


Reference:

[1]: González, Á. Measurement of Areas on a Sphere Using Fibonacci and Latitude–Longitude Lattices. Math Geosci 42, 49–64 (2010). https://doi.org/10.1007/s11004-009-9257-x
