# Circuit Simulation (电路模拟)

## 前言

啊...又开新坑了...

--2022/2/8更新-- 又补上了一点, 争取早日补完

--2022/2/14更新-- 又补上了一点, 争取早日补完

--2022/2/21更新-- 重排了结构, 顺便又补上了一点...

是什么: 在电路层面(circuit level, transistor level)上基于给定的电路描述文件, 来尽可能精确的模拟电路中各参数随时间的变化情况(比如电流电压).

怎么做: 根据实际电路, 将元器件分解或抽象成仅有两个接口的基本元器件(比如电阻, 电容等), 基于此构造一个有向图(基本元器件是边, 连接各元器件的导线是点), 并根据物理定律转化为各物理变量之间的约束关系. 利用这些约束关系和初值求解一个随时间发展的ODE(自变量通常是各点各元器件的电流电压等).

### 名词定义, 概念解释

以下列出之后所频繁用到的某些名词的含义. 中文翻译可能有所不准, 以其所对应的英文为准.

- 一个元器件(元件, device, element, simulation primitive)指一个能通过某个函数描述电压电流关系$i = f(v)$的东西.
  - 例如简单的电阻(resistor): $v= Ri$.
  - 简单的电容(capacitor): $i=C\frac{\text dv}{\text dt}$.
  - 符合类似条件的东西在电路中都可以抽象为一个元器件, 或者叫device model.
  - 元器件一般有两个(或者多个)端(terminal), 即其有几个引脚可以通过导线连入电路中. 在不特别说明的情况下以下的元器件都假设是两个端.

- 物理定律
  - 主要是基尔霍夫电流和电压定律(Kirchoff's Current and Voltage Laws, KCL and KVL). 简单解释来说,
    - KCL: 任一节点上的流入和流出电流相等.
    - KVL: 任一闭合回路的电压降之和等于电动势之和.
  - 例如下面这个电路, 两个电阻有性质: $R_1i_1 = v_1 - v_2$, $R_2i_2=v_2$, 其中$v_1, v_2$分别是在节点1和节点2的相对电势(电源负极为0), $i_1, i_2$是节点1和节点2的电流. KCL: 节点1和2的电流$i_1=i_2$. KVL: $V = R_1i_1+R_2v_2$.

  ![Example Circuit.](https://gitee.com/j7168908jx/mdnice-bed/raw/master/2022-2-13/1644755783556-image.png)

- 两种分析方法
  - Sparse Tableau Analysis(STA): 根据KCL, KVL分别写出完整方程, 写出元器件性质方程后整组求解.
  - Modified Nodal Analysys(MNA): 写出完整KCL方程, 利用元器件性质消元(尽可能多消去电流$i$), 得到含各支路电压的方程. 利用KVL将这些支路电压转化为各个节点的相对电势(比如选中某个点接地), 并最后把元器件性质剩余的方程合并进入方程组中.
  - 差异: STA矩阵大, 稀疏性好. MNA矩阵小, 相对不稀疏, 可能在合并的过程中会有数值误差问题.

- 数值求解办法
  - 静态/稳态求解: 首选LU, 非线性的话牛顿法解Jacobi.
  - 动态: (时间方向)有限差分数值解, 前向和后向Euler都会用. 在每一个时间步牛顿法解Jacobi.

- 几种分析模式(不懂了起来, 机械翻译)
  - DC Analysis: 假设电感被短路, 电容被开路的情况下考虑DC的operating point. 在Transient Analysis和AC Small-Signal Analysis之前分析, 以确定初值条件和一些非线性元器件在哪个初值附近做近似. 也可以用于求得DC transfer curves.
  - Transient Analysis
  - AC Small-Signal Analysis: 在指定的频率范围内计算AC output variables(关于频率的函数关系)
  - Pole-Zero Analysis: 算AC transfer function极点和零点(Small-Signal Analysis中)
  - Sensitivity Analysis: 敏感性分析
  - Noise Analysis: 分析由各元器件产生的噪声对电路的影响有多大

## 电路网络方程的构造

> Network equations: 一个电路网络(electrical network, circuit)包含一些**元器件(element)**和一些**节点(node)**, **节点之间由元器件连接**. 从而可以抽象成一个图, 其**顶点就是节点**, **边就是元器件**. 利用网络的拓扑结构带来的限制和元器件本身特性带来的限制所确定的方程组称为Network equations.

### 边与元器件

边所对应的是电路中的元器件, 根据性质分为Passive和Active Elements.

> Passive Elements: 由关系(element equation)
> $$ v=f(i,i')\ \text{(current-controlled)}\quad \text{or}\quad i=f(v,v')\ \text{(voltage-controlled)}$$
> 就可以确定的元器件.

称呼$i=f(v,v')$的形式为admittance form, $v=f(i, i')$的形式为impedance form.

(Wikipedia: In electrical engineering, admittance is a measure of how easily a circuit or device will allow a current to flow. It is defined as the reciprocal of impedance, analogous to how conductance & resistance are defined.)

- 电阻: (线性:)$v=Ri, i=Gv$. (一般:) $i = f(v), v=f(i).$
- 电容: $q=f(v), i(t) = \text dq/\text dt, C(v) \triangleq\text dq/\text dv.$ 若$C$是常数时称为线性. $i(t) = C(v)\text dv/\text dt.$
- 电感: $\phi= f(i), v(t)=\text d\phi/\text dt, L(i)\triangleq \text d\phi/\text dt.$ 若$L$是常数时称为线性. $v(t) = L(i)\text di/\text dt.$

> 以下4种情况时称为Active element:
>
> - $v = f(t)$, 称为independent voltage source.
> - $i = f(t)$, 称为independent current source.
> - $v = f(i_x)$, 或$v=f(v_x)$; $i_x, v_x$是另一个网络的电流电压, 称为controlled voltage source(CVS), 进一步分为(VCVS, CCVS)
> - $i = f(i_x)$, 或$i=f(v_x)$; $i_x, v_x$是另一个网络的电流电压, 称为controlled current source(CCS), 进一步分为(VCCS, CCCS)

一部分非线性的Active Element能被非线性的Passive Element表示, 但并非任何时候都是这样的. 不过, 总是可以把非线性的电阻表示成一个非线性的受控源.

实际中, 我们会碰到许多实际的元器件, 比如说二极管, MOSFET, 它们首先是非线性的, 其次我们无法确定它完全准确的电流电压曲线. 这种时候需要对这个元器件本身的特性进行建模(不归本文管), 建模的结果是一个(在一定条件下)近似等价的电路, 用于在求解中代替这个实际的元器件. 称为Equivalent Circuit Model.

> **例子:**
>
> 1. Diode Model: pn结, 二极管, 具有以下element equation
> $$ i = I_s(e^{v/\eta V_T} - 1)$$
> 其中在 $T=298\text K$ 时, $\eta\approx 1, V_T\triangleq(kT/q)\approx 26\text{mV}$
> 其可以近似为一个两电阻两电容并联后串联一电阻的近似等价电路.
> ![Diode Equivalent Model](https://gitee.com/j7168908jx/mdnice-bed/raw/master/2022-2-21/1645435448387-image.png)
>
> 2. Transistor Model: n-channel MOSFET的一种近似模型(SPICE level-1)
> 一个n-channel的MOSFET可以近似成带一个受控电流源, 两个电阻和五个电容的近似等价电路.(几乎全部都是非线性的)
> ![MOSFET n-channel Equivalent Model](https://gitee.com/j7168908jx/mdnice-bed/raw/master/2022-2-21/1645435627405-image.png)

回到抽象的图来说, 元器件抽象成一条边, 一种简便的办法是我们通过如下的矩阵来保存边信息.

考察一个有$m$节点$n$边的有向图, 按如下规则构造$n\times m$矩阵称为**关联矩阵**$M$:

> 对于某个节点$i$和节点$j$, 若第$k$条有向边是$i\rightarrow j$则$m_{ik} = 1, m_{jk} = -1$. 第$k$列其余元素均为0.

节点从0开始编号, 边从1开始编号.

**例子:** $4\times6$矩阵$M$
$$M = \begin{bmatrix}
+1 &  0 &  0 & +1 & -1 & -1\\
-1 & +1 & +1 &  0 &  0 &  0\\
 0 &  0 & -1 & -1 &  0 &  0\\
 0 & -1 &  0 &  0 & +1 & +1
\end{bmatrix}$$
表示了具有4个节点, 6条边的一个有向图. 第1条边从节点0指向节点1. 显然$M$列和均为0.

### 方程的构造

节点对应于各个元器件相连接在一起的(理想)导线(比如fan-in, fan-out的地方).

1. 关于电压.

    记该有向图 $G_d = (V, E)$, 并令各$n$个节点的电势为$p = [p_0, \dots, p_{n-1}]^\textsf{T}$, 及各条边上的电压差为$u = [u_1, \dots, u_{m}]^\textsf{T}$. 则根据KVL自然有:
    $$u_j = p_{t(e_j)} - p_{h(e_j)}, \quad \forall~e_j\in E.$$
    利用前面的Incident Matrix可知
    $$u = M^\textsf{T}p.$$

    如果我们**把第0节点看做参考节点**, 并定义电压$v_j = p_j - p_0$, 从而有
    $$u = M^\textsf{T} \left(\begin{bmatrix}p_0\\ p_0\\ \vdots\\   p_0\end{bmatrix} + \begin{bmatrix}0\\v_1\\ \vdots \\ v_{n-1}\end{bmatrix}  \right) = p_0M^\textsf{T} e + A^\textsf{T}v.$$
    其中 $v \triangleq [v_1, \dots, v_{n-1}]^{\textsf{T}}$ , 及在去掉 $M$ 首行后得到的 $(n-1)\times m$ 维矩阵$A$称为Reduced Incidence Matrix. 如果参考节点的电势是0的话, 我们得到
    $$\text{KVL}\quad \Leftrightarrow\quad u = A^\textsf{T}v.$$

2. 关于电流.

    如果记各条边上的电流是 $i = [i_1, \dots , i_m]$ , 则利用KCL, 在各个节点    $j\in V$上有
    $$\sum_{e_k\in \varepsilon_j^{\text{out}}}i_l - \sum_{e_l\in     \varepsilon_j^{\text{out}}}i_l = 0.$$
    同样也是利用前面的Incident Matrix可以直接写成
    $$Mi = 0.$$
    由于$M$总满足列和为0的条件, 其实$M$的行向量是恰好有1的冗余的.(练习: 为什么恰好是1?)
    因此我们不妨去掉第一行, 即得到了关键的
    $$\text{KCL}\quad \Leftrightarrow \quad Ai = 0.$$

**例子:** 再把上面那个$M$拿下来用一用. 对应的$3\times6$矩阵$A$
$$A = \begin{bmatrix}
-1 & +1 & +1 &  0 &  0 &  0\\
 0 &  0 & -1 & -1 &  0 &  0\\
 0 & -1 &  0 &  0 & +1 & +1
\end{bmatrix}$$
可以得到KVL:
$$\begin{bmatrix}
u_1 \\ u_2 \\ u_3 \\ u_4 \\ u_5 \\ u_6
\end{bmatrix} = \begin{bmatrix}
-1 & 0 & 0 \\
+1 & 0 & -1 \\
+1 & -1 & 0 \\
0 & -1 & 0 \\
0 & 0 & +1 \\
0 & 0 & +1
\end{bmatrix} \begin{bmatrix}
v_1 \\ v_2 \\ v_3
\end{bmatrix}$$

以及KCL:
$$\begin{bmatrix}
-1 & +1 & +1 &  0 &  0 &  0\\
 0 &  0 & -1 & -1 &  0 &  0\\
 0 & -1 &  0 &  0 & +1 & +1
\end{bmatrix} \begin{bmatrix}
i_1 \\ i_2 \\ i_3 \\ i_4 \\ i_5 \\ i_6
\end{bmatrix} = 0.
$$

**结合电压和电流.**
自然我们就会想把KCL和KVL合并在一起写, 这就有
$$\begin{bmatrix}
A_{(n-1)\times m} & 0 & 0 \\ 0 & I_{m\times m} & -A^\textsf{T}
\end{bmatrix}\begin{bmatrix}
i \\ u \\ v
\end{bmatrix} = 0.$$
其中, 复习一下, $i$是各条边上的电流, $u$是各条边上的电压差, $v$是除参考节点0之外剩下节点相对的电势差.

### 拓展: Cycle Space and Bond Space

注意到如果一个Current Assignment $i = [i_1, \dots, i_m]^\textsf{T}$满足KCL: $Ai=0$, 则可以看做是合法的某个电路的实际电流情况(Circulation).
因此我们可以直接把$\textsf{Ker}~A$看做电流的解空间. 称这个空间为这个电路网络的Cycle Space:
$$\mathcal C \triangleq \textsf{Ker}~A = \{i: Ai = 0\}.$$

同样的, 符合条件的Voltage Assignment $u = [u_1, \dots, u_m]^{\textsf{T}}$需要满足KVL: $u = A^{\textsf{T}}$, 所以想必大家也知道了, 定义$A^\textsf{T}$的相空间, $\textsf{Im}~A^{\textsf{T}}$为Bond Space:
$$\mathcal B \triangleq \textsf{Im}~A^{\textsf{T}} = \{u: u = A^\textsf{T}v\}.$$

**空间性质.**
主要值得一提的就是$\mathcal B$和$\mathcal C$是正交的, 并且自然进一步有$\mathcal B\oplus \mathcal C= \mathbb R^m.$(练习.)(参考特勒根定理.)

如果整个网络是连通的, 则$\mathcal B$的维度, 记为$r=n-1.$ 从而$\mathcal C$的维度是$m-r=m-n+1.$

**方程总结.**
从而我们可以把KCL和KVL结合后的方程组进一步压缩, 利用两个空间的正交性可知,
KCL实际上对应于$r$个方程, KVL对应另外$m-r$个方程. 而总共有$m$条边对应于$2m$个未知量(电流和电压). 由此再结合前面所说的Element equations($m$个)就知道我们实际上是可以求解这些方程的了.

现在的问题在于怎么找到这两个空间$\mathcal B$和$\mathcal C$的一组基? 暂且先把基向量组成的矩阵分别叫做$B$和$C$.

$B$比较直接, 比如说$A$行满秩的时候(此时对应于整个电路网络是连通的), $A$(的行向量们)本身就是符合条件的了. 否则也可以直接从中挑出线性无关的(行)向量作为基.

### 拓展: Fundamental Circulation

这里要找一些基本形式. 考虑尽可能简单的电路, 比如说前面所说用有向图$G_d$表示的电路中的某个圈(cycle)$\mathcal Q$(随便用了个字母避免和上文的$\mathcal C$重复), 并假定这个圈$\mathcal Q$的旋转方向(orientation)(比如说顺时针).

记$\mathcal Q^+$是那些方向与$G_d$中方向一致的边, $\mathcal Q^-$是方向相反的那些边. 那如下的一个Current assignment也是一个符合KCL的circulation:
$$i_j = \begin{cases}
+1, &\quad\text{if}~e_j\in\mathcal Q^+,\\
-1, &\quad\text{if}~e_j\in\mathcal Q^-,\\
0, &\quad\text{if}~e_j\notin\mathcal Q.\\
\end{cases}$$
这样的circulation就称为这个圈$\mathcal Q$的fundamental circulation.


复习: 如果我们有$G_d$的某个生成树$T$, 这个树首先必然有$n-1条边, 且从$T$开始添加任意一条边都必会产生且只会产生1个(无向)环.

由此我们可以造出至少$m-n+1$个不同的环, 并得到他们的fundamental circulation. 事实上, 可以证明, 这些fundamental circulation就构成了$\mathcal C$的一组基.(练习.)

**例子.**
前面的矩阵例子接着用. 方(水)便(字)起(数)见, 复制一遍
$$M = \begin{bmatrix}
+1 &  0 &  0 & +1 & -1 & -1\\
-1 & +1 & +1 &  0 &  0 &  0\\
 0 &  0 & -1 & -1 &  0 &  0\\
 0 & -1 &  0 &  0 & +1 & +1
\end{bmatrix}$$

![矩阵对应的图](https://gitee.com/j7168908jx/mdnice-bed/raw/master/2022-2-8/1644301914369-%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20220208143038.png =70%x)
矩阵对应的图

如果挑出这样一个生成树$T = \{e_2, e_3, e_5\}$, 则可以由此找到图中的3个环. 指定他们都是顺时针的环, 则可以找到这3个环的Fundamental circulation:
$$\begin{matrix}
i^{(1)} = [&0&0&0&0&-1&+1&]^{\textsf{T}}\\
i^{(2)} = [&0&+1&-1&+1&+1&0&]^{\textsf{T}}\\
i^{(3)} = [&+1&+1&0&0&+1&0&]^{\textsf{T}}
\end{matrix}$$

从而可以得到对应的基向量矩阵$C$.

由此, 我们得到了在网络连通情况下压缩后的方程组
$$Ai=0,\quad Cu = 0.$$
这个方程组有$m$个独立方程和$2m$个未知量.  虽然是压缩了, 但由于没有前面的矩阵那么稀疏, 所以不太常用.(?那讲得好像这个很妙一样.jpg)

这些方程实际上就是topological constraints.

### 线性方程的几种形式

如果只考虑线性纯电阻的网络(仅包含线性电阻, 线性源), 我们可以比较简单的把整个网络的方程组写出来.

实际上, 如果只分析time-domain simulation的话可以把一般问题转化为线性纯电阻网络.(还不知道为什么)

**Sparse Tableau Analysis.**
在这样的情况下, 每个元器件的方程只会是这几种方程中的一个

- 电阻: $u_k = Ri_k$
- 电压源: $u_k = V$
- 受控电压源: $u_k = \alpha u_x$, $u_k = \alpha i_x$
- 电流源: $i_k = I$
- 受控电流源: $i_k = \alpha u_x$, $i_k = \alpha i_x$

因此, Element equations(此后也叫branch equations)可以简单写为
$$Zi + Yu = s.$$
从而求解系统为
$$\begin{bmatrix}
A & 0 & 0\\ 0 & I & -A^\textsf{T}\\ Z_{m\times m} & Y_{m\times m} & 0
\end{bmatrix}\begin{bmatrix}
i \\ u \\ v
\end{bmatrix} = \begin{bmatrix}
0 \\ 0 \\ s
\end{bmatrix}.$$
整个系统有$2m+n-1$个线性无关的方程和未知量, 稀疏,至多$7m-2$个非零元.

**Reduced Tableau.**
一个简单的压缩大小的办法,比如说我们不需要$u$的时候, 不如直接把$u=A^\textsf{T}v$给利用掉, 这时候会得到称呼为reduced tableau的形式:
$$\begin{bmatrix}
YA^\textsf{T} & Z\\0 & A
\end{bmatrix}\begin{bmatrix}
v \\ i
\end{bmatrix} = \begin{bmatrix}
s \\ 0
\end{bmatrix}.$$

**Nodal Analysis.**
为了下文解释MNA, 首先介绍一下NA.

NA首先需要假设电路中没有Voltage source.
如果这样假设, 原本的Element equations(branch equations) $Zi + Yu = s$ 就必然可以简化为
$$ i = Yu + s.$$
(电阻, independent current source, VCCS都是容易理解的.) 对于CCCS的情况是为什么呢? 因为假设整个电路里没有循环依赖的CCCS, 也就是不能$i_x$依赖$i_y$依赖$i_e$依赖$i_x$这样. 从而必然在最终存在某个被依赖的电流, 其是由电阻控制的(因为假设电路里没有电压源). 由(流过)电阻(的电流)所控制的电流则可以很容易的转化为VCCS.

对于上面的$i=Yu+s$, 两侧利用$Ai=0$(KCL)再利用$u=A^\textsf{T}v$(KVL)可以得到
$$AYA^\textsf{T}v = -As.$$
这个式子即是nodal analysis的方程的形式. 它描述了在$n-1$个节点上的电压是如何确定的. 这个方程左端是稀疏的, 且有效的表达了KCL所包含的信息. 称矩阵
$$ G \triangleq AYA^\textsf{T}$$
为nodal admittance matrix, 或者conductance matrix.

利用简化后的element equations, 我们可以很容意的消去方程中的所有电流项. 不过这也很自然的解释了为什么我们不允许出现voltage source: 因为ideal voltage source不能依赖于它自身的电流.

**解的存在唯一性.**
> 定义
>
> - cutset: 连通图中的一些边, 去掉之后图就不是完全连通的.
> - current source cutset: 组成cutset的这些边全都是current source
> - voltage source loop: 一个图中的环, 环上全是voltage source.

则解存在唯一性的必要条件是: **不存在current source cutset和voltage source loop**. 这个条件也叫consistency requirements. 虽然一般来说也不会出现这种情况, 但在简化电路的过程中可能会意外的造出这样的反例.

实际上, 如果确实出现了这样的情况, 可以通过加入一些相对小量的影响来避免: 与电流源并联的特别大的电阻, 与电压源串联的特别小的电阻.

一个特别情况: 如果是线性的, 纯电阻的, 没有受控源的网络, 则上述consistency requirements是充分条件. (如果网络是全连通的并满足consistency requirements, 还有其他的几个结论: 此时$G$是不可约对角占优的, 对称正定的, M-阵)

### Modified Nodal Analysis

MNA是接下来最重要的, 专门开一节.

有了以上基础, 我们可以分析带电压源的情况了.
NA 消除了所有的电流变量, 利用KCL转化为了电压或者常量. 而MNA与NA的核心区别在于对于一部分元器件, 保留它们的电流变量.

当然这意味着变量变多了, 每多一个变量就需要多一个方程来约束它. 这个约束的方程即是这个元器件的element equation/branch equation. 这也解决了NA里不能出现电压源的问题.

标准的MNA会保留这几种元器件的电流和电压:

- 所有的voltage source
- 所有的CCVS和CCCS的**control**
- 所有用户确定的simulation output
- 以及之后会看到的电感也需要保留它的电流

我们称呼所有**不**保留电流的element为group 1 element, 其它的称为group 2.

**静态元器件的分拆.**
静态和动态这个词在这里只指元器件的element equation是否包含电流或电压的导数.

这一小部分和下一小部分的下标均表示子矩阵或者向量的一部分, 与前文有所不同.

把原来表示(整个图上)电流的向量$i$分拆为$i = [i_1, i_2]^\textsf{T}$, 电压拆成$u = [u_1, u_2]^\textsf{T}$. 由此把核心的方程$Zi + Yu = s$(此处重写为$Zi - Yu = s$)写作
$$\begin{bmatrix}I & Z_{12} \\ 0 & Z_{22}\end{bmatrix}\begin{bmatrix}i_1\\i_2\end{bmatrix} - \begin{bmatrix}Y_{11} & Y_{12} \\ Y_{21} & Y_{22}\end{bmatrix}\begin{bmatrix}u_1\\u_2\end{bmatrix} = \begin{bmatrix}s_1\\s_2\end{bmatrix}.$$

从而group 1中元素需要能对应为方程
$$i_1 + Z_{12} i_2 = Y_{11} u_1 + Y_{12} u_2 + s_1.$$
注意到group 1中的元素应该只包括电阻, independent current source, VCCS和CCCS.

group 2中的元素需要能对应方程
$$Z_{22} i_2 = Y_{21} u_1 + Y_{22} u_2 + s_2.$$

KCL会被分拆为两部分:
$$A_1i_1 + A_2i_2 = 0.$$

KVL会被分拆为两部分:
$$u_1 = A_1^\textsf{T} v, \quad \quad u_2 = A_2^\textsf{T} v.$$

从而group 1的element equation/branch equation在代入KCL和KVL后有
$$(A_1Y_{11}A_1^\textsf{T} + A_1Y_{12}A_2^\textsf{T})v + (A_2 - A_1Z_{12})i_2 = -A_1s_1.$$

类似的, group 2的element equation有
$$-(Y_{21}A_1^\textsf{T} + Y_{22}A_2^\textsf{T})v + Z_{22}i_2 = s_2.$$

综上, 我们得到了MNA的方程:
$$\begin{bmatrix}
A_1Y_{11}A_1^\textsf{T} + A_1Y_{12}A_2^\textsf{T} & A_2 - A_1Z_{12}\\
-(Y_{21}A_1^\textsf{T} + Y_{22}A_2^\textsf{T}) & Z_{22}
\end{bmatrix}\begin{bmatrix}
v\\i_2
\end{bmatrix} = \begin{bmatrix}
-A_1s_1\\s_2
\end{bmatrix}.$$

如果进一步, 网络中没有controlled sources, 则$Y_{11}$是对角的, $Z_{12}, Y_{12}, Y_{21}$全为0. 方程简化为
$$\begin{bmatrix}
A_1Y_{11}A_1^\textsf{T} & A_2\\
-Y_{22}A_2^\textsf{T} & Z_{22}
\end{bmatrix}\begin{bmatrix}
v\\i_2
\end{bmatrix} = \begin{bmatrix}
-A_1s_1\\s_2
\end{bmatrix}.$$

如果再进一步, group 2中没有current sources, 则$Y_{22}$是单位阵, 即
$$\begin{bmatrix}
A_1Y_{11}A_1^\textsf{T} & A_2\\
-A_2^\textsf{T} & Z_{22}
\end{bmatrix}\begin{bmatrix}
v\\i_2
\end{bmatrix} = \begin{bmatrix}
-A_1s_1\\s_2
\end{bmatrix}.$$
这个是相对最常见的形式.

最后, 如果group 2没有形成一个cutset, 且网络是全连通的, 满足consistency requirements, 则可以证明
$G \triangleq A_1 Y_{11}A_1^\textsf{T}$ 是对角占优的, 对称正定的, M-阵.

**动态元器件的分拆.**

类似的, 分析一下线性电容和电感的情况. 电容可以是group 1或者group 2中的, 而电感必须是group 2中的. 对于一个branch equation的一般形式
$$Zi + Li' - Yu - Cu' = s$$
可以拆开为
$$\begin{bmatrix}
I & Z_{12} \\ 0 & Z_{22}
\end{bmatrix}\begin{bmatrix}
i_1\\i_2
\end{bmatrix} + \begin{bmatrix}
0\\L_{22}i_2'
\end{bmatrix} - \begin{bmatrix}
Y_{11} & Y_{12} \\ Y_{21} & Y_{22}
\end{bmatrix}\begin{bmatrix}
u_1 \\ u_2
\end{bmatrix} - \begin{bmatrix}
C_{11}u_1' \\  C_{22}u_2'
\end{bmatrix} = \begin{bmatrix}
s_1 \\ s_2
\end{bmatrix}$$

其中$C_{11}, C_{22}, L_{22}$均是对角阵. 类似的, 如果我们使用和前述一样的方法消除group 1中的电流变量并替换一下$u$则有
$$\begin{bmatrix}
A_1Y_{11}A_1^\textsf{T}+A_1Y_{12}A_2^\textsf{T} & A_2-A_1Z_{12} \\
-(Y_{21}A_1^\textsf{T} + Y_{22}A_2^\textsf{T}) & Z_{22}
\end{bmatrix}\begin{bmatrix}
v\\i_2
\end{bmatrix} + \begin{bmatrix}
A_1C_{11}A_1^\textsf{T} & 0 \\
-C_{22}A_2^\textsf{T} & L_{22}
\end{bmatrix}\begin{bmatrix}
v' \\ i_2'
\end{bmatrix} = \begin{bmatrix}
-A_1s_1 \\ s_2
\end{bmatrix}$$

类似的, 如果电路网络中没有受控的源, 所有电容都在group 1中, 且group 2中只有电压源和电感. 整个式子可以简化为以下常见形式:
$$\begin{bmatrix}
A_1Y_{11}A_1^\textsf{T} & A_2 \\
-A_2^\textsf{T} & 0
\end{bmatrix}\begin{bmatrix}
v\\i_2
\end{bmatrix} + \begin{bmatrix}
A_1C_{11}A_1^\textsf{T} & 0 \\
0 & L_{22}
\end{bmatrix}\begin{bmatrix}
v' \\ i_2'
\end{bmatrix} = \begin{bmatrix}
-A_1s_1 \\ s_2
\end{bmatrix}$$

实际上, 在simulator中不会使用以上矩阵来实际用于计算, 而是在读取电路文件的时候利用线性的时间就可以顺便构造出来:

- 对于group 1中的, 写出KCL, 用element equation/branch equation消去所有出现在其中的group 1的电流. 利用KVL将branch voltages表示为node voltages.
- 对于group 2中的, 写出element equation/branch equation并利用KVL将branch voltages表示为node voltages.

**Element Stamp.**
我们在读取(电路文件, 比如网表中的)元器件的时候, 读取一个就考虑一个元器件对于整个方程的贡献, 称呼这个贡献为element stamp.

首先初始化矩阵和右端项为0, 然后每次加上读取的元件对整个方程的贡献, 即其element stamp, 最终读取完成的时候就得到了需要求解的方程组.

我们记某个element的左右端分别为$n^+, n^-$, 对应电势$v^+, v^-$, 电流$i$(从$n^+$到$n^-$). 下面列出了一大堆常见element的stamp: ($v_s, i_s$对应source, $v_x, i_x$ 对应control)

| Resistor / Group 1 | $v^+$  | $v^-$  | RHS |
|--------------------|------- |------- |-----|
| $v^+$              | $1/R$  | $-1/R$ |     |
| $v^-$              | $-1/R$ | $1/R$  |     |

| Resistor / Group 2  | $v^+$  | $v^-$  | $i$   | RHS  |
|-------------------- |------- |------- |------ |------ |
| $v^+$               |        |        | $+1$  |      |
| $v^-$               |        |        | $-1$  |      |
| $i$                 | $+1$   | $-1$   | $-R$  |      |

| Independent Current Source / Group 1 | $v^+$  | $v^-$  | RHS |
|--------------------|--------|--------|------|
| $v^+$              |        |        |  $-I$   |
| $v^-$              |        |        |  $+I$   |

| Independent Current Source / Group 2 | $v^+$  | $v^-$  | $i$  | RHS  |
|--------------------|--------|--------|------| ------ |
| $v^+$              |        |        |  $+1$   | |
| $v^-$              |        |        |  $-1$   | |
| $i$                |        |        |  $+1$   | $I$ |

| Independent Voltage Source (Group 2) | $v^+$  | $v^-$  | $i$  | RHS  |
|--------------------|--------|--------|------| ------ |
| $v^+$              |        |        |  $+1$   | |
| $v^-$              |        |        |  $-1$   | |
| $i$                |  $+1$  | $-1$   |         | $V$ |

| VCVS $v_s = ku_x$ (Group 2) | $v^+$  | $v^-$  | $v_x^+$  | $v_x^-$  | $i_s$ | RHS  |
|------------------|--------|--------|--------|--------|------| ------ |
| $v^+$            |        |        |        |        |  $+1$   | |
| $v^-$            |        |        |        |        |  $-1$   | |
| $i$                |  $+1$  | $-1$   | $-k$   | $+k$   |         | |

| CCVS $v_s = ki_x$ (Group 2) | $v^+$  | $v^-$  | $i_s$  | $i_x$  | RHS  |
|--------------------|--------|--------|--------|--------| ------ |
| $v_e^+$            |        |        |  $+1$  |        |        |
| $v_e^-$            |        |        |  $-1$  |        |        |
| $i_s$              |  $+1$  | $-1$   |        | $-k$   |        |
| $i_x$              |        |        |        |        |        |

| VCCS $i_s = ku_x$ (Group 1) | $v^+$ | $v^-$ | $v_x^+$ | $v_x^-$ | RHS |
|-----------------------------|-------|-------|---------|---------|-----|
| $v^+$                       |       |       | $+k$    | $-k$    |     |
| $v^-$                       |       |       | $-k$    | $+k$    |     |

| VCCS $i_s = ku_x$ (Group 2) | $v^+$ | $v^-$ | $v_x^+$ | $v_x^-$ | $i_s$ | RHS |
|-----------------------------|-------|-------|---------|---------|-------|-----|
| $v^+$                       |       |       |         |         | $+1$  |     |
| $v^-$                       |       |       |         |         | $-1$  |     |
| $i_s$                       |       |       | $+k$    | $-k$    | $+1$  |     |

| CCCS $i_s = ki_x$ (Group 1) | $v^+$ | $v^-$ | $v_x^+$ | $v_x^-$ | $i_x$ | RHS |
|-----------------------------|-------|-------|---------|---------|-------|-----|
| $v^+$                       |       |       |         |         | $+k$  |     |
| $v^-$                       |       |       |         |         | $-k$  |     |
| $i_x$                       |       |       |         |         |       |     |

| CCCS $i_s = ki_x$ (Group 2) | $v^+$ | $v^-$ | $v_x^+$ | $v_x^-$ | $i_s$ | $i_x$ | RHS |
|-----------------------------|-------|-------|---------|---------|-------|-------|-----|
| $v^+$                       |       |       |         |         |       | $+k$  |     |
| $v^-$                       |       |       |         |         |       | $-k$  |     |
| $i_s$                       |       |       |         |         | $+1$  | $-k$  |     |
| $i_x$                       |       |       |         |         |       |       |     |

| Capacitor / Group 1 | $v^+$ | $v^-$ |   | Derivatives | $(v^+)'$ | $(v^-)'$ | RHS |
|---------------------|-------|-------|---|-------------|--------|--------|-----|
| $v^+$               |       |       |   | $(v^+)'$      | $+C$   | $-C$   |     |
| $v^-$               |       |       |   | $(v^-)'$      | $-C$   | $+C$   |     |

| Capacitor / Group 2 | $v^+$ | $v^-$ | $i_C$ |   | Derivatives | $(v^+)'$ | $(v^-)'$ | $(i_C)'$ | RHS |
|---------------------|-------|-------|-------|---|-------------|----------|----------|----------|-----|
| $v^+$               |       |       | $+1$  |   | $(v^+)'$    |          |          |          |     |
| $v^-$               |       |       | $-1$  |   | $(v^-)'$    |          |          |          |     |
| $i_C$               |       |       | $+1$  |   | $(i_C)'$    | $-C$     | $+C$     |          |     |

| Inductor (Group 2) | $v^+$ | $v^-$ | $i_L$ |   | Derivatives | $(v^+)'$ | $(v^-)'$ | $(i_L)'$ | RHS |
|--------------------|-------|-------|-------|---|-------------|----------|----------|----------|-----|
| $v^+$              |       |       | $+1$  |   | $(v^+)'$    |          |          |          |     |
| $v^-$              |       |       | $-1$  |   | $(v^-)'$    |          |          |          |     |
| $i_L$              | $+1$  | $-1$  |       |   | $(i_L)'$    |          |          | $+L$     |     |

感谢@我小渔儿 补充的VCCS和CCCS的情况.

值得再次提醒的是, 在作为control element的时候, 如果是current control, 这意味着首先需要把control element的电流加入变量中.

在将stamp的各个贡献并入MNA的矩阵中时, 值得注意的是如果其中一端是节点0, 则(节点0所在行列)这一部分对应的贡献不用被写入矩阵$A$. 因为节点0已经被消去了.

**例子.**
考察这样一个书上的案例电路:

![Example Circuit](https://gitee.com/j7168908jx/mdnice-bed/raw/master/2022-2-21/1645454515415-image.png)

其中 $e_1, e_2$ 是group 1, $e_3, e_4$ 是group 2的, 下半部分连接起来的部分是节点0(图中未标出). 学习一下每一个元器件的stamp:

- $e_1$是一个正常的电阻, 由于不需要记录任何关于节点0的信息, 所以它的贡献是
  - $v_2, v_2, 1.$
- $e_2$是一个受控电流源$i_s = 2i_3$. 所以产生的电流$k=-2$(因为方向和参考方向相反), 其贡献为
  - $v_2, i_3, -2.$
- $e_3$是一个group 2电阻, 我们直接抄答案...
  - $v_1, i_3, 1,$
  - $v_2, i_3, -1,$
  - $i_3, v_1, -1,$
  - $i_3, v_2, 1,$
  - $i_3, i_3, 1.$
- $e_4$是一个independent电压源, 省略掉节点0, 我们有贡献
  - $v_1, i_4, +1,$
  - $i_4, v_1, +1,$
  - $i_4, \text{RHS}, +3.$

就是这样, 想必熟悉稀疏矩阵的读者已经知道了, 这是以COO形式列出来了贡献, 直接把贡献全部assemble进稀疏矩阵就得到了MNA的结果. 当然, RHS另外存到一个向量中.

**稀疏性.**
书中介绍了在几种特殊情况下MNA矩阵的稀疏性是有所保证的.

1. 单电压源, 仅1个参考节点接地, 无受控源和动态源. 则nnz大约是$n+2m$个.
2. 一般一点的情况下, 大部分元器件都不会有超过6个非零贡献, 所以也可以估计nnz不超过$6m$
3. 一般无多条边的全连接无向图满足$m\leq 3n-6$.






-
-
-
-
-






