---
title:  "Question (and Answer) List from Quantitative Researcher - Part 5. Others"
excerpt: "Other related problems"
# subtitle: " "
tag: "Quant"
layout: post-with-toc
---

<!-- template

- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  ...
  </summary>
  ...
  </details>

-->

## Misc

- <details><summary>What are the conditions for an integer matrix to have an inverse such that elements in this inverse are all integers?
  </summary>
  Sufficient and necessary condition would be the determinant being $\pm1$.

  Easily for necessary, $\mathrm{det}(A^{-1}) = 1/\mathrm{det}(A)$.

  For sufficiency, note that by the adjugate matrix, we have $A^{-1} = \mathrm{det}(A)^{-1} \mathrm{adj}(A)$.
  </details>

- <details><summary><cite>Redbook, 红薯哥.</cite>
  从一个数组中找出第二大的数，最少需要进行多少次比较?
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 红薯哥.</cite>
  已知y对x1和x2分别进行一元线性回归的R方，求y对x1和x2二元回归的R方的取值范围
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 维特根斯坦.</cite>
  Given noisy estimates of signed differences $d_{ij}$ between a set of $n$ real numbers $\{x_i\}$,

  find estimators $\{\hat x_i\}$ that minimize $\sum_{i,j}(d_{ij}-(\hat x_i- \hat x_j))^2$ subject to $\min(\hat x_i) = 0$.

  The data is given as a skew-symmetric matrix, $D_{n\times n} = (d_{ij})$, with $d_{ij}\approx x_i - x_j$. Write a program.
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  盒子里有 N+1 枚蓝球，N 枚红球，每次摸出蓝球得一元，摸出红球减一元，可以随时停止退出。问这个游戏的期望收益是多少?
  </summary>
  ...
  </details>

### Modeling

- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  $A$ 是 n 阶 01 矩阵，$A^2=0$，求矩阵中1的个数的最大值
  </summary>
  Convert this problem to the connectivity of directed graphs.

  The condition requires any path found on the graph cannot have length greater than $1$.

  These means the graph is separated into two parts. The maximum number must be $\mathrm{floor}(n/2) * (n-\mathrm{floor}(n/2))$
  </details>

