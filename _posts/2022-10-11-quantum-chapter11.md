---
author: Xiang Li
paginate: true
theme: gaia
marp: true
# class: lead
# headingDivider: 2  # with this option all header above level 2 will automatically create another page
math: katex
title: (QC2010 Chapter 11) Entropy and Information
tag: "Quantum Computing"
# excerpt: "Presenation slides"
excerpt_separator: <!--more-->
---

In this presentation slides we go through basic definitions in Chapter 11.

<!--more-->

---

<!-- _class: lead -->
# (Chapter 11) Entropy and Information

Xiang Li

2022/10/11

---

## Reading Goals

- Review basic definitions & properties of *entropy* in both classical and quantum information theory.
  - definitions: entropy, relative entropy, conditional entropy, and mutual information
  - strong subadditivity
  - convexity of relative entropy
  - monotonicity of relative entropy

**Note: we use $\log$ for $\log_2$ throughout the ppt.**

---

<!-- _class: lead -->

## Shannon Entropy

---

- Entropy of a r.v. $X$ generally quantifies how much info we gain, on average, when we learn the value of $X$.
- Complementary, the amount of uncertatinty about $X$ before we learn its value.

- Example: entropy of tossing a (fair) coin and an (unfair) coin:
- which contains more entropy?

---

### Intuitive Assumption for Entropy

To quantify how much info in an event $E$, denoted as $I(E)$, we may want

- $I(E)$ is only related to the prob of an event, not to the event itself.
  - $I(E) = I(E')$ if $\mathbb P(E) = \mathbb P(E')$.
- $I = I(E) = I(\mathbb P(E)) = I(p)$ is a smooth function of prob $p$.
- $I(pq) = I(p) + I(q)$, i.e., info gained by two independent events is the sum of info gained by each event.

$I(p) = k\log_2 p$ for some constant $k$ satisfies all above.

---

- The Shannon entropy is defined as
$$H(X) \equiv H(p_1, \cdots) \equiv -\sum_x p_x\log_2 p_x.$$

- Why this definition?
  - It is the expectation of info gained derived from $I(p)$ (up to a constant $k$), $H(X) = (-1/k) \sum_x p_xI(p_x)$.
  - It can be used to quantify the resources needed to store info.
- It is the number of bits (after compression) required to send data $X$ (i.e., obeying $X$'s distribution). (Shannon's noiseless coding theorem)

---

### Example: encoding 1, 2, 3, 4

- Suppose you want to send a monte carlo result (i.e., 1000000 draws from 1,2,3,4) via Internet as short as possible.
- How would you encode the result to a bit stream (010101001...)
  - if the chances are equal (1/4 for each outcome)?
  - with probability vector (1/2, 1/4, 1/8, 1/8)?

Optimal:

- 1 -> 00, 2 -> 01, 3 -> 10, 4 -> 11
- 1 -> 0, 2 -> 10, 3 -> 110, 4 -> 111

---

<!-- _class: lead -->

## Basic Properties of Entropy

---

### The binary entropy

$$H_{\text{bin}}(p) \equiv -p\log p -(1-p)\log(1-p).$$

- Omit the subscript `bin` when the meaning is clear.
- $H(p) = H(1-p)$.
- Maximum attained when $p=1/2$.
- Useful to understand more general properties of entropy.

---

### Example: Mixing probability distribtions

- A biased Coin $A$, outcome `head` with $p_A = 3/4$
- Another biased Coin $B$, outcome `head` with $p_B = 99/100$

Bob flips $A$ with prob $q$ and $B$ with prob $1-q$, the outcome is `tail`.

Do you gain more info than with only one coin?

Intuitively, we have (concavity)

$$H(qp_A + (1-q)p_B) \geq qH(p_A) + (1-q)H(p_B).$$

---

### The Relative Entropy (Kullback–Leibler Divergence)

For two prob measures $\mathbb P$ and $\mathbb Q$, defined over the same index set,

$$H(p(x) \| q(x)) \equiv \sum_x p(x)\log\frac{p(x)}{q(x)} = -H_{\mathbb P}(X) -\sum_x p(x) \log q(x).$$

- Non-negativity. $H(p\| q) \geq 0$, with equality iff $p(x)=q(x)$.
- Shannon entropy can be viewed as a special case: if $q(x) \equiv 1/n$,
  $$H(p\|q) = -H(X) -\sum_xp(x)\log(1/d) = \log d - H(X).$$
- It is not a metric!

---

### Joint Entropy and Subadditivity of the Shannon entropy

For joint distribution $p(x, y)$ and its marginal distributions $p(x)$ and $p(y)$,

$$H(p(x, y)\| p(x)p(y)) = H(p(x)) + H(p(y)) - H(p(x, y)).$$

We can then deduce that the *joint entropy* $H(X, Y) \leq H(X) + H(Y)$. Equality iff $X$ and $Y$ are independent.

---

### Conditional Entropy and Mutual Information

The entropy of $X$ conditional on knowing $Y$ is

$$H(X\vert Y) \equiv H(X, Y) - H(Y).$$

The mutual information of $X$ and $Y$, measuring how much info $X$ and $Y$ have in common, is

$$H(X:Y) \equiv H(X) + H(Y) - H(X, Y) = H(X) - H(X\vert Y).$$

(This is actually the relative entropy!)

---

### Basic properties of Shannon Entropy
<!-- style: |
    section.properties li { font-size: 25px; }
-->

<!-- _class: properties-->

1. $H(X, Y) = H(Y, X)$, $H(X:Y) = H(Y:X)$.
2. $H(Y\vert X)\geq 0$ and thus $H(X:Y)\leq H(Y)$, with equality iff $Y$ is a function of $X$.
3. $H(X) \leq H(X, Y)$, with equality iff $Y$ is a function of $X$.
4. (**Subadditivity**) $H(X, Y) \leq H(X) + H(Y)$, with equality iff $X$ and $Y$ independent.
5. $H(Y\vert X) \leq H(Y)$ and thus $H(X:Y) \geq 0$, with equality in each iff $X$ and $Y$ independent.
6. (**Strong subadditivity**) $H(X, Y, Z) + H(Y) \leq H(X, Y) + H(Y, Z)$, with equality iff $Z\rightarrow Y\rightarrow X$ a Markov chain.
7. (**Conditioning reduces entropy**) $H(X\vert Y, Z) \leq H(X\vert Y)$.

---

#### Chaining Rule for Conditional Entropies

Let $X_1, \dots, X_n$ and $Y$ be any set of random variables. Then

$$H(X_1, \dots, X_n \vert  Y) = \sum_{i=1}^n H(X_i \vert  Y, X_1, \dots, X_{i-1}).$$

---

### The Data Processing Inequality

As processing data, the information about the output of a source decresae with time:

**Once information has been lost, it is gone forever.**

Suppose $X\rightarrow Y \rightarrow Z$ is a Markov chain, then

$$H(X) \geq H(X:Y) \geq H(X:Z).$$

The first inequality is saturated iff, given $Y$, it is possible to reconstruct $X$.

---

Also, (data pipelining inequality)

$$H(Z:Y) \geq H(Z:X).$$

---

<!-- _class: lead -->
## Von Neumann Entropy

---

Now we are to describe entropy with Quantum states.

- A similar fashion: replace probability distributions by density operators.

The *entropy of a quantum state* $\rho$ is defined as

$$S(\rho) \equiv - \text{tr}(\rho \log \rho).$$

If $\lambda_x$ are the eigenvalues of $\rho$,

$$S(\rho) = -\sum_x \lambda_x \log \lambda_x.$$

---

Examples.

- $d$-dimension completely mixed density $\rho = I_n/d$: $S(\rho) = \log d$.
- $\rho = \begin{bmatrix}1 & 0 \\ 0 & 0\end{bmatrix}$: $S(\rho) = 1\log 1 + 0\log 0 = 0$.
- $\rho = \frac12\begin{bmatrix}1 & 1 \\ 1 & 1\end{bmatrix}$: $S(\rho) = 0$.
- $\rho = \frac13\begin{bmatrix}2 & 1 \\ 1 & 1\end{bmatrix}$: $S(\rho) = ?$
- $\rho = p\ket{0}\bra{0} + (1-p)\ket{+}\bra{+} = ?$


---

### Quantum Relative Entropy

Similarly we can define the *relative entropy* of $\rho$ to $\sigma$:

$$S(\rho\|\sigma) \equiv \mathrm{tr}(\rho\log\rho) - \mathrm{tr}(\rho\log\sigma),$$

which can also be $+\infty$.

---

#### Klein's Inequality

The quantum relative entropy is non-negative,

$$S(\rho\|\sigma) \geq 0,$$

with equality iff $\rho=\sigma$.

---

Proof.

Let $\rho = \sum_i p_i\ket{i}\bra{i}$ and $\sigma = \sum_j q_j\ket{j}\bra{j}$ be orthonormal decopositions.

$$S(\rho\|\sigma) = \sum_i p_i \log p_i - \sum_i \bra{i}\rho\log\sigma \ket{i},$$

$$\bra{i}\rho\log\sigma \ket{i} = \bra{i} \left(\sum_j\log q_j \ket{j}\bra{j}\right)\ket{i} = \sum_j \log q_j P_{ij},$$

where $P_{ij} = \braket{i\vert j}\braket{j\vert i}$.

---

$$S(\rho\|\sigma) = \sum_i p_i\left(\log p_i - \sum_j P_{ij} \log q_j\right).$$
Note that $P_{ij} > 0$ and each rowsum and each colsum are 1. Use the convexity of $\log$, we have
$$ S(\rho\|\sigma) \geq \sum_i p_i \left(\log p_i - \log \left(\sum_j P_{ij}q_j\right)\right),$$

where equality iff $\max_j P_{ij} = 1$ (hence $P$ is a permutation).
Thus we may use the result from classical relative entropy to conclude.

---

### Basic properties of Von Neumann Entropy

1. Entropy is non-negative. Entropy is 0 iff the state is pure.
2. Entropy is at most $\log d$ in a $d$-dimensional Hilbert space. Equality iff the state is a completely mixed state $I/d$.
3. Suppose a composite system $AB$ is in a pure state, then $S(A) = S(B)$.

---

Proof.

For 2., from $0\leq S(\rho\|I/d) = -S(\rho) + \log d$.

For 3., from the Schmidt decomposition, we know that the eigvals of $\rho^A$ and $\rho^B$ are the same. Entropy is determined completely by the eigvals, so $S(A) = S(B)$.

---

#### Recall Quantum Basics Defs & Facts

(Pure) State: $\ket{\psi} = \sum_i a_i\ket{i}$, $\sum_i\vert a_i\vert ^2= 1$.

Ensemble of pure states: $\{p_i, \ket{\psi_i}\}$. (mixed state)

Density operator: $\rho \equiv \sum_i p_i\ket{\psi_i}\bra{\psi_i}$. $\mathrm{tr}(\rho)=1,\mathrm{tr}(\rho^2)\leq1$.

$\mathrm{tr}(\rho^2)=1$ iff $\rho$ corresponds to a pure state.

$\rho = \frac{I+\vec r\cdot \vec\sigma}2$, Bloch representation, $\|r\|_2\leq1$, with equality iff $\rho$ corresponds to a pure state.


---

#### Schmidt Decomposition

Suppose $\ket{\psi}$ is a pure state of a composite system $AB$. Then there exist orthonormal states $\ket{i_A}$ and $\ket{i_B}$ for $A$ and $B$ respectively, such that,
$$\psi = \sum_i\lambda_i\ket{i_A}\ket{i_B},$$
where $\lambda_i$ are non-negative real numbers known as *Schmidt co-efficients* satisfying $\sum_i\lambda^2_i=1$. The number of non-zero $\lambda_i$ is called the *Schmidt number*. Schmidt number is 1 iff $\rho^A$ ($\rho^B$) is a pure state.

---

4. Suppose $p_i$ are probabilities, and the states $\rho_i$ have support on orthogonal subspaces. Then
$$ S\left(\sum_i p_i\rho_i\right) = H(p_i)+\sum_i p_iS(\rho_i).$$
5. (**Joint entropy theorem**) Suppose $p_i$ are probs, $\ket{i}$ are orthogonal states for a system $A$, and $\rho_i$ is any set of density operators for another system $B$. Then
$$ S\left(\sum_i p_i\ket{i}\bra{i}\otimes \rho_i\right) = H(p_i)+\sum_i p_iS(\rho_i).$$

---

For 4., (and similarly 5.) let $\lambda_i^j$ and $\ket{e_i^j}$ be the eigvals and corresponding eigvecs of $\rho_i$. Observe that $p_i\lambda_i^j$ and $\ket{e_i^j}$ are the eigvals and corresponding eigvecs of $\sum_i p_i\rho_i$, and thus

$$\begin{aligned}
S(\sum_i p_i\rho_i) &= -\sum_{ij}p_i\lambda_i^j \log (p_i \lambda_i^j)\\
&= -\sum_ip_i\log p_i - \sum_i p_i \sum_j \lambda_i^j \log \lambda_i^j\\
&= H(p_i) + \sum_ip_iS(\rho_i)
\end{aligned}$$

---

6. $S(\rho\otimes\sigma) = S(\rho) + S(\sigma)$.

This is a immediate result from 5.

---

Similarly for composite quantum systems, we can define

- quantum joint entropy $S(A, B) \equiv -\mathrm{tr}(\rho^{AB}\log(\rho^{AB}))$,
- quantum conditional entropy $S(A\vert B)\equiv S(A, B) - S(B)$,
- quantum mutual information $S(A:B)\equiv S(A)+S(B) - S(A, B)$.

---

Some properties of the Shannon entropy fail to hold for the von Neumann entropy.

Example: $H(X) \leq H(X, Y)$ v.s. $(\ket{00}+\ket{11})/\sqrt2$.

Or we may state the result $S(B\vert A) = S(A, B) - S(A)$ can be negative.

More precisely, for a pure state $\ket{AB}$, it is entangled ($A$ and $B$) iff $S(B\vert A) < 0$.

---

### Measurements and Entropy

We first state the two conclusions:

- Projective measurements increase entropy.
- Generalized measurements may decrease entropy.

---

Suppose $P_i$ is a complete set of orthogonal projectors and $\rho$ is a density operator. Then the entropy of the state $\rho' \equiv \sum_iP_i\rho P_i$ is at least as great as the original,

$$S(\rho') \geq S(\rho),$$

with equality iff $\rho=\rho'$.

---

Proof.

From Klein's inequality, $0 \leq S(\rho'\|\rho) = -S(\rho) - \mathrm{tr}(\rho\log \rho')$.

$$\begin{aligned}
\mathrm{tr}(\rho\log\rho') &= \mathrm{tr}\left(\sum_iP_i \cdot \rho\log\rho'\right)\\
&= \mathrm{tr}\left(\sum_iP_i^2 \cdot \rho\log\rho'\right)\\
&= \mathrm{tr}\left(\sum_iP_i \cdot \rho\log\rho' P_i\right)\\
\end{aligned}$$

---

With $\rho'P_i = P_i\rho P_i = P_i\rho'$ we have
$$\mathrm{tr}(\rho\log\rho') = \mathrm{tr}\left(\sum_iP_i \cdot \rho P_i\log\rho' \right) = -S(\rho').$$

This gives $S(\rho') \geq S(\rho)$.

---

A sample for generalized measurements that decrease entropy

$M_1 = \ket{0}\bra{0}$, and $M_2=\ket{0}\bra{1}$.

$\rho\rightarrow M_1\rho M_1^\dagger + M_2\rho M_2^\dagger$ may decrease the entropy of the qubit.

---

### Subadditivity and Triangle Inequality

- Subadditivity: $S(A, B) \leq S(A) + S(B)$.
  - With equality iff $A$ and $B$ are uncorrelated, $\rho^{AB} = \rho^A\otimes \rho^B$.
- Triangle inequality (Araki-Lieb inequality):
  $S(A, B) \geq \vert S(A) - S(B)\vert $.
  - The analogue of $H(X, Y) \geq H(X)$.

---

The subadditivity is a simple application of Klein's inequality, $S(\rho) \leq -\mathrm{tr}(\rho\log\sigma)$ with $\rho\equiv \rho^{AB}$ and $\sigma\equiv \rho^A\otimes \rho^B$.

To prove the triangle inequality, introduce a system $R$ which purifies systems $A$ and $B$, applying subadditivity we have $S(R) + S(A) \geq S(A, R)$.

Since $ABR$ is in pure state, $S(A, R) = S(B)$ and $S(R) = S(A, B)$, which gives $S(A, B) \geq S(B) - S(A)$.

---

### Concavity of the Entropy

The entropy is a *concave* function of its inputs, i.e.,

$$S\left(\sum_ip_i\rho_i\right) \geq \sum_ip_iS(\rho_i),$$

with equality iff all the $\rho_i$s are the same.

---

Sketch of proof.

Suppose the $\rho_i$ are states of a system $A$. Introduce an auxiliary system $B$ such that

$$\rho^{AB} \equiv \sum_i p_i\rho_i\otimes \ket{i}\bra{i}.$$

The concavity is essentially the subadditivity of $S(A, B) \leq S(A) + S(B).$

---

### The Entropy of a Mixture of Quantum States

Also there is an upper bound on the entropy of a mixture of quantum states:

$$\sum_ip_iS(\rho_i) \leq S\left(\sum_ip_i\rho_i\right) \leq \sum_ip_iS(\rho_i) + H(p_i).$$

As intuition, our uncertainty about the state $\sum_ip_i\rho_i$ is never more than the average uncertainty about $\rho_i$, plus an additional uncentainty about the index $i$.

Equality holds iff the states $\rho_i$ have support on orthogonal subspaces.

---

Proof.

We start with the pure state case, $\rho_i = \ket{\psi_i}\bra{\psi_i}$. Suppose $\rho_i$ are the states of a system $A$, and introduce an auxiliary system B with an orthonormal basis $\ket{i}$ corresponding to the index $i$ on $p_i$. Define

$$\ket{AB} \equiv\sum_i\sqrt{p_i}\ket{\psi_i}\ket{i}.$$

---

Since $\ket{AB}$ is a pure state we have

$$S(B) = S(A) = S\left(\sum_ip_i\ket{\psi_i}\bra{\psi_i}\right) = S(\rho).$$

Then, if we perform a projective measurement on $B$ in the $\ket{i}$ basis, getting a state $B'$:

$$\rho^{B'} = \sum_i p_i\ket{i}\bra{i}.$$

---

Since projective measurements never decrease entropy, we have

$$S(\rho) = S(B) \leq S(B') = H(p_i).$$

Since $S(\rho_i) = 0$ for the pure state case, we have

$$S(\rho) \leq H(p_i) + \sum_i p_iS(\rho_i).$$

Equality is easily seem to occur iff $\ket{\psi_i}$ are orthogonal.

---

The mixed state case is easy using the pure state result. Let $\rho_i = \sum_jp_j^i\ket{e_j^i}\bra{e_j^i}$ be orthonormal decompositions for $\rho_i$, so

$$\rho = \sum_{ij}p_ip_j^i\ket{e_j^i}\bra{e_j^i}.$$

With $\sum_jp_j^i=1$ for each $i$, using pure state result,

$$S(\rho) \leq -\sum_{ij}p_ip_j^i\log (p_ip_j^i) = H(p_i) + \sum_i p_iS(\rho_i).$$

---

## Strong Subadditivity

The subadditivity extending to three systems:

$$S(A, B, C) + S(B) \leq S(A, B) + S(B, C).$$

---

The remaining of chapter 11 is not included in this presentation yet.

---

<!-- _class: lead -->

## Thank you
