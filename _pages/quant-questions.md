---
title:  "Interview Questions for Quantitative Researchers"
excerpt: ""
# subtitle: " "
tag: "Quant"
layout: post
toc: true
---

In this page, I collect some questions that are frequently asked in interviews for quantitative researchers. The questions are categorized by topics.

Hopefully, you will find interesting questions and enjoy solving them.
Several questions are not attached with answers. If you have any ideas, please feel free to share them in the comments and I will edit and update the answers to the answer page.

---

**Filter tags:**

<div class="button-area"></div>

---

<!--
template:


<section id="sample-question-name" data-tags="sample-question-tags">
### Question Name

<p class="source-tag">Sample Book A, 2023/11/12</p>

Sample question text.

<div class="go"></div></section>

-->

<!-- The start of question area -->
<div markdown="1" class="questions">


<section id="replicate-11-die-with-two-6-dice" data-tags="dice logic">
### Replicate a 11-die with two 6-dice

Show that you cannot re-weight two normal 6-dice such that the prob. of
rolling any value between 2 and 12 (inclusive) is equal.
</section>

<section id="round-robin-die" data-tags="dice probability markov-chain">
### Round-Robin Die

Three players ABC take turns to roll a die in the order of ABCABCA...
What is the prob that A is the first to get 6, B is the second and C is the third?
What is the prob that A gets the first 6, B gets the second, and C gets the third?
<div class="go"></div>
</section>

<section id="expectation-variance-with-matching-outcomes" data-tags="dice probability">
### Expectation and Variance with Matching Outcomes

$n$ people are each tossing a fair die. For each pair of them, if these two people get the same number, they earn 1 point. What is the expected number of points and the variance of the number of points? What about the mean and variance if they earn the face value of the number they get?
<div class="go"></div>
</section>


<section id="roll-die-until-an-odd-number" data-tags="dice probability">
### Roll Die until an Odd Number

<!-- <p class="source-tag">Redbook, AMC10.</p> -->
投一个骰子不停直到连续按顺序出现1-2-3这三个点数时停止，停下来的时候恰好投了奇数次的概率？
<div class="go"></div>
</section>


<section id="number-of-the-cumulative-sum" data-tags="dice probability">
### Number of the Cumulative Sum

<!-- <p class="source-tag">Redbook, AMC10.</p> -->
Given a twelve-sided die, you roll the die repeatedly until the cumulative sum is odd. What is the number of the cumulative sum you can have with the highest probability?
<div class="go"></div>
</section>


<section id="bid-the-sum-of-dice" data-tags="dice strategy logic">
### Bid the Sum of Dice
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
有一个拍卖，有两枚均匀 1-6 子，抛完后两枚子朝上数字之和为 contract 的价值。你和另一个人轮流 bid，先手顺序随机。只能 bid 整数。你可以看到第一个骰子的数字，你对手可以看到第二个骰子的数字。问最优策略和先手的期望收益
<div class="go"></div>
</section>


<section id="repeated-die-with-stopping-condition" data-tags="markov-chain dice">
### Repeated Die Rolling with a Stopping Condition

You can repeatedly throw a die and you will have to stop if you throw a $k$ (let's take $k=6$ here). You can always early stop before being forced to stop. What is the best-expected score and strategy, if
  - you earn the face value of the last throw;
  - you earn the square of face value of the last throw;
  - you earn the sum of all the face values of the throws except that you are forced to stop. (in which case you earn $0$)
<div class="go"></div>
</section>


<section id="coin-with-bernoulli-process" data-tags="coins probability">
### Coin with Bernoulli Process

$N$ refers to the total number of tosses. What is $\mathbb P(N > m)$ if we stop at the first head of a $p$-coin?
<div class="go"></div>
</section>


<section id="toss-coins-again" data-tags="coins probability">
### Toss Coins Again

We toss $n$ $p$-coins in one round.
For each of them, if the head occurs, we will then toss this coin again in the second round.
What is the distribution of the number of total heads resulting from the incoming second round of tosses?
<div class="go"></div>
</section>

<section id="runs-of-coin-sequence" data-tags="coins probability">
### Runs of Coin Sequence

We toss $n$ $p$-coins. What is the expected number of runs and the variance? A run is a sequence of consecutive heads or tails. $HHTHTTH$ has 5 runs.
<div class="go"></div>
</section>


<section id="unfair-coin-specific-sequence" data-tags="coins probability ost">
### Unfair Coin Specific Sequence

For a $p$-coin, what is the average number of tosses to get a specific sequence of $HHTHHTTTHH$?
</section>


<section id="probability-of-more-heads" data-tags="coins probability">
### Probability of More Heads

<!-- <p class="source-tag">.</p> -->
2 gamblers, 1 coin, A has $n+1$ fair coins, B has $n$ fair conis. P(A has more heads than B) ?
<div class="go"></div>
</section>



<section id="expected-return-box" data-tags="balls probability">
### Expected Return

<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
盒子里有 N+1 枚蓝球，N 枚红球，每次摸出蓝球得一元，摸出红球减一元，可以随时停止退出。问这个游戏的期望收益是多少?
<div class="go"></div>
</section>


<section id="expectation-and-variance-of-4-cards" data-tags="cards probability">
### Expectation and Variance of 4 Cards

<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
52张牌，抽4张，求点数的中位数, 平方和, 红牌的张数的期望和方差
<div class="go"></div>
</section>


<section id="probability-of-large-card" data-tags="cards probability">
### Probability of Large Card

<!-- <p class="source-tag">.</p> -->
52 cards, compare you and dealer's number, only if you are larger you win, P(win) ?
<div class="go"></div>
</section>


<section id="number-of-color-changes" data-tags="cards probability">
### Number of Color Changes

<!-- <p class="source-tag">.</p> -->
一副扑克牌只看红黑，洗牌后按顺序看整副牌平均颜色会有多少次变化？
<div class="go"></div>
</section>


<section id="combinatorial-analysis" data-tags="probability">
### Combinatorial Analysis

<!-- <p class="source-tag">.</p> -->

This is a short list of problems in Section 4.2 of *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

1. Estimate the prob. of each poker hands
- four-of-a-kind, full house, flush, straight, straight flush, two pairs
2. Hopping rabbit hops 1 or 2 steps, how many ways to hop n steps?
3. Screwy pirates 2
- add enough locks to ensure at least 6/11 together can open a treasure box
4. Chess tournament of $2^n$ players
- P(top 1 meets top 2 in final)
5. Application letters: 5 randomly addressed to 5 people are all misaddressed, prob of 0 correct
6. Birthday problem: how many random people required to have prob of at least 2 sharing the same birthday more than 0.5
7. 100th digit right to the decimal point of $(1+\sqrt2)^{3000}$
8. Cubic of random integer in $[1, 10^{12}]$ ends with 11.
</section>


<section id="conditional-probability-and-bayes-formula" data-tags="probability">
### Conditional Probability and Bayes' formula

<!-- <p class="source-tag">.</p> -->
This is a short list of problems in Section 4.3 of *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

1. Boys and girls
2. All-girl world?
3. Dual-head unfair coin among 999 normal coins
4. Fair probability from an unfair coin
5. Dart game
6. Birthday line
  - Best position in line so that you are the first having someone with the same birthday before you
7. Dice order: prob of increasing order among 3 dice
8. Monty Hall problem
  - 1 car and 2 goats
  - 1 car and 999 goats?
9. Amoeba population
  - equal prob of die, stay the same, split into two and split into three
  - prob of die out eventually
10. Candies in a jar
  - 10 red 20 blue 30 green, prob of at least 1 blue and 1 green when red are all taken
11. Coin toss game - 2 people targeting HT sequence
12. Russian roulette series
  - standard one
  - allow spin after every trial
  - two bullets placed randomly or consecutively
13. Aces: 4 players each with 13 cards, prob of each having an ace
14. Gambler's ruin problem
15. Basketball scores
  - each throw success prob = (prev success / prev trials)
  - P(100th throw score 50) = ?
16. Cars on road
<div class="go"></div>
</section>


<section id="discrete-and-continuous-distributions" data-tags="probability">
### Discrete and Continuous Distributions

<!-- <p class="source-tag">.</p> -->
This is a short list of problems in Section 4.4 of *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

1. Meeting probability of two people
2. Probability of triangle of a stick in 3 pieces
3. Property of Poisson process
  - arrive at a random time, the expected residual life
4. Moments of normal distribution
<div class="go"></div>
</section>


<section id="expected-value-vairance--covariance" data-tags="probability">
### Expected Value, Vairance and Covariance

<!-- <p class="source-tag">.</p> -->
This is a short list of problems in Section 4.5 of *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

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
<div class="go"></div>
</section>


<section id="order-statistics" data-tags="probability">
### Order Statistics

<!-- <p class="source-tag">.</p> -->
This is a short list of problems in Section 4.6 of *A Practical Guide to Quantitative Finance Interviews* by Xinfeng Zhou.

1. Expected value of max and min
2. Correlation of max and min
3. Random ants
<div class="go"></div>
</section>


<section id="get-maximum" data-tags="probability">
### Get Maximum

<!-- <p class="source-tag">QIA.</p> -->
对于n个互不相同的数 $a_1, \dots, a_n$。用如下算法得到其中最大值 $m=a_1$, 依次将 m 与 $a_2, \dots a_n$ 比较 若 $a_i \gt m$, 则令 $m=a_i$. 求对 $m$ 做赋值操作次数的期望次数?
<div class="go"></div>
</section>


<section id="expected-return-of-rolling-again" data-tags="probability">
### Expected Return of Rolling Again

<!-- <p class="source-tag">.</p> -->
Roll a 100-side die and get paid the number it shows. You can roll again by paying 1 dollar. What is the best expected payoff?
<div class="go"></div>
</section>


<section id="distance-in-unit-sphere" data-tags="geometry probability">
### Distance in Unit Sphere

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
有 N 个点均匀随机分布在半径为 1 的单位球中,设它们距离球心的距离为 $d_1, d_2, \dots d_N$. 设 $D = \min(d_1,d_2,\dots,d_N)$，求 $D$ 的中位数。
<div class="go"></div>
</section>


<section id="fair-game-from-biased-coin" data-tags="probability">
### Fair Game from Biased Coin

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
How to use a biased $p$-coin, say $p=0.999$, to design a fair game?
</section>


<section id="empty-the-boxes" data-tags="ball probability">
### Empty the Boxes

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
Two boxes, A and B contain n balls each.

In each step, you randomly choose a box and then draw one ball from it.

Repeat this until the box you choose actually turns out to be empty.

What's the expected number of remaining balls in the other box at the end of this process?
<div class="go"></div>
</section>


<section id="pattern-from-uniform-rv-sequences" data-tags="logic probability">
### Pattern from Uniform r.v. sequences

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
The numbers $x_1, x_2, x_3, \dots$ are chosen uniformly at random from $[0, 1]$ and independently from each other as long as they follow the pattern $x_1 \gt x_2$, $x_2 \lt x_3$, $x_3\gt x_4$, $x_4 \lt x_5, \dots$.

How many numbers on average can be chosen before the pattern is broken?
<div class="go"></div>
</section>


<section id="people-arrive-and-meet-each-other" data-tags="probability">
### People Arrive and Meet Each Other

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
There are N people arriving between 9 a.m. and 10 a.m..

Each waits for 15 minutes after arrival.

What is the probability that they meet each other given their arrival time is uniformly distributed.
<div class="go"></div>
</section>


<section id="5-points-on-the-same-half" data-tags="geometry probability">
### 5 Points on the Same Half

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
在球面上任取 5 个点，位于同一个半球的概率是多少?
<div class="go"></div>
</section>


<section id="union-distribution" data-tags="probability">
### Union Distribution

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
Assume $X, Y$ are i.i.d. standard normal distribution r.v., find the expectation and variance of $(X ~\text{given}~ X+Y=1)$.
<div class="go"></div>
</section>


<section id="visit-all-edges" data-tags="probability">
### Expected Number of Moves to Visit All Edges of a Triangle/Tetrahedron

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
有一个三角形ABC，一开始在A点，每一时刻向每个点移动的概率都是1/2，求第一次把每一条边都走过的移动次数的期望。然后再拓展至四面体ABCD的情形
<div class="go"></div>
</section>


<section id="3-random-chords" data-tags="geometry probability">
### Regions Created by 3 Random Chords in a Circle

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
一个圆随机生成三条弦把圆划分的区域数量的期望
<div class="go"></div>
</section>


<section id="seats-choice" data-tags="probability">
### Seats Choice

<!-- <p class="source-tag">绿皮书.</p> -->
100 passenger, 1st drunk, P(last passenger in correct seat)

Follow-up: kth drunk?
<div class="go"></div>
</section>


<section id="all-points-on-a-semicircle" data-tags="geometry probability">
### All Points Lie on a Semicircle

<!-- <p class="source-tag">.</p> -->
N points drawn randomly on the circumference of a circle, P(all points lie on a semicircle) ?
<div class="go"></div>
</section>


<section id="obtuse-triangle-in-a-unit-circle" data-tags="geometry probability">
### Obtuse Triangle in a Unit Circle

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
在单位圆内随机扔两个点A和B，三角形OAB是钝角三角形的概率。
<div class="go"></div>
</section>


<section id="guess-the-ranks-of-rvs" data-tags="strategy probability">
### Guess the Ranks of n Uniform Random Variables

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
做一个游戏，给 $n$ 个随机变量，$x_1,x_2,\dots, x_n$, iid uniformly distributed from (0,1). 依次猜测每个 $x_i$ 在 $n$ 个变量中的大小排名 (从 $x_1$ 到 $x_n$) 如果全部猜对则获得胜利。问你的best strategy 和采用这种 strategy 取胜的概率
<div class="go"></div>
</section>


<section id="difference-between-any-two-of-three-uniform-rv" data-tags="probability">
### Difference Between Any Two of Three Uniform r.v.

<!-- <p class="source-tag">Redbook, Newjoy.</p> -->
三个变量服从 $U(0, 6)$ 问任意两变量差均 $\gt 1$ 的概率.
<div class="go"></div>
</section>


<section id="maximize-return-in-coin-auction" data-tags="strategy">
### Maximize Return in a Coin Auction

<!-- <p class="source-tag">Redbook, Newjoy.</p> -->
你竞拍一枚硬币。你确信硬币的价格在0到100之间，如果你的出价大于价格，你就赢了，并以1.5倍的价格卖给你的朋友。你的出价是多少，才能获得最大的利润?
<div class="go"></div>
</section>


<section id="find-x-with-probability-and-restriction" data-tags="probability">
### Find x with Probability and Restriction

<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
随机变量 $Y\sim U(0, 100)$, 求 $X > 0$ s.t. $P([(100-X)/Y] > [(100-Y)/X])$ 最大, $[a]$ 表示不超过 $a$ 的最大整数
<div class="go"></div>
</section>


<section id="variance-of-determinant" data-tags="probability">
### Variance of Determinant

<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
A 是 n 阶矩阵，每个元素为 -1 或 1 (等概率)，求 Var(det(A))
<div class="go"></div>
</section>


<section id="maximum-number-of-ones" data-tags="linear-algebra">
### Maximum Number of Ones
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
$A$ 是 n 阶 01 矩阵，$A^2=0$，求矩阵中1的个数的最大值.
<div class="go"></div>
</section>


<section id="strategy-in-2xn-grid" data-tags="strategy">
### Winning Strategy in a 2xn Grid Filling Game
<!-- <p class="source-tag">QIA.</p> -->
A 和 B 在 2xn 的模盘上进行如下游戏: A 先行，A 用 1x2 的横格子填，B 用 2x1 竖格子填，谁先无处可填，谁输。 试问 n 满足什么条件下，A 有必胜策略?
<div class="go"></div>
</section>


<section id="guessing-coin-toss" data-tags="marble strategy">
### Guess Coin Toss Based on Marble Movements
<!-- <p class="source-tag">.</p> -->

I am going to toss a fair coin and you are trying to determine if I tossed a Head or Tail.

You do this using the rule I follow when I toss my coin:

I have before me 2 red boxes each with a red marble inside them, I also have 2 blue boxes each with a blue marble inside of them.

Finally, there are two empty white boxes. If I toss a Head I must move a red marble from a red box into an empty white box.

Similarly, if I toss a Tail I must move a blue marble from a blue box into an empty white box.

To aid you in your guess of my toss, once I have moved a marble, you are then permitted to open and examine the contents of a single red, blue or white box.

What is the best strategy and what is the optimal probability of guessing correctly? What if there are $R$ red and $B$ blue boxes and $W$ white boxes?
<div class="go"></div>
</section>

<section id="minimize-the-chance-of-getting-a-red-marble" data-tags="matble probability">
### Minimize the Chance of Getting a Red Marble
<!-- <p class="source-tag">.</p> -->

You have 100 red and 100 black marbles, to be distributed into two jars. Once distributed, a jar will be selected at random, and a marble randomly selected. What distribution of marbles will minimize the chance of getting a red marble?
<div class="go"></div>
</section>


<section id="m-marbles-in-n-bins" data-tags="marble logic">
### m Marbles in n Bins
<!-- <p class="source-tag">>>.</p> -->
N个相同的桶，m 个不同的球，有多少种方法 distribute m balls in N 桶? Follow up: 如果每个桶至少要有 k 球呢?
<div class="go"></div>
</section>


<section id="range-based-integer-comparison" data-tags="strategy">
### Range-Based Integer Comparison Game
<!-- <p class="source-tag">.</p> -->

Fix $k\lt n$ positive integers, and two players play the following game:

each player picks a positive integer between 1 and n.

If the two numbers picked are within k of each other, the larger number wins and that player gains one point while the other player loses one point.

Else, the smaller number wins and that player gains one point while the other loses one.

Picking the same number results in a tie, and no points gained or lost.

I've tried to find patterns for optimal mixed strategies based on arbitrary k and n, without success.

Here I define an "optimal strategy" as one that has ≥0 expected value against any mixed strategy.

As an example, when k=1 and n=3 this game specializes to rock-paper-scissors, with a unique optimal strategy of (1/3, 1/3, 1/3).
<div class="go"></div>
</section>


<section id="closest-to-die-roll" data-tags="strategy">
### Closest to Die Roll
<!-- <p class="source-tag">.</p> -->

You are player 1 and you are versing another person player 2.

You and player 2 choose any integer from 1 to 30.

A 30-sided die is rolled and whoever's number is the closest to the die's number is the "winner" of the game and gains points according to what they guessed.

e.g. Player 1 picks number 20 and player 2 picks number 15. The die lands on the number 18 so player 1 wins and gets 20 points.

(Note that you can choose whether or not to go first or second in picking a number (you will know the other player's number if you go second)).

What is the optimal strategy for this game?
<div class="go"></div>
</section>


<section id="subtract-10-number-comparison" data-tags="strategy">
### Subtract 10 Number Comparison Game
<!-- <p class="source-tag">.</p> -->

2 players pick a number from 1 to 100. From the player with the higher number, we subtract 10 and whoever has the higher number then, wins. What is the optimal strategy?
<div class="go"></div>
</section>

<section id="win-on-sum-7-with-rerolling" data-tags="dice strategy">
### Win on Sum-7 with Rerolling
<!-- <p class="source-tag">Redbook, AMC10.</p> -->

Jason rolls three fair standard six-sided dice.

Then he looks at the rolls and chooses a subset of the dice (possibly empty, possibly all three dice) to reroll.

After rerolling, he wins if and only if the sum of the numbers face up on the three diceis exactly 7.

Jason always plays to optimize his chances of winning. What is the probability that he chooses to reroll exactly two of the dice?
<div class="go"></div>
</section>


<section id="sum-constrained-resource-allocation" data-tags="strategy">
### Sum-Constrained Resource Allocation Game
<!-- <p class="source-tag">>Redbook, 红薯哥.</p> -->

$K$ dollars in a black box. You write a number $x$, and Jack also writes a number $y$. Both don't know what each other writes but know $K$. If $x + y\leq K$, you win $x$ and Jack wins $y$. If $x+y \gt K$, both win $0$.

- Follow up: ten boxes, five of which have $50$ inside, and another five have $40$ inside. If Jack is rational, what should you write.
- Follow up: one box, $K=100$. Play $1,000$ times. lf Jack claims that he writes $80$ every time, what is your strategy?
<div class="go"></div>
</section>


<section id="opponent-bankruptcy-with-a-biased-coin" data-tags="markov-chain">
### Opponent Bankruptcy with a Biased Coin
<!-- <p class="source-tag">>.</p> -->
You will play a coin game against an opponent.

A biased coin will be continually flipped where there is a $2/3$ chance of Heads and a $1/3$ chance of Tails.

If Heads is flipped then you receive $1$ from your opponent. If Tails is flipped then you pay $1$ to your opponent.

You start with $10$ and your opponent starts with $20$. You keep playing until one of you is bankrupt (= has $0$ left).

What is the probability, that your opponent bankrupts?
<div class="go"></div>
</section>


<section id="asymmetry-random-walk" data-tags="markov-chain">
### Asymmetry Random Walk
<!-- <p class="source-tag">>Redbook, 红薯哥.</p> -->
对于一个起点为 1 的一维非对称随机游走仅在原点处有一个吸收壁，求该随机游走被 0 处的吸收壁吸收时走过步数的数学期望。
<div class="go"></div>
</section>


<section id="three-frogs-to-meet" data-tags="probability markov-chain">
### Three Frogs to Meet on an Equilateral Triangle
<!-- <p class="source-tag">>Redbook, 红薯哥.</p> -->
Three frogs are jumping on the vertices of an equilateral triangle. A vertex can be occupied by more than one frog. Every minute, each frog jumps from the vertex where it is located to one of the other two vertices, each being equally likely. The frogs choose where to jump independently of each other. If initialy each vertex contains exactly one frog, how long does it take on average for all the frogs to meet at the same vertex?
<div class="go"></div>
</section>


<section id="random-walk-on-a-pentagon" data-tags="markov-chain">
### Random Walk on a Pentagon
<!-- <p class="source-tag">>Redbook, Newjoy.</p> -->
五边形，从一个顶点出发，在每个顶点做对称随机游走，当第一次遍历每个顶点的时候，停在哪个顶点的概率最高?
<div class="go"></div>
</section>


<section id="examples-of-markov-chains" data-tags="markov-chain">
### Examples of Markov Chains
<!-- <p class="source-tag">>.</p> -->
1. Equations for absorption probabilities
  - unique solutions to equations $a_s = 1, a_i = 0$ for absorbing states, and $a_i = \sum_{j=1}^{M}a_{j}p_{ji}$ for transient states
2. Equations for the expected time to absorption
  - $\mu_i = 1+\sum_{j=1}^{M}\mu_{j}p_{ji}$ for transient states and $\mu_i = 0$ for absorbing states
3. Gambler's ruin problem
4. Dice question
  - single 12 or dual 7
5. Coin triplets
6. Color balls (very difficult)
<div class="go"></div>
</section>



<section id="expected-number-of-times-go-bankrupt" data-tags="martingale ost">
### Expected Number of Times to Go Bankrupt
<!-- <p class="source-tag">>>Redbook, 爱跳舞的papaya.</p> -->

三个人开始有分别有 a,b,c(整数)元，每一轮三人都扔一枚硬币。如果硬币的朝向不完全样，得到不同面的人会从另外两人手中各拿走一元钱。问其中一人破产的期望次数。
<div class="go"></div>
</section>


<section id="examples-of-martingale" data-tags="martingale ost">
### Examples of Martingale
<!-- <p class="source-tag">>>.</p> -->

1. Wald's Equality
  - A martingale stopped at a stopping time is a martingale
2. Drunk man
3. Dice game revisit
4. Ticket line
  - price 5 and $2n$ people having 5 and 10 bills
5. Coin sequence
  - $n$ heads in a row (typist monkey problem)
  - We generalize this problem to have a $1/6$ chance of getting head (or a six from a dice), and $5/6$ of getting tail (or except a six from a dice), and we want to obtain a given sequence, say $HHTTHHHTT$, what is the expected number of tosses needed?
<div class="go"></div>
</section>


<section id="Start-with-1" data-tags="logic probability">
### $2^n$ Start with 1
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
If n is a random positive integer, what is the probability that $2^n$ starts with the digit 1?
<div class="go"></div>
</section>



<section id="diff-of-ordered-uniform-rv" data-tags="logic probability">
### Difference of Ordered Uniform r.v.

$a, b, c, d$ are 4 i.i.d. uniform r.v. on $[0, 1]$ after sorted ($a \ge b \ge c \ge d$). What is the probability that $a-b \gt b-c$?

<div class="go"></div>
</section>


<section id="neighbor-and-good-point" data-tags="logic">
### Neighbor and Good Point
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
Draw $N$, $N\geq 3$ i.i.d. points uniformly from interval $[0, 1]$.

Define the neighbor of a point as the closest point to it (excluding itself).

If the neighbor of its neighbor is the point itself we call this point a good point.

The expectation of the number of good points is $f(N)$. What is $f(N)$ in general?
<div class="go"></div>
</section>


<section id="win-points-in-tournament" data-tags="logic">
### Win Points in Tournament
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
N 只球队两两比赛，赢的队伍得 2 分，输的得 0 分，如果打平则各得 1分。已知所有队伍积分的一半都是从末尾 10 支队伍上赢来的。那么 N 是多少?
<div class="go"></div>
</section>


<section id="carr-madan-formula" data-tags="logic">
### Carr-Madan Formula
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
Given $\mathbb E(X), \mathbb E(\max(k, X)), \mathbb E(\min(k, X))$ for all $k$,

write a formula for $\mathbb E(f(X))$ if $f\in\mathcal C^2(\mathbb R)$. (See Carr-Madan Formula)
<div class="go"></div>
</section>


<section id="sum-of-digits" data-tags="logic">
### Sum of Digits
<!-- <p class="source-tag">Redbook, Newjoy.</p> -->
从1到1000000的所有数字的位数之和是多少?注意位数之和不是数字本身，举例，对于11，位数之和为 1+1=2
<div class="go"></div>
</section>


<section id="different-row-and-column-sums" data-tags="matrix logic">
### Different Row and Column Sums
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
能否找到 n 阶矩阵，每个矩阵元为 -1,0,1, 使得所有的行和和列和都互不相同
<div class="go"></div>
</section>


<section id="odd-row-and-column-sums" data-tags="matrix logic">
### Odd Row and Column Sums
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
有多少 n 阶 01 矩阵满足每行的和和每列的和都是奇数
<div class="go"></div>
</section>


<section id="determinant-of-01-matrix" data-tags="matrix logic">
### Determinant of 01 Matrix
<!-- <p class="source-tag">Redbook, 爱跳舞的papaya.</p> -->
A 是 n 阶 01 矩阵，每一行的1都连续出现，求证 det(A) in -1, 0, 1
<div class="go"></div>
</section>



<section id="problem-simplification" data-tags="logic">
### Problem Simplification
<!-- <p class="source-tag">.</p> -->
1. Screwy pirates
  - 5 pirates 100 coins, voting
2. Tiger and sheep
  - 100 tigers, 1 sheep
  - tiger eats sheep and becomes a sheep
3. The 100 prisoners, 1 watcher problem
  - watcher can shoot only one prisoner
  - rule that prevent anyone to escape
<div class="go"></div>
</section>


<section id="logic-reasoning" data-tags="logic">
### Logic Reasoning
<!-- <p class="source-tag">.</p> -->
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
<div class="go"></div>
</section>


<section id="thinking-out-of-the-box" data-tags="logic">
### Thinking Out of the Box
<!-- <p class="source-tag">.</p> -->
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
<div class="go"></div>
</section>


<section id="application-of-symmetry" data-tags="logic">
### Application of Symmetry

1. Coin piles
  - 1000 coins on the floor, 980 coin tails, 20 coin heads. separate into two piles to have equal heads
2. Mislabeled bags
  - 3 bags, 1 bag has 3 white balls, 1 bag has 3 black balls, 1 bag has 1 white and 1 black
3. Wise men
  - 50 wise man randomly called, putting a glass, to test if anyone can state that everyone has been called.
<div class="go"></div>
</section>


<section id="series-summation" data-tags="logic">
### Series Summation

1. Clock pieces
2. Missing integers in 1 to 100
3. Counterfeit coins I
  - 10 bags with 100 coins, 1 counterfeit bag with lighter or heavier 1 gram coins. weight once using digical scale
4. Glass balls
  - minimum number of glass balls to test the highest floor of a 100 floor building without breaking the balls
<div class="go"></div>
</section>


<section id="piegon-hole-principle" data-tags="logic">
### The Piegon Hole Principle

1. Matching socks
2. Handshakes
3. Have we met before?
4. Ants on a square
  - 51 ants on a 1x1 square, find a position so a 1/7 radius circule encompasses at least 3 ants
5. Counterfeit coins II
  - 10 bags with 100 coins, each bag contains either 9/10/11 gram coins, determine all bags' type using digital scale in one weighing
<div class="go"></div>
</section>


<section id="math-induction" data-tags="logic">
### Math Induction

1. Coin split problem
  - split 1000 coins into 2 piles and obtain xy score, further split until all are in single piles. the final sum will always be the same
2. Chocolate bar problem
  - minimum breaks to break 6x8 choco into 48 pieces
3. Race track
<div class="go"></div>
</section>


<section id="contradiction" data-tags="logic">
### Proof by Contradiction

1. Irrational number
2. Rainbow hats (hard)
  - 7 color 7 prisoners, guess without communication, at least one correct then all free
<div class="go"></div>
</section>


<section id="pair-in-fibonacci-sequence" data-tags="logic">
### Pair in Fibonacci Sequence
<!-- <p class="source-tag">.</p> -->
Assume a Fibonacci sequence $\{a_n\}$ such that $a_1=a_2=1$ and $a_{i+2} = a_{i+1} + a_{i}$. Find a polynomial of order 1009 $p(n)$ such that on some integers we have $p(2n+1) = a_{2n+1}$ where $n=0,\dots, 1009$. Now we claim that $p(2021) = a_{j} - a_{k}$. Find $j$ and $k$ and prove that this pair is unique.
<div class="go"></div>
</section>


<section id="light-changes" data-tags="logic">
### Light Changes
<!-- <p class="source-tag">.</p> -->
八盏灯围成一个环，各自初始化明暗状态，灯每秒都会同时变化一次：如果跟右边的灯颜色相同，变暗；如果颜色不同，变亮。最多多少秒后，所有灯都会暗下来。
<div class="go"></div>
</section>




<section id="integer-matrix-inverse" data-tags="linear-algebra">
### Integer Matrix Inverse

What are the sufficient and necessary conditions for an integer matrix to have an inverse such that elements in this inverse are all integers?

<div class="go"></div>
</section>



<section id="second-largest-in-array" data-tags="algorithm">
### Second Largest in Array
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
从一个长度为 $N$ 的无重复元素数组中找出第二大的数，最坏情况下最少需要进行多少次比较?
<div class="go"></div>
</section>

<section id="r-square-in-lr" data-tags="linear-regression">
### R-square in LR
<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
已知y对x1和x2分别进行一元线性回归的R方，求y对x1和x2二元回归的R方的取值范围
<div class="go"></div>
</section>


<section id="estimate-from-noisy-difference" data-tags="coding">
### Estimate from Noisy Difference

<!-- <p class="source-tag">Redbook, 维特根斯坦.</p> -->

Given noisy estimates of signed differences $d_{ij}$ between a set of $n$ real numbers $\{x_i\}$,

find estimators $\{\hat x_i\}$ that minimize $\sum_{i,j}(d_{ij}-(\hat x_i- \hat x_j))^2$ subject to $\min(\hat x_i) = 0$.

The data is given as a skew-symmetric matrix, $D_{n\times n} = (d_{ij})$, with $d_{ij}\approx x_i - x_j$. Write a program.

<div class="go"></div>
</section>


<section id="red-green-card-drawing" data-tags="coding">
### Red-Green Card Drawing Game

Consider the following game. Beginning with a deck of even size = N cards that are half red and half green(N/2 each), you begin drawing cards. For each red card, you win 1 and for each green card, you lose 1. You may stop at any time. What is the value of this game to you assuming you play optimally? Write a program that computes this value.
<div class="go"></div>
</section>


<section id="find-out-the-fifth-card" data-tags="logic">
### Find out the Fifth Card

一副扑克牌去掉大小王后, 由 A 从中任选 5 张交给 B, B 看过后从中选了 4 张给 C 展示, C 如何能够说出 A 选的第 5 张牌是什么?

<div class="go"></div>
</section>



<section id="range-of-eigenvalue" data-tags="linear-algebra">
### Range of Eigenvalue

<!-- <p class="source-tag">Redbook, 红薯哥.</p> -->
Given two real symmetrix matrix $A, B$, what is the range of eigenvalues of $A+B$?

<div class="go"></div>
</section>


<section id="is-k-in-fibonacci-sequence" data-tags="logic">
### Is k in Fibonacci Sequence?

由a和b两个不保证同号的整数开始，构造斐波那契数列（也就是第三个 a+b，这样往后）
对于给定某个整数 k，给出算法判断k 是否在这个数列里？这个算法的复杂度是多少？

<div class="go"></div>
</section>




<section id="parametric-dice" data-tags="dice probability">
### Parametric Dice

You made a 6-sided die, where the probability of showing 1 is $p_1\sim U(0, 1)$, 2 is $p_2\sim U(0, 1-p_1)$, and so on till the last one having $1-(p_1+\dots+p_5)$.

Since you have made this die, you roll it and it shows 2. What is the probability of the next roll is still 2?

<div class="go"></div>
</section>




<section id="flip-sequence-coin" data-tags="coin logic game">
### Flip a Sequence of Coins

A sequence of 2000 coins are head-up placed. Player A and B are taking turns to play the game. The only valid move is that one chooses a head-up coin $k$ such that there are at least 49 coins after $k$ and it flips coins $k\sim k+49$. The one who cannot find a valid move loses.
Who will win the game? Can you ensure the game will be ended in finite moves?

<div class="go"></div>
</section>





</div>
<!-- The end of question area -->


## Reference

Original problems/answers are collected from various sources, including but not limited to:

- Redbook
- StackExchange
- Zhihu
- Glassdoor
- Other QR's minds
- My own thoughts

Most of them have been processed and modified.
Some of them might not be still trackable due to change of username, deletion of posts, etc.

I gratefully acknowledge the original authors and contributors and thank their kindly sharing to the public.


<!-- include css/js -->
<link rel="stylesheet" href="assets/css/quant-questions-and-answers.css">
<script src="assets/js/quant-questions-and-answers.js"></script>
