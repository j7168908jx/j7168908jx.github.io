---
title:  "Interview Questions for Quantitative Researchers - Answers"
excerpt: ""
# subtitle: " "
tag: "Quant"
layout: post-with-toc
---


<!--
template:

<section id="sample-question-name">
### Question Name

Answer to the question.

<div class="go"></div></section>

-->

<!-- The start of answer area -->
<div markdown="1" class="answers">


<section id="integer-matrix-inverse">
### Integer Matrix Inverse

Sufficient and necessary condition would be the determinant being $\pm1$.

Easily for necessary, $\mathrm{det}(A^{-1}) = 1/\mathrm{det}(A)$.

For sufficiency, note that by the adjugate matrix, we have $A^{-1} = \mathrm{det}(A)^{-1} \mathrm{adj}(A)$.

<div class="go"></div></section>


<section id="second-largest-in-array">
### Second Largest in Array
todo
<div class="go"></div></section>


<section id="r-square-in-lr">
### R-square in LR
todo
<div class="go"></div>
</section>

<section id="round-robin-die">
### Round-Robin Die

todo
<div class="go"></div>
</section>

<section id="expectation-variance-with-matching-outcomes">
### Expectation and Variance with Matching Outcomes

todo
<div class="go"></div>
</section>


<section id="runs-of-coin-sequence">
### Runs of Coin Sequence

todo
<div class="go"></div>
</section>


<section id="repeated-die-with-stopping-condition">
### Repeated Die Rolling with a Stopping Condition

todo
<div class="go"></div>
</section>


<section id="coin-with-bernoulli-process">
### Coin with Bernoulli Process

todo
</section>


<section id="toss-coins-again">
### Toss Coins Again

todo
<div class="go"></div>
</section>


<section id="expected-return-box">
### Expected Return

todo
<div class="go"></div>
</section>


<section id="maximum-number-of-ones">
### Maximum Number of Ones

Convert this problem to the connectivity of directed graphs.

The condition requires any path found on the graph cannot have length greater than $1$.

These means the graph is separated into two parts. The maximum number must be $\mathrm{floor}(n/2) * (n-\mathrm{floor}(n/2))$
<div class="go"></div>
</section>


<section id="estimate-from-noisy-difference">
### Estimate from Noisy Difference

todo
<div class="go"></div>
</section>


<section id="strategy-in-2xn-grid">
### Winning Strategy in a 2xn Grid Filling Game

$n \equiv 0/2/3 ~\mathrm{mod}~ 4$ 时, A 有必胜策略. See [source](https://mp.weixin.qq.com/s/yXs346MEhitUmBC2l_lq3g).
<div class="go"></div>
</section>

<section id="guessing-coin-toss">
### Guess Coin Toss Based on Marble Movements

https://math.stackexchange.com/questions/4384425/optimal-strategy-in-a-coin-game-has-unexpected-symmetry

<div class="go"></div>
</section>



<section id="people-arrive-and-meet-each-other">
### People Arrive and Meet Each Other

<div class="go"></div>
</section>


<section id="find-out-the-fifth-card">
### Find out the Fifth Card

五张牌中必有两张票拥有相同花色, 不妨设为梅花 x 和梅花 y.

如果 $0\lt y - x\lt 7 (\mathrm{mod} 13)$, 则第一张展示梅花 x, 否则展示梅花 y. 此时没有被展示的牌的数字大小必须为展示了的牌的 +1 ~ +6. 用剩下的三张牌根据一个事先定好的顺序来表示 +1 ~ +6, 从而可以确定第五张牌.
<div class="go"></div>
</section>

<section id="range-of-eigenvalue">
### Range of Eigenvalue

The range is $[a+c, b+d]$, if $[a, b]$ is the range of eigenvalue for $A$ and $[c, d]$ is the range of eigenvalue for $B$.

Choose any unit vector $x$ and compute $x^{T}Ax$ and $x^{T}Bx$.

Or use Gerschgorin circle theorem.

<div class="go"></div>
</section>


<section id="range-based-integer-comparison">
### Range-Based Integer Comparison Game

https://math.stackexchange.com/questions/1525074/what-are-the-optimal-mixed-strategies-for-this-game
<div class="go"></div>
</section>


<section id="closest-to-die-roll">
### Closest to Die Roll
https://math.stackexchange.com/questions/2393250/finding-the-best-optimal-strategy-for-this-game
<div class="go"></div>
</section>


<section id="subtract-10-number-comparison">
### Subtract 10 Number Comparison Game
https://math.stackexchange.com/questions/4558093/2-players-pick-number-from-1-100-10-is-subtracted-from-higher-number-whats-th
<div class="go"></div>
</section>


<section id="win-on-sum-7-with-rerolling">
### Win on Sum-7 with Rerolling
todo
<div class="go"></div>
</section>


<section id="sum-constrained-resource-allocation">
### Sum-Constrained Resource Allocation Game

One box $K=100$. If Jack is rational, what should you write.

Write out the gain matrix. Easily we can see there is no pure Nash equilibrium and thus we turn to find a mixed strategy. Assume Jack writes $y$ with probability $p_y$, which makes us indifferent writing any of $1$ to $99$ (note that he will not write $100$ and we will not write $100$ as well).

The equilibrium will be
$$\begin{pmatrix} 1 & 1 & \dots & 1 & 1\\ 2 & 2 & \dots & 2 & \\ \vdots & \vdots & \vdots & & \\ 99 & & & &\end{pmatrix} \begin{pmatrix}p_1\\p_2\\ \vdots \\ p_{99}\end{pmatrix} = \begin{pmatrix}1\\1\\ \vdots \\ 1\end{pmatrix}.$$

Solve the system to obtain the mixed strategy for both players since they are symmetric.

<div class="go"></div>
</section>


<section id="opponent-bankruptcy-with-a-biased-coin">
### Opponent Bankruptcy with a Biased Coin
<!-- <p class="source-tag">>.</p> -->
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
<div class="go"></div>
</section>


<section id="asymmetry-random-walk">
### Asymmetry Random Walk

todo
<div class="go"></div>
</section>


<section id="three-frogs-to-meet">
### Three Frogs to Meet on an Equilateral Triangle

Draw the transition graph.

- State 1: 3 frogs at different vertices.
  - Only 2 of the total 8 possibilities will stay in state 1 (where each frog moves in the same direction). The other 6 will move to state 2.
- State 2: 2 frogs at the same vertex, 1 frog at another vertex.
  - 1 of 8 will move to state 3.
  - 2 of 8 will move to state 1.
  - 5 of 8 will stay in state 2.
- State 3: 3 frogs at the same vertex.

Thus the expected steps to reach state 3 is $12$.

<div class="go"></div>
</section>


<section id="diff-of-ordered-uniform-rv" data-tags="logic probability">
### Difference of Ordered Uniform r.v.

todo
</section>


<section id="neighbor-and-good-point">
### Neighbor and Good Point

利用期望的线性性, 分别计算每个点成为 good point 的概率并求和.

记这几个点排序后的序列为 $X_1, X_2, X_3, X_4, X_5, \dots$. (假设至少4个点, 3个点另看)

- 最边上的点 $X_1$ 是 good point 的要求相当于 $X_1X_2 \lt X_2X_3$, 概率是 1/2.
- 第二个点 $X_2$ 是 good point 的要求相当于 $X_1X_2 \lt X_2X_3$ 或 $X_2X_3 \lt \min(X_1X_2, X_3X_4)$, 概率是 1/2 + 1/3 = 5/6.
- 第三个及以后的中间点是 good point 的概率是 1/3 + 1/3 = 2/3.

从而期望来说的 good point 数量是 $1/2 * 2 + 5/6 * 2 + 2/3*(N-4) = 2N/3$.

另外可算得 3 个点也是符合这个公式的.
<div class="go"></div>
</section>


<section id="random-walk-on-a-pentagon">
### Random Walk on a Pentagon

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
<div class="go"></div>
</section>


<section id="question-frame-in-markov-chains">
### Absorption Probabilities in Markov Chains
todo
<div class="go"></div>
</section>


<section id="get-maximum">
### Get Maximum

递归, 若 $a_n$ 是最大值, 则操作会比 $a_1, \dots, a_{n-1}$ 多 1, 否则不变.

$$E_n = \frac1n (E_{n-1}+1) + \frac{n-1}{n}E_{n-1} = E_{n-1} + \frac1n.$$

从而由于 $E_1 = 1$, 可得 $E_n = \sum_{i=1}^n (1/i)$.
</section>


<section id="expected-return-of-rolling-again">
### Expected Return of Rolling Again

<!-- <p class="source-tag">.</p> -->
Assume we stop if we get top $a$ result and we denote $x$ as the expected payoff, we have

$$x = \frac{a}{100}\times\frac{200-a+1}{2} + \frac{100-a}{100}(x-1).$$

Simplify we obtain $a=10\sqrt{2}$.
<div class="go"></div>
</section>


<section id="distance-in-unit-sphere">
### Distance in Unit Sphere

设随机变量 $X = (X_1, X_2, X_3)$ 服从单位球内的均匀分布。设 $R = \sqrt{X_1^2 + X_2^2 + X_3^2}$。

则 $F(r) = P(R \leq r) = r^3$ (均匀分布从而出现概率正比于体积)

对于 $D = \min(d_1, d_2, ..., d_N)$, 设 $D$ 的 cdf 为 $G(x)$ 则有

$G(x) = P(D \leq x)$
$= P(\min(d_1, d_2, ..., d_N) \leq x)$
$= 1 - P(\min(d_1, d_2, ..., d_N) > x)$
$= 1 - P(d_1 > x, d_2 > x, ..., d_N > x)$
$= 1 - (1 - x^3)^N$

令 $G(x) = \frac{1}{2}$, 解得 $x = \left(1-2^{1/N}\right)^{1/3}$

<div class="go"></div>
</section>


<section id="empty-the-boxes">
### Empty the Boxes

todo
<div class="go"></div>
</section>


<section id="difference-between-any-two-of-three-uniform-rv">
### Difference Between Any Two of Three Uniform r.v.

(**todo**: not yet finished.)
The probability is the volume of the region $|x-y| > 1, |y-z| > 1, |z-x| > 1$ divided by the volume of the cube $[0, 6]^3$.
<div class="go"></div>
</section>


<section id="maximize-return-in-coin-auction">
### Maximize Return in a Coin Auction
Given the price $p$, the expected profit is $1.5p-b$ if bidding $b$ and $b > p$ . Compute the expectation of the profit,
$$\mathbb E(1.5p-b  \cdot 1_{\{b > p\}})$$

todo
<div class="go"></div>
</section>


<section id="find-x-with-probability-and-restriction">
### Find x with Probability and Restriction

todo
<div class="go"></div>
</section>

<section id="variance-of-determinant">
### Variance of Determinant
Consider these $n!$ permutations of all the terms to compute the determinant.

Each term is considered as an variable and thus has variance $1$ (half prob. for $+1$ and half prob. for $-1$).

The cross term, i.e., the covariance of two terms, must be 0 since there will be at least one index different, and this makes these two r.v. uncorrelated (See the classical problem: Is a game guessing even/odd heads fair if only the last coin is fair?).

Thus, the variance of the determinant is $n!$.
<div class="go"></div>
</section>

<section id="seats-choice">
### Seats Choice

There is another interesting proof. If we represent the seating state using cyclic notation like $(1348)$ meaning 1 sat at 3, 3 sat at 4..., we can assert that there will be only a single cyclic containing $1$, and the cyclic must be ascending, i.e., $(132)$ will not occur. All possible cycles are $2^{n-1}$, (each person $2$ to $n$ decides whether inside the cycle or not), and all possible cycles with $n$ not inside will be exactly half of them.
<div class="go"></div>
</section>


<section id="number-of-color-changes">
### Number of Color Changes

https://math.stackexchange.com/questions/2763/what-is-the-expected-number-of-runs-of-same-color-in-a-standard-deck-of-cards/2764#2764

Use linearity of expectation. The prob. of the color of $n$ and $n+1$ being different is the same as $X_1 \neq X_2$, which is $26/51$. The total is $51 \times 26 / 51 = 26$.
<div class="go"></div>
</section>


<section id="odd-row-and-column-sums">
### Odd Row and Column Sums
We can always consider the left upper $n-1$ size square matrix.

For any combinations of $0$ and $1$ in this submatrix, the last row and last column (both except the last element) will be determined by the parity of the submatrix.

Then, an important argument is that the last row and the last column's parity must be the same.

Thus, the last element is determined. The total number of such matrices is $2^{(n-1)^2}$.
<div class="go"></div>
</section>


<section id="determinant-of-01-matrix">
### Determinant of 01 Matrix
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
We may only consider the case $\mathrm{det}(A) = \pm1$, which means $A$ has full rank.

In this case, we can assert that each row must have at least one $1$.

Now, think of the start index of $1$ in each row. Either the start index of $1$ in all rows differ, or there will be two rows with the same start index.

In the first case, we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation.

In the second case, we can substract the row of less $1$-s buy the one having more (they cannot have equal many $1$-s or the matrix is not full rank).

Do this until all rows start with different index.

We can be sure that this will not last forever since each time the total number of $1$ is reduced.

Then we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation.
<div class="go"></div>
</section>


<section id="light-changes">
### Light Changes
<!-- <p class="source-tag">.</p> -->
假设8个灯的状态分别是 $a_1,\dots, a_8$, 硬算8轮后第一个灯的状态.
<div class="go"></div>
</section>


<section id="is-k-in-fibonacci-sequence">
### Is k in Fibonacci Sequence?

如果a b 同号了，那么接下来只要硬算就能在log(k)的时间内算出结果在不在，
在同号之前的情况我们叫做艰难情况。

在艰难情况下，考虑这样一个例子: `11 -7 4 -3 1 -2 -1 -3`. 这个例子说明了不定号的这段时间内
数字的绝对值是递减的。那么这一段最长的情况下有多长呢？
考虑一个例子 $a=1024$, 这时候是不是你想不出一个办法使得 a+b (第三个数) 大于512 并且保持接着往后是异号的？
这意味着第三个数至多是 $a/2$. 这意味着这一段至多只需要 $2\log(|a|)$ 步 （可能差了一两步）就能完成。

因此总的代价至多是 log 的。

<div class="go"></div>
</section>


<section id="parametric-dice" data-tags="">
### Parametric Dice

One can safely merge the case of showing 3 to 6 with prob $1-p_1-p_2$. In this case, the prob is

$$\begin{aligned}
\mathbb P(\xi_2=2|\xi_1=2) &= \frac{\mathbb P(\xi_2=2, \xi_1=2)}{\mathbb P(\xi_1=2)} = \frac{\mathbb E[p_2^2]}{\mathbb E[p_2]} \\
&=\frac{\int_0^1\int_0^{1-p_1}p_2/(1-p_1)~\mathrm dp_2\mathrm dp_1}{\int_0^1\int_0^{1-p_1}p_2^2/(1-p_1)~\mathrm dp_2\mathrm dp_1} = 4/9.
\end{aligned}$$

<div class="go"></div>
</section>


<section id="flip-sequence-coin" data-tags="">
### Flip a Sequence of Coins

注意到在任何一次操作的时候, 硬币1, 51, 101, ... 1951 恰好会有一个被翻面. 而获胜的时候这些面必须全部朝下，从而恰好需要被翻偶数次. 因此后手必胜。注意到第1个硬币最多可能被翻1次, 第2个最多可能被翻2次, 第 $k$ 个最多被翻 $2^{k-1}$ 次, 游戏必然会在有限次内结束.

<div class="go"></div>
</section>



</div>
<!-- The end of answer area -->

<!-- include css/js -->
<link rel="stylesheet" href="assets/css/quant-questions-and-answers.css">
<script src="assets/js/quant-questions-and-answers.js"></script>

<!-- todo: ignore data-tags in this page -->
