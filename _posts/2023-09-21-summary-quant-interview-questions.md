---
title:  "Question (and Answer) List from Quantitative Finance Interview"
excerpt: "More than a copy of it"
# subtitle: " "
tag: "Quant"
layout: post-with-toc
---

## From Redbook

### from 红薯哥


- 在单位圆内随机扔两个点A和B，三角形OAB是钝角三角形的概率。

- 绿皮书上的醉汉选座位拓展到k个醉汉的情形。

- 一个圆随机生成三条弦把圆划分的区域数量的期望

- 已知y对x1和x2分别进行一元线性回归的R方，求y对x1和x2二元回归的R方的取值范围

- 有一个三角形ABC，一开始在A点，每一时刻向每个点移动的概率都是1/2，求第一次把每一条边都走过的移动次数的期望。然后再拓展至四面体ABCD的情形

- Assume $X, Y$ are i.i.d. standard normal distribution r.v., find the expectation and variance of $(X ~\text{given}~ X+Y=1)$.

- 从一个数组中找出第二大的数，最少需要进行多少次比较?

- 在球面上任取 5 个点，位于同一个半球的概率是多少?

- There are N people arriving between 9 a.m. and 10 a.m.. Each waits for 15 minutes afterarrival. What is the probability that they meet each other given their arrival time is uniformly distributed.

- Draw N (N > 3) i.i.d. points uniformly from interval $(0, 1]$. Define the neighbor of a point as the closest point to it (excluding itself). If the neighbor of its neighbor is the point itself we call this point a good point. The expectation of the number of good points is $f(N)$. What is $f(N)$ in general?

- Expected arc length between two points on the unit sphere.

- Three frogs are jumping on the vertices of an equilateral triangle. A vertex can be occupied by more than one frog. Every minute, each frog jumps from the vertex where it is located to one of the other two vertices, each being equal likely. The frogs choose where to jump independently of each other. If initially each vertex contains exactly one frog, how long does it take on average for all the frogs to meet at the same vertex?

- The numbers $x_1, x_2, x_3, \dots$ are chosen uniformly at random from $[0, 1]$ and independently from each other as long as they follow the pattern $x_1 \gt x_2$, $x_2 \lt x_3$, $x_3\gt x_4$, $x_4 \lt x_5, \dots$. How many numbers on average can be chosen before the pattern is broken?

- Two boxes, A and B contain n balls each. In each step, you randomly choose a box and then draw one ball from it. Repeat this until the box you choose actually turns out to be empty. What's the expected number of remaining balls in the other box at the end of this process?

- Asymmetry random walk. 对于一个起点为 1 的一维非对称随机游走仅在原点处有一个吸收壁，求该随机游走被 0 处的吸收壁吸收时走过步数的数学期望。

- 有 N 个点均匀随机分布在半径为 1 的单位球中,设它们距离球心的距离为 $d_1, d_2, \dots d_N$. 设 $D = \min(d_1,d_2,\dots,d_N)$，求 $D$ 的中位数。

- If n is a random positive integer, what is the probability that $2^n$ starts with the digit 1?

### from AMC10

- Jason rolls three fair standard six-sided dice.Then he looks at the rolls and chooses a subsetof the dice (possibly empty, possibly all three dice) to reroll. After rerolling, he wins if and only if the sum of the numbers face up on the three diceis exactly 7. Jason always plays to optimize his chances of winning. What is the probability that he chooses to reroll exactly two of the dice?

## From StackOverflow (StackExchange)

### Biased Coin Flipping Game

- <details><summary>[Originated from here](https://math.stackexchange.com/questions/4634542/probability-of-winning-coin-game).
  You will play a coin game against an opponent. A biased coin will be continually flipped where there is a $2/3$ chance of Heads and a $1/3$ chance of Tails.
  If Heads is flipped then you receive $1$ from your opponent. If Tails is flipped then you pay $1$ to your opponent.
  You start with $10$ and your opponent starts with $20$. You keep playing until one of you is bankrupt (= has $0$ left).
  What is the probability, that your opponent bankrupts?
  </summary>
  One way we may comupte by the Markov chains. Denote $a_x$ the probability of winning the game starting with $x$ dollars ($x=10$ here). We have $3a_{x} = 2a_{x+1} + a_{x-1}$, with boundary condition $a_{30}=1, a_0 = 0$. This soon gives us $b_k = a_k - a_{k-1}$ is a geometric series. The probability of wining is $a_{10} = \sum_{k=1}^{10}b_k$ and we may use the fact $\sum_{k=1}^{30}b_k = 1$ and the sum for first $10$, middle $10$, and last $10$ being $1:2^{-10}:2^{-20}$.

  Another solution using martingale can be used as well,
  See [Wikipedia](https://en.wikipedia.org/wiki/Gambler%27s_ruin#Unfair_coin_flipping). The chance is more than $99.9\%$.

  And here we summarize the asymmetric simple random walk (See Durrett, R., Probability: Theory and Examples, p.260).

  Staring from $S_0=0$, with probability $p \gt 1/2$ we add $1$ and with probability $q\triangleq 1-p$ we substract $-1$. Denote the cumulated sum of the random walk as $S_n$, and first visit time $T_z = \inf(n: S_n=z)$. Assume boundary $a, b \gt 0$.
  - Martingale is $\varphi(S_n) = (q/p)^{S_n}$.
  - Two-sided boundary $[-a, b]$,
    $$\mathbb P(T_{-a} \lt T_{b}) = (\varphi(b)-\varphi(0)) / (\varphi(b)-\varphi(-a)),$$
    $$\mathbb P(T_{b} \lt T_{-a}) = (\varphi(0)-\varphi(-a)) / (\varphi(b)-\varphi(-a)).$$
  - Single-sided boundary $[-a, +\infty)$,
    $$\mathbb P(T_{-a} \lt +\infty) = (q/p)^{a}.$$
  - Single-sided boundary $(-\infty, b]$, probability of hitting $b$ is $1$ and expected hitting time is $\mathbb E T_b = b/(2p-1)$.
  </details>


### Linear Algebra

- <details><summary>What are the conditions for an integer matrices to have an inverse such that elements in this inverse are all integers?
  </summary>
  Sufficient and necessary condintion would be the determinant being $\pm1$. Easily for necessary, $\mathrm{det}(A^{-1}) = 1/\mathrm{det}(A)$.
  For sufficiency, note that by the adjugate matrix, we have $A^{-1} = \mathrm{det}(A)^{-1} \mathrm{adj}(A)$.
  </details>

### Game Theory

- [Source.](https://math.stackexchange.com/questions/4558093/2-players-pick-number-from-1-100-10-is-subtracted-from-higher-number-whats-th)
  2 players pick a number from 1 to 100. From the player with the higher number, we subtract 10 and whoever has the higher number then, wins. What is the optimal strategy?

- [Source.](https://math.stackexchange.com/questions/2393250/finding-the-best-optimal-strategy-for-this-game?rq=1)
  You are player 1 and you are versing another person player 2. You and player 2 choose any integer from 1 to 30. A 30 sided die is rolled and whoever's number is the closest to the die's number is the "winner" of the game and gains points according to what they guessed.e.g. Player 1 picks number 20 and player 2 picks number 15.The die lands on the number 18 so player 1 wins and gets 20 points.

  (Note that you can choose whether or not to go first or second in picking a number (you will know the other player's number if you go second)).

  What is the optimal strategy for this game?

- [Source.](https://math.stackexchange.com/questions/1525074/what-are-the-optimal-mixed-strategies-for-this-game?rq=1)
  Fix $k\lt n$ positive integers, and two players play the following game: each player picks a positive integer between 1 and n. If the two numbers picked are within k of each other, the larger number wins and that player gains one point while the other player loses one point. Else, the smaller number wins and that player gains one point while the other loses one. Picking the same number results in a tie, and no points gained or lost. I've tried to find patterns for optimal mixed strategies based on arbitrary k and n, without success. Here I define an "optimal strategy" as one that has ≥0 expected value against any mixed strategy.As an example, when k=1 and n=3 this game specializes to rock-paper-scissors, with a unique optimal strategy of (1/3, 1/3, 1/3).

- [Source.](https://math.stackexchange.com/questions/4384425/optimal-strategy-in-a-coin-game-has-unexpected-symmetry?rq=1)
  I am going to toss a fair coin and you are trying to determine if I tossed a Head or Tail. You do this using the rule I follow when I toss my coin:I have before me 2 red boxes each with a red marble inside them, I also have 2 blue boxes each with a blue marble inside of them. Finally, there are two empty white boxes. If I toss a Head I must move a red marble from a red box into an empty white box.

  Similarly, if I toss a Tail I must move a blue marble from a blue box into an empty white box. To aid you in your guess of my toss, once I have moved a marble, you are then permitted to open and examine the contents of a single red, blue or white box.

  What is the best strategy and what is the optimal probability of guessing correctly? What if there are $R$ red and $B$ blue boxes and $W$ white boxes?

## From Unknown Sources

- <details><summary>Roll a 100-side dice and get paid the number it shows. You can roll again by paying 1 dollar. What is the best expected payoff?
  </summary>
  Assume we stop if getting top $a$ result and we denote $x$ as the expected payoff, we have

  $$x = \frac{a}{100}\times\frac{200-a+1}{2} + \frac{100-a}{100}(x-1).$$

  Simplify we obtain $a=10\sqrt{2}$.
  </details>


## From QIA

### 第二季第一期
### 第二季第二期

- <details><summary>A 和 B 在 2xn 的模盘上进行如下游戏: A 先行，A 用 1x2 的横格子填，B 用 2x1 竖格子填，谁先无处可填，谁输。 试问 n 满足什么条件下，A 有必胜策略?
  </summary>
  $n \equiv 1 ~\mathrm{mod}~ 4$ 除外 A 有必胜策略. See [source](https://mp.weixin.qq.com/s/yXs346MEhitUmBC2l_lq3g).
  </details>

- <details><summary>对于n个互不相同的数 $a_1, \dots, a_n$。用如下算法得到其中最大值 $m=a_1$, 依次将 m 与 $a_2, \dots a_n$ 比较 若 $a_i \gt m$, 则令 $m=a_i$. 求对 $m$ 做赋值操作次数的期望次数?
  </summary>
  递归, 若 $a_n$ 是最大值, 则操作会比 $a_1, \dots, a_{n-1}$ 多 1, 否则不变.

  $$E_n = \frac1n (E_{n-1}+1) + \frac{n-1}{n}E_{n-1} = E_{n-1} + \frac1n.$$

  从而由于 $E_1 = 1$, 可得 $E_n = \sum_{i=1}^n (1/i)$.
  </details>

### 第二季第三期
