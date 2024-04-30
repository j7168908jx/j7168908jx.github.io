---
title:  "Question (and Answer) List from Quantitative Researcher - Part 4. Strategy and Game Theory"
excerpt: "Finding optimal strategies in various games"
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

## Strategy and Game Theory

- <details><summary><cite>微信公众号, QIA.</cite>
  A 和 B 在 2xn 的模盘上进行如下游戏: A 先行，A 用 1x2 的横格子填，B 用 2x1 竖格子填，谁先无处可填，谁输。 试问 n 满足什么条件下，A 有必胜策略?
  </summary>
  $n \equiv 1 ~\mathrm{mod}~ 4$ 除外 A 有必胜策略. See [source](https://mp.weixin.qq.com/s/yXs346MEhitUmBC2l_lq3g).
  </details>


- <details><summary><cite><a href="https://math.stackexchange.com/questions/4384425/optimal-strategy-in-a-coin-game-has-unexpected-symmetry">StackExchange</a></cite>
  I am going to toss a fair coin and you are trying to determine if I tossed a Head or Tail. You do this using the rule I follow when I toss my coin:I have before me 2 red boxes each with a red marble inside them, I also have 2 blue boxes each with a blue marble inside of them. Finally, there are two empty white boxes. If I toss a Head I must move a red marble from a red box into an empty white box.

  Similarly, if I toss a Tail I must move a blue marble from a blue box into an empty white box. To aid you in your guess of my toss, once I have moved a marble, you are then permitted to open and examine the contents of a single red, blue or white box.

  What is the best strategy and what is the optimal probability of guessing correctly? What if there are $R$ red and $B$ blue boxes and $W$ white boxes?

  </summary>
  ...
  </details>

- <details><summary><cite><a href="https://math.stackexchange.com/questions/1525074/what-are-the-optimal-mixed-strategies-for-this-game">StackExchange</a></cite>
  Fix $k\lt n$ positive integers, and two players play the following game: each player picks a positive integer between 1 and n. If the two numbers picked are within k of each other, the larger number wins and that player gains one point while the other player loses one point. Else, the smaller number wins and that player gains one point while the other loses one. Picking the same number results in a tie, and no points gained or lost. I've tried to find patterns for optimal mixed strategies based on arbitrary k and n, without success. Here I define an "optimal strategy" as one that has ≥0 expected value against any mixed strategy.As an example, when k=1 and n=3 this game specializes to rock-paper-scissors, with a unique optimal strategy of (1/3, 1/3, 1/3).

  </summary>
  ...
  </details>

- <details><summary><cite><a href="https://math.stackexchange.com/questions/2393250/finding-the-best-optimal-strategy-for-this-game">StackExchange</a></cite>
  You are player 1 and you are versing another person player 2. You and player 2 choose any integer from 1 to 30. A 30 sided die is rolled and whoever's number is the closest to the die's number is the "winner" of the game and gains points according to what they guessed.e.g. Player 1 picks number 20 and player 2 picks number 15.The die lands on the number 18 so player 1 wins and gets 20 points.

  (Note that you can choose whether or not to go first or second in picking a number (you will know the other player's number if you go second)).

  What is the optimal strategy for this game?
  </summary>
  ...
  </details>

- <details><summary><cite><a href="https://math.stackexchange.com/questions/2393250/finding-the-best-optimal-strategy-for-this-game">StackExchange</a></cite>
  You are player 1 and you are versing another person player 2. You and player 2 choose any integer from 1 to 30. A 30 sided die is rolled and whoever's number is the closest to the die's number is the "winner" of the game and gains points according to what they guessed.e.g. Player 1 picks number 20 and player 2 picks number 15.The die lands on the number 18 so player 1 wins and gets 20 points.

  (Note that you can choose whether or not to go first or second in picking a number (you will know the other player's number if you go second)).

  What is the optimal strategy for this game?
  </summary>
  ...
  </details>


- <details><summary><cite><a href="https://math.stackexchange.com/questions/4558093/2-players-pick-number-from-1-100-10-is-subtracted-from-higher-number-whats-th">StackExchange</a></cite>
  2 players pick a number from 1 to 100. From the player with the higher number, we subtract 10 and whoever has the higher number then, wins. What is the optimal strategy?
  </summary>
  ...
  </details>

- <details><summary><cite>Redbook, AMC10.</cite>
  Jason rolls three fair standard six-sided dice. Then he looks at the rolls and chooses a subset of the dice (possibly empty, possibly all three dice) to reroll. After rerolling, he wins if and only if the sum of the numbers face up on the three diceis exactly 7. Jason always plays to optimize his chances of winning. What is the probability that he chooses to reroll exactly two of the dice?
  </summary>
  ...
  </details>


- <details><summary><cite>Redbook, 红薯哥.</cite>
  $K$ dollars in a black box. You write a number $x$, and Jack also writes a number $y$. Both don't know what each other writes but know $K$. If $x + y\leq K$, you win $x$ and Jack wins $y$. If $x+y \gt K$, both win $0$.
  </summary>

  - <details><summary>One box $K=100$. If Jack is rational, what should you write.
    </summary>
    Write out the gain matrix. Easily we can see there is no pure Nash equilibrium and thus we turn to find a mixed strategy. Assume Jack writes $y$ with probability $p_y$, which makes us indifferent writing any of $1$ to $99$ (note that he will not write $100$ and we will not write $100$ as well).

    The equilibrium will be
    $$\begin{pmatrix} 1 & 1 & \dots & 1 & 1\\ 2 & 2 & \dots & 2 & \\ \vdots & \vdots & \vdots & & \\ 99 & & & &\end{pmatrix} \begin{pmatrix}p_1\\p_2\\ \vdots \\ p_{99}\end{pmatrix} = \begin{pmatrix}1\\1\\ \vdots \\ 1\end{pmatrix}.$$

    Solve the system to obtain the mixed strategy for both players since they are symmetric.
    </details>
  - Follow up: ten boxes, five of which have $50$ inside, and another five have $40$ inside. If Jack is rational, what should you write.
  - Follow up: one box, $K=100$. Play $1,000$ times. lf Jack claims that he writes $80$ every time, what is your strategy?
  </details>

