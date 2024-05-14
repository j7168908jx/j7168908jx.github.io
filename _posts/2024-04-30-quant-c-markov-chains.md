---
title:  "Question (and Answer) List from Quantitative Researcher - Part 3. Markov Chains"
excerpt: "Markov chains, random walk, optimal stopping problem, and more"
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

## Markov Chain

### Uncatgorized


- <details><summary><cite><a href="https://math.stackexchange.com/questions/4634542/probability-of-winning-coin-game">StackExchange</a>.</cite>
  You will play a coin game against an opponent.

  A biased coin will be continually flipped where there is a $2/3$ chance of Heads and a $1/3$ chance of Tails.

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



- <details><summary><cite>Redbook, 红薯哥.</cite>
  Asymmetry random walk. 对于一个起点为 1 的一维非对称随机游走仅在原点处有一个吸收壁，求该随机游走被 0 处的吸收壁吸收时走过步数的数学期望。
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, 红薯哥.</cite>
  Three frogs are jumping on the vertices of an equilateral triangle. A vertex can be occupied by more than one frog. Every minute, each frog jumps from the vertex where it is located to one of the other two vertices, each being equally likely. The frogs choose where to jump independently of each other. If initialy each vertex contains exactly one frog, how long does it take on average for all the frogs to meet at the same vertex?
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, Newjoy.</cite>
  五边形，从一个顶点出发，在每个顶点做对称随机游走，当第一次遍历每个顶点的时候，停在哪个顶点的概率最高
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



- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  三个人开始有分别有 a,b,c(整数)元，每一轮三人都扔一枚硬币。如果硬币的朝向不完全样，得到不同面的人会从另外两人手中各拿走一元钱。问其中一人破产的期望次数。
  </summary>
  martingale, ost
  </details>



1. Equations for absorption probabilities
  - unique solutions to equations $a_s = 1, a_i = 0$ for absorbing states, and $a_i = \sum_{j=1}^{M}a_{j}p_{ji}$ for transient states
2. Equations for the expected time to absorption
  - $\mu_i = 1+\sum_{j=1}^{M}\mu_{j}p_{ji}$ for transient states and $\mu_i = 0$ for absorbing states
3. Gambler's ruin problem
4. Dice question
  - single 12 or dual 7
5. Coin triplets
6. Color balls (very difficult)

### Martingale and Random walk

1. Wald's Equality
  - A martingale stopped at a stopping time is a martingale
2. Drunk man
3. Dice game revisit
4. Ticket line
  - price 5 and $2n$ people having 5 and 10 bills
5. Coin sequence
  - $n$ heads in a row (typist monkey problem)
  - <details><summary>
    We generalize this problem to have a $1/6$ chance of getting head (or a six from a dice), and $5/6$ of getting tail (or except a six from a dice), and we want to obtain a given sequence, say $HHTTHHHTT$, what is the expected number of tosses needed?
    </summary>
    </details>

