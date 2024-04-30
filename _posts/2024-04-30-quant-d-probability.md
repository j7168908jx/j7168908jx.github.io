---
title:  "Question (and Answer) List from Quantitative Researcher - Part 2. Probability"
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

## Probability Theory


### Uncategorized


- <details><summary><cite>Redbook, 红薯哥.</cite>
  做一个游戏，给 $n$ 个随机变量，$x_1,x_2,\dots, x_n$, iid uniformly distributed from (0,1). 依次猜测每个 $x_i$ 在 $n$ 个变量中的大小排名 (从 $x_1$ 到 $x_n$) 如果全部猜对则获得胜利。问你的best strategy 和采用这种 strategy 取胜的概率
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, Newjoy.</cite>
  三个变量服从 $U(0, 6)$ 问任意两变量差均 $\gt 1$ 的概率.
  </summary>
  (**todo**: not yet finished.)
  The probability is the volume of the region $|x-y| > 1, |y-z| > 1, |z-x| > 1$ divided by the volume of the cube $[0, 6]^3$.
  </details>

- <details><summary><cite>Redbook, Newjoy.</cite>
  你竞拍一枚硬币。你确信硬币的价格在0到100之间，如果你的出价大于价格，你就赢了，并以1.5倍的价格卖给你的朋友。你的出价是多少，才能获得最大的利润?
  </summary>
  Given the price $p$, the expected profit is $1.5p-b$ if bidding $b$ and $b > p$ . Compute the expectation of the profit,
  $$\mathbb E(1.5p-b  \cdot 1_{\{b > p\}})$$

  todo
  </details>


- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  随机变量 $Y\sim U(0, 100)$, 求 $X > 0$ s.t. $P([(100-X)/Y] > [(100-Y)/X])$ 最大, $[a]$ 表示不超过 $a$ 的最大整数
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  52张牌，抽4张，求点数的中位数, 平方和, 红牌的张数的期望和方差
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  A 是 n 阶矩阵，每个元素为 -1 或 1 (等概率)，求 Var(det(A))
  </summary>
  Consider these $n!$ permutations of all the terms to compute the determinant. Each term is considered as an variable and thus has variance $1$ (half prob. for $+1$ and half prob. for $-1$). The cross term, i.e., the covariance of two terms, must be 0 since there will be at least one index different, and this makes these two r.v. uncorrelated (See the classical problem: Is a game guessing even/odd heads fair if only the last coin is fair?). Thus, the variance of the determinant is $n!$.
  </details>



### Basic Probability Definitions and Set Operations

1. Coin toss game
  - 2 gamblers, 1 coin, A has $n+1$ fair coins, B has $n$ fair conis. P(A has more heads than B) ?
2. Card game
  - 52 cards, compare you and dealer's number, only if you are larger you win, P(win) ?
3. Drunk passenger
  - 100 passenger, 1st drunk, P(last passenger in correct seat)
4. N points on a circle
  - N points drawn randomly on the circumference of a circle, P(all points lie on a semicircle) ?

### Combinatorial Analysis

1. Poker hands
  - four-of-a-kind, full house, flush, straight, straight flush, two pairs
2. Hopping rabbit
  - rabbit hops 1 or 2 steps, how many ways to hop n steps
3. Screwy pirates 2
  - find a way to ensure at least 6/11 together can open a treasure box
4. Chess tournament
  - P(top 1 meets top 2 in final)
5. Application letters
6. Birthday problem
7. 100th digit
  - $(1+\sqrt2)^{3000}$
8. Cubic of integer

### Conditional Probability and Bayes' formula

1. Boys and girls
2. All-girl world?
3. Dual-head Unfair coin
4. Fair probability from an unfair coin
5. Dart game
6. Birthday line
  - Best position in line so that you are the first having someone with the same birthday before you
7. Dice order
8. Monty Hall problem
  - 1 car and 2 goats
9. Amoeba population
10. Candies in a jar
11. Coin toss game - 2 people targeting HT sequence
12. Russian roulette series
13. Aces
14. Gambler's ruin problem
15. Basketball scores
  - each throw success prob = (prev success / prev trials)
  - P(100th throw score 50) = ?
16. Cars on road

### Discrete and Continuous Distributions

1. Meeting probability
2. Probability of triangle
3. Property of Poisson process
4. Moments of normal distribution


### Expected Value, Vairance and Covariance

1. Connecting noodles
2. Optimal hedge ratio
  - buy stock A, sell stock B, best ratio based on sigma A and sigma B and correlation rho
3. Dice game
  - 4, 5, 6 roll again, expected total sum of face value
4. Card game (non-trivial)
  - avg number of cards to get first ace
5. Sum of random variables
  - expected number of uniform r.v. to sum up to 1
6. Coupon collection
  - N coupons, to collect them all, expected number of boxes
  - N coupons, already having n coupons, expected number of distinct types
7. Joint default probability

### Order Statistics

1. Expected value of max and min
2. Correlation of max and min
3. Random ants

## Stochastic Processes and Stochastic Calculus
