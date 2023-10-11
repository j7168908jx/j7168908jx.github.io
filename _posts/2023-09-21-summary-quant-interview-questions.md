---
title:  "Question (and Answer) List from Quantitative Finance Interview"
excerpt: "More than a copy of it"
# subtitle: " "
tag: "Misc"
layout: post-with-toc
---

## Brain Teasers

### Problem Simplification

1. Screwy pirates
  - 5 pirates 100 coins, voting
2. Tiger and sheep
  - 100 tigers, 1 sheep
  - tiger eats sheep and becomes a sheep


Others:

- The 100 prisoners, 1 watcher problem
  - watcher can shoot only one prisoner
  - rule that prevent anyone to escape

### Logic Reasoning

1. River crossing
  - A, B, C, D: 1min, 2min, 5min, 10min
  - 1 torch, 2 people cross at a time
  - minimum total time
2. Birthday problem
  - Mar 4, Mar 5, Mar 8, Jun 4, Jun 7, Sep 1, Sep 5, Dec 1, Dec 2, Dec 8
  - A knows month, B knows day
  - A says he doesn't know and C doesn't know
  - B says now I know
  - A says now I know
3. Card game
  - 2 cards at a time, both black go to dealer, both red go to player, or discarded, win 100 only if player has more cards
4. Burning ropes
  - 2 ropes, 1 hour each, burn non-uniformly, measure 45 min
5. Defective balls
    - 12 balls, 1 defective, 3 times weighing
    - up to $(3^n-3)/2$ balls using $n$ weighing
6. Trailing zeros
  - trailing zeros of $100!$
7. Horse race
  - 25 horses, 5 tracks, 5 horses each
  - find best 3, and best 5
8. Infinite sequence
  - $x$ to the power of $x$ to the power of ... is 2, what is $x$

### Thinking Out of the Box

1. Box packing
  - pack 53 1x1x4 bricks into 6x6x6 box
2. Calendar cubes
  - place single digits on 2 dices to display 01 to 31
3. Door to offer
  - two doors is offered, one with a car, one with a goat
  - one guard tell lies and other always tells the truth
4. Message delivery
  - unsecure channel message delivery with two locks
5. Last ball
  - 20 blue and 14 red balls. Randomly take two balls out each time
  - same color put 1 blue in, different color put 1 red in
  - what is the last ball in the box
  - 20 blue and 13 instead?
6. Light Switches
  - 1 light bulb and 4 switches in a room, at most 1 time to enter the room
7. Quant salary
  - Eight quants average

### Application of Symmetry

1. Coin piles
  - 1000 coins on the floor, 980 coin tails, 20 coin heads. separate into two piles to have equal heads
2. Mislabeled bags
  - 3 bags, 1 bag has 3 white balls, 1 bag has 3 black balls, 1 bag has 1 white and 1 black
3. Wise men
  - 50 wise man randomly called, putting a glass, to test if anyone can state that everyone has been called.

### Series summation

1. Clock pieces
2. Missing integers in 1 to 100
3. Counterfeit coins I
  - 10 bags with 100 coins, 1 counterfeit bag with lighter or heavier 1 gram coins. weight once using digical scale
4. Glass balls
  - minimum number of glass balls to test the highest floor of a 100 floor building without breaking the balls

### The Piegon Hole Principle

1. Matching socks
2. Handshakes
3. Have we met before?
4. Ants on a square
  - 51 ants on a 1x1 square, find a position so a 1/7 radius circule encompasses at least 3 ants
5. Counterfeit coins II
  - 10 bags with 100 coins, each bag contains either 9/10/11 gram coins, determine all bags' type using digital scale in one weighing

### Modular Arithmetic

1. Prisoner problem
  - 100 prisoners, red and blue hat, best strategy to free at least 99
  - what if k colors
2. Division by 9
3. Chameleon colors
  - 13 red 15 green 17 blue, two diff colors met -> becomes the third color, will all become the same color

### Math Induction

1. Coin split problem
  - split 1000 coins into 2 piles and obtain xy score, further split until all are in single piles. the final sum will always be the same
2. Chocolate bar problem
  - minimum breaks to break 6x8 choco into 48 pieces
3. Race track

### Proof by Contradiction

1. Irrational number
2. Rainbow hats (hard)
  - 7 color 7 prisoners, guess without communication, at least one correct then all free


## Probability Theory

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

### Markov Chain

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
  - $n$ heads in a row


## From Redbook

### 爱跳舞的papaya

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

- <details><summary> 能否找到 n 阶矩阵，每个矩阵元为 -1,0,1, 使得所有的行和和列和都互不相同
  </summary>
  </details>
