---
title:  "Question (and Answer) List from Quantitative Researcher - Part 2. Probability"
excerpt: "More than a copy of it"
# subtitle: " "
tag: "Quant"
layout: post-with-toc
---

<!-- template -->

## Probability Theory


### Uncategorized


- <details><summary><cite>Redbook, 爱跳舞的papaya</cite>
  $A$ 是 n 阶 01 矩阵，$A^2=0$，求矩阵中1的个数的最大值
  </summary>
  Convert this problem to the connectivity of directed graphs. The condition requires any path found on the graph cannot have length greater than $1$. These means the graph is separated into two parts. The maximum number must be $\mathrm{floor}(n/2) * (n-\mathrm{floor}(n/2))$
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
