---
title:  "Question (and Answer) List from Quantitative Researcher - Part 3. Markov Chains"
excerpt: "More than a copy of it"
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

