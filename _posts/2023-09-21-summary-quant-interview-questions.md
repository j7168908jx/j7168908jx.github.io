---
title:  "Question (and Answer) List from Quantitative Finance Interview"
excerpt: "More than a copy of it"
# subtitle: " "
tag: "Quant"
layout: post-with-toc
---

## From Redbook

### from 爱跳舞的papaya

- EV的估算基本就是纸牌问题，52张抽四张求点数中位数/平方和/红牌个数等，值得注意的是要兼顾准确性和速度。然后option的例子比如他会有bet下一张的花色或大小，那就是你头寸偏向哪一边bet另一边就好啦

- 三个人开始有分别有 a,b,c(整数)元，每一轮三人都扔一枚硬币。如果硬币的朝向不完全样，得到不同面的人会从另外两人手中各拿走一元钱。问其中一人破产的期望次数。
  - martingale, ost

- 盒子里有 N+1 枚蓝球，N 枚红球，每次摸出蓝球得一元，摸出红球减一元，可以随时停止退出。问这个游戏的期望收益是多少?

- 有一个拍卖，有两枚均匀 1-6 子，抛完后两枚子朝上数字之和为 contract 的价值。你和另一个人轮流 bid，先手顺序随机。只能 bid 整数。你可以看到第一个骰子的数字，你对手可以看到第二个骰子的数字。问最优策略和先手的期望收益“

- <details><summary> $A$ 是 n 阶 01 矩阵，$A^2=0$，求矩阵中1的个数的最大值
  </summary>
  Convert this problem to the connectivity of directed graphs. The condition requires any path found on the graph cannot have length greater than $1$. These means the graph is separated into two parts. The maximum number must be $\mathrm{floor}(n/2) * (n-\mathrm{floor}(n/2))$
  </details>

- <details><summary> A 是 n 阶矩阵，每个元素为 -1 或1(等概率)，求 Var(det(A))
  </summary>
  Consider these $n!$ permutations of all the terms to compute the determinant. Each term is considered as an variable and thus has variance $1$ (half prob. for $+1$ and half prob. for $-1$). The cross term, i.e., the covariance of two terms, must be 0 since there will be at least one index different, and this makes these two r.v. uncorrelated (See the classical problem: Is a game guessing even/odd heads fair if only the last coin is fair?). Thus, the variance of the determinant is $n!$.
  </details>

- <details><summary> A 是 n 阶 01 矩阵，每一行的1都连续出现，求证 det(A) in -1, 0, 1
  </summary>
  We may only consider the case $\mathrm{det}(A) = \pm1$, which means $A$ has full rank. In this case, we can assert that each row must have at least one $1$. Now, think of the start index of $1$ in each row. Either the start index of $1$ in all rows differ, or there will be two rows with the same start index. In the first case, we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation. In the second case, we can substract the row of less $1$-s buy the one having more (they cannot have equal many $1$-s or the matrix is not full rank). Do this until all rows start with different index. We can be sure that this will not last forever since each time the total number of $1$ is reduced. Then we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation.
  </details>

- <details><summary> 有多少 n 阶 01 矩阵满足每行的和和每列的和都是奇数
  </summary>
  We can always consider the left upper $n-1$ size square matrix. For any combinations of $0$ and $1$ in this submatrix, the last row and last column (both except the last element) will be determined by the parity of the submatrix. Then, an important argument is that the last row and the last column's parity must be the same. Thus, the last element is determined. The total number of such matrices is $2^{(n-1)^2}$.
  </details>

- 能否找到 n 阶矩阵，每个矩阵元为 -1,0,1, 使得所有的行和和列和都互不相同
- 随机变量 $Y\sim U(0, 100)$, 求 $X > 0$ s.t. $P([(100-X)/Y] > [(100-Y)/X])$ 最大, $[a]$ 表示不超过 $a$ 的最大整数

### from Newjoy

- 从1到1000000的所有数字的位数之和是多少?注意位数之和不是数字本身，举例，对于11，位数之和为 1+1=2
- <details><summary>你竞拍一枚硬币。你确信硬币的价格在0到100之间，如果你的出价大于价格，你就赢了，并以1.5倍的价格卖给你的朋友。你的出价是多少，才能获得最大的利润?
  </summary>
  Given the price $p$, the expected profit is $1.5p-b$ if bidding $b$ and $b > p$ . Compute the expectation of the profit,
  $$\mathbb E(1.5p-b  \cdot 1_{\{b > p\}})$$
- <details><summary>三个变量服从 $U(0, 6)$ 问任意两变量差均 $\gt 1$ 的概率.
  </summary>
  (**todo**: not yet finished.)
  The probability is the volume of the region $|x-y| > 1, |y-z| > 1, |z-x| > 1$ divided by the volume of the cube $[0, 6]^3$.
  </details>
- <details><summary>五边形，从一个顶点出发，在每个顶点做对称随机游走，当第一次遍历每个顶点的时候，停在哪个顶点的概率最高
  </summary>
  We can do this question for a general $n$, based on the fact, on a discrete symmetric 1D unit step size random walk starting at origin, the probability of reaching $\alpha$ before hitting $-\beta$ is $\beta / (\alpha+\beta)$, $\alpha,\beta\in\mathbb Z^+$.
  Assume we have labeled the vertices as $0, \dots, n-1$ and we shall cut one of the edge to get back to the 1D symmetric random walk problem.
  So the probability of reaching $k$ as the final position is equivalent to having visited $1, \dots, k-1, k+1, \dots, n-1$.
  We separate the question into visiting $k+1$ being the second last vertex and visiting $k-1$ being the second last vertex.
  For the first one, assume we cut the path between $k$ and $k+1$. Now the sequence is $k+1, k+2, \dots, n-1, 0, 1, \dots, k-1, k$.
  The probability of stopped at $k+1$ before visiting $k-1$ is $(k-1)/(n-2)$. Meanwhile, the probability of stopped at $k+1$ before visiting $k$ is $k/(n-1)$.
  Thus, the probability of stopped at $k+1$ before visiting $k$ but visited $k-1$ is $k/(n-1) - (k-1)/(n-2) = (n-k-1)/(n-1)(n-2)$.
  Similarly, we cut the path between $k-1$ and $k$. Now the sequence is $k, k+1, \dots, n-1, 0, 1, \dots, k-1$.
  The probability of stopped at $k-1$ before visiting $k+1$ is $(n-k-1)/(n-2)$. Meanwhile, the probability of stopped at $k-1$ before visiting $k$ is $(n-k)/(n-1)$.
  Thus, the probability of stopped at $k-1$ before visiting $k$ but visited $k+1$ is $(n-k)/(n-1) - (n-k-1)/(n-2) = (k-1)/(n-1)(n-2)$.
  Thus, the probability for stopping at $k$ is the sum, $1/(n-1)$ for all $k$.
  </details>

### from 维特根斯坦

- Consider the following game. Beginning with a deck ofeven size = N cards that are half red and half green(N/2 each), you begin drawing cards. For each red card,you win $1 and for each green card you lose $1. Youmay stop at any time. What is the value of this game toyou assuming you play optimally? Write a program thatcomputes this value.

- Given noisy estimates of signeddifferences $d_{ij}$ between a set of $n$ real numbers $\{x_i\}$, find estimators $\{\hat x_i\}$ that minimize $\sum_{i,j}(d_{ij}-(\hat x_i- \hat x_j))^2$ subject to $\min(\hat x_i) = 0$. The data is given as a skew-symmetric matrix, $D_{n\times n} = (d_{ij})$, with $d_{ij}\approx x_i - x_j$. Write a program.

### from 红薯哥

- 做一个游戏，给 $n$ 个随机变量，$x_1,x_2,\dots, x_n$, iid uniformly distributed from (0,1). 依次猜测每个 $x_i$ 在 $n$ 个变量中的大小排名 (从 $x_1$ 到 $x_n$) 如果全部猜对则获得胜利。问你的best strategy 和采用这种 strategy 取胜的概率

- how to use biased coin to play a fair game, suppose $p$ is near to $0.99$. How to minimize the worst case number of tosses

- Integer $0\lt x \leq y \leq z, x+y+z=N$. Denote $f(N)$ has the number of $(x,y,z)$ tuples that satisfy the condition. Find the asymptotic behavior of $f(N)$ and the coefficent of the largest order.

- Given $\mathbb E(X), \mathbb E(\max(k, X)), \mathbb E(\min(k, X))$ for all $k$, write a formula for $\mathbb E(f(X))$ if $f\in\mathcal C^2(\mathbb R)$. (See Carr-Madan Formula)

- N 只球队两两比赛，赢的队伍得 2 分，输的得 0 分，如果打平则各得 1分。已知所有队伍积分的一半都是从末尾 10 支队伍上赢来的。那么 N 是多少?

- N个相同的桶，m 个不同的球，有多少种方法 distribute m balls in N 桶? Follow up: 如果每个桶至少要有 k 球呢?

- $K$ dollars in a black box. You write a number $x$, and Jack also writes a number $y$. Both don't know what each other writes but know $K$. If $x + y\leq K$, you win $x$ and Jack wins $y$. If $x+y \gt K$, both win $0$.
  - <details><summary>One box $K=100$. If Jack is rational, what should you write.
    </summary>
    Write out the gain matrix. Easily we can see there is no pure Nash equilibrium and thus we turn to find a mixed strategy. Assume Jack writes $y$ with probability $p_y$, which makes us indifferent writing any of $1$ to $99$ (note that he will not write $100$ and we will not write $100$ as well).

    The equilibrium will be
    $$\begin{pmatrix} 1 & 1 & \dots & 1 & 1\\ 2 & 2 & \dots & 2 & \\ \vdots & \vdots & \vdots & & \\ 99 & & & &\end{pmatrix} \begin{pmatrix}p_1\\p_2\\ \vdots \\ p_{99}\end{pmatrix} = \begin{pmatrix}1\\1\\ \vdots \\ 1\end{pmatrix}.$$

    Solve the system to obtain the mixed strategy for both players since they are symmetric.
    </details>
  - Follow up: ten boxes, five of which have $50$ inside, and another five have $40$ inside. If Jack is rational, what should you write.
  - Follow up: one box, $K=100$. Play $1,000$ times. lf Jack claims that he writes $80$ every time, what is your strategy?

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
