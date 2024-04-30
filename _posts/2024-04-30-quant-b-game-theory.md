---
title:  "Question (and Answer) List from Quantitative Researcher - Part 4. Game Theory"
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

## Game Theory

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

