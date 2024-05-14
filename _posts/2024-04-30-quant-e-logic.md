---
title:  "Question (and Answer) List from Quantitative Researcher - Part 1. Logic"
excerpt: "Brain teasers, logic puzzles, and more"
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

## Logic

### Uncategorized

- <details><summary><cite>Redbook, 红薯哥.</cite>
  If n is a random positive integer, what is the probability that $2^n$ starts with the digit 1?
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 红薯哥.</cite>
  Draw N (N > 3) i.i.d. points uniformly from interval $(0, 1]$.

  Define the neighbor of a point as the closest point to it (excluding itself).

  If the neighbor of its neighbor is the point itself we call this point a good point.

  The expectation of the number of good points is $f(N)$. What is $f(N)$ in general?
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 红薯哥.</cite>
  N个相同的桶，m 个不同的球，有多少种方法 distribute m balls in N 桶? Follow up: 如果每个桶至少要有 k 球呢?
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, 红薯哥.</cite>
  N 只球队两两比赛，赢的队伍得 2 分，输的得 0 分，如果打平则各得 1分。已知所有队伍积分的一半都是从末尾 10 支队伍上赢来的。那么 N 是多少?
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, 红薯哥.</cite>
  Given $\mathbb E(X), \mathbb E(\max(k, X)), \mathbb E(\min(k, X))$ for all $k$,

  write a formula for $\mathbb E(f(X))$ if $f\in\mathcal C^2(\mathbb R)$. (See Carr-Madan Formula)
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, Newjoy.</cite>
  从1到1000000的所有数字的位数之和是多少?注意位数之和不是数字本身，举例，对于11，位数之和为 1+1=2
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  能否找到 n 阶矩阵，每个矩阵元为 -1,0,1, 使得所有的行和和列和都互不相同
  </summary>
  ...
  </details>



- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  有多少 n 阶 01 矩阵满足每行的和和每列的和都是奇数
  </summary>
  We can always consider the left upper $n-1$ size square matrix.

  For any combinations of $0$ and $1$ in this submatrix, the last row and last column (both except the last element) will be determined by the parity of the submatrix.

  Then, an important argument is that the last row and the last column's parity must be the same.

  Thus, the last element is determined. The total number of such matrices is $2^{(n-1)^2}$.
  </details>

- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  有一个拍卖，有两枚均匀 1-6 子，抛完后两枚子朝上数字之和为 contract 的价值。你和另一个人轮流 bid，先手顺序随机。只能 bid 整数。你可以看到第一个骰子的数字，你对手可以看到第二个骰子的数字。问最优策略和先手的期望收益
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 爱跳舞的papaya.</cite>
  A 是 n 阶 01 矩阵，每一行的1都连续出现，求证 det(A) in -1, 0, 1
  </summary>
  We may only consider the case $\mathrm{det}(A) = \pm1$, which means $A$ has full rank.

  In this case, we can assert that each row must have at least one $1$.

  Now, think of the start index of $1$ in each row. Either the start index of $1$ in all rows differ, or there will be two rows with the same start index.

  In the first case, we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation.

  In the second case, we can substract the row of less $1$-s buy the one having more (they cannot have equal many $1$-s or the matrix is not full rank).

  Do this until all rows start with different index.

  We can be sure that this will not last forever since each time the total number of $1$ is reduced.

  Then we can swap the rows to make the matrix upper triangular, and the determinant up to row permutation is 1, which means $\pm1$ before any permutation.
  </details>


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


## Not yet catgorized


- Assume a Fibonacci sequence $\{a_n\}$ such that $a_1=a_2=1$ and $a_{i+2} = a_{i+1} + a_{i}$. Find a polynomial of order 1009 $p(n)$ such that on some integers we have $p(2n+1) = a_{2n+1}$ where $n=0,\dots, 1009$. Now we claim that $p(2021) = a_{j} - a_{k}$. Find $j$ and $k$ and prove that this pair is unique.


- <details><summary>八盏灯围成一个环，各自初始化明暗状态，灯每秒都会同时变化一次：如果跟右边的灯颜色相同，变暗；如果颜色不同，变亮。最多多少秒后，所有灯都会暗下来。
  </summary>
  假设8个灯的状态分别是 $a_1,\dots, a_8$, 硬算8轮后第一个灯的状态.
  </details>
