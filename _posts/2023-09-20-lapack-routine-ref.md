---
title:  "(Sca)LAPACK Routine Reference"
excerpt: "Simply a copy of netlib"
# subtitle: " "
tag: "High-performance Computing"
layout: post
---

## Before

This is basicly a copy of [netlib's ScaLAPACK Routines' reference page](https://netlib.org/scalapack/lawn93/node48.html).

This copy is for my own convenience, and I do not own any of the content.

## Name Conventions

Each subroutine name in ScaLAPACK, which has an LAPACK equivalent, is simply the LAPACK name prepended by a `P`.

All names consist of seven characters in the form `PTXXYYY`.

### Data Types
- The second letter, T, indicates the matrix data type as follows:

| T | Matrix Data Type |
|---|------------------|
| S | REAL             |
| D | DOUBLE PRECISION |
| C | COMPLEX          |
| Z | COMPLEX*16       |

### Matrix Types

- The next two letters, XX, indicate the type of matrix.
- Most of these two-letter codes apply to both real and complex routines.

| XX | Matrix Data Type |
|----|------------------|
| DB | general band (diagonally-dominant like)                                 |
| DT | general tridiagonal (diagonally-dominant like)                          |
| GB | general band                                                            |
| GE | general (i.e. unsymmetric, in some cases rectangular)                   |
| GG | general matrices, generalized problem (i.e. a pair of general matrices) |
| HE | (complex) Hermitian                                                     |
| OR | (real) orthogonal                                                       |
| PB | symmetric or Hermitian positive definite band                           |
| PO | symmetric or Hermitian positive definite                                |
| PT | symmetric or Hermitian positive definite tridiagonal                    |
| ST | symmetric tridiagonal                                                   |
| SY | symmetric                                                               |
| TR | triangular (or in some cases quasi-triangular)                          |
| TZ | trapezoidal                                                             |
| UN | (complex) unitary                                                       |

### Routine Types

- The last three characters, YYY, indicate the computation done by a particular subroutine.

| YYY | Short Explanation           | Routine Type                                                                |
|-----|-----------------------------|-----------------------------------------------------------------------------|
| BRD | bidiagonal reduction        | reduce to bidiagonal form by orthogonal transformations                     |
| HRD | Hessenberg reduction        | reduce to upper Hessenberg form by orthogonal transformations               |
| TRD | Tridiagonal reduction       | reduce a symmetric matrix to real symmetric tridiagonal form                |
| *** | *************************** | *************************************************************************** |
| GST | pre-solve gen-eigval        | reduce a symmetric*definite generalized eigenvalue problem to standard form |
| EBZ | eigval bisection            | compute selected eigenvalues by bisection                                   |
| EDC | eigval divide and conquer   | compute eigenvectors using divide and conquer                               |
| EIN | eigvec inv iteration        | compute selected eigenvectors by inverse iteration                          |
| EVC | eigvec by Schur             | compute the eigenvectors from the Schur factorization                       |
| *** | *************************** | *************************************************************************** |
| LQF | LQ w/o pivot                | compute an LQ factorization without pivoting                                |
| QLF | QL w/o pivot                | compute a QL factorization without pivoting                                 |
| QPF | QR w/ column pivot          | compute a QR factorization with column pivoting                             |
| QRF | QR w/o pivot                | compute a QR factorization without pivoting                                 |
| RQF | RQ w/o pivot                | compute an RQ factorization without pivoting                                |
| RZF | RZ w/o pivot                | compute an RZ factorization without pivoting                                |
| *** | *************************** | *************************************************************************** |
| CON | condition number            | estimate condition number                                                   |
| EQU | equilibration               | equilibrate a matrix to reduce its condition number                         |
| TRF | Triangular factorization    | compute a triangular factorization (LU, Cholesky, etc.)                     |
| TRI | Compute mat inv             | compute inverse (based on triangular factorization)                         |
| TRS | Solve linear eqs            | solve systems of linear equations (based on triangular factorization)       |
| RFS | Refine TRS                  | refine initial solution returned by TRS routines                            |
| *** | *************************** | *************************************************************************** |
| GBR | get unitary mat from BRD    | generate the orthogonal/unitary matrix from PxGEBRD                         |
| GHR | get unitary mat from HRD    | generate the orthogonal/unitary matrix from PxGEHRD                         |
| GLQ | get unitary mat from LQF    | generate the orthogonal/unitary matrix from PxGELQF                         |
| GQL | get unitary mat from QLF    | generate the orthogonal/unitary matrix from PxGEQLF                         |
| GQR | get unitary mat from QRF    | generate the orthogonal/unitary matrix from PxGEQRF                         |
| GRQ | get unitary mat from RQF    | generate the orthogonal/unitary matrix from PxGERQF                         |
| MBR | matmul unitary mat from BRD | multiply by the orthogonal/unitary matrix from PxGEBRD                      |
| MHR | matmul unitary mat from HRD | multiply by the orthogonal/unitary matrix from PxGEHRD                      |
| MLQ | matmul unitary mat from LQF | multiply by the orthogonal/unitary matrix from PxGELQF                      |
| MQL | matmul unitary mat from QLF | multiply by the orthogonal/unitary matrix from PxGEQLF                      |
| MQR | matmul unitary mat from QRF | multiply by the orthogonal/unitary matrix from PxGEQRF                      |
| MRQ | matmul unitary mat from RQF | multiply by the orthogonal/unitary matrix from PxGERQF                      |
| MRZ | matmul unitary mat from RZF | multiply by the orthogonal/unitary matrix from PxTZRZF                      |
| MTR | matmul unitary mat from TRD | multiply by the orthogonal/unitary matrix from PxxxTRD                      |

**Solving Linear Equations**

Given these definitions, the following table indicates the ScaLAPACK subroutines for the solution of systems of linear equations:

|                             |    |    |    |    |    |    |    |    |    | HE |    |    | UN |
|-----------------------------|----|----|----|----|----|----|----|----|----|----|----|----|----|
|                             | GE | GG | DB | GB | DT | GT | PO | PB | PT | SY | TR | TZ | OR |
| TRF                         | #  |    | #  | #  | #  |    | #  | #  | #  |    |    |    |    |
| TRS                         | #  |    | #  | #  | #  |    | #  | #  | #  |    | #  |    |    |
| RFS                         | #  |    |    |    |    |    | #  |    |    |    | #  |    |    |
| TRI                         | #  |    |    |    |    |    | #  |    |    |    | #  |    |    |
| CON                         | #  |    |    |    |    |    | #  |    |    |    | #  |    |    |
| EQU                         | #  |    |    |    |    |    | #  |    |    |    |    |    |    |
| QPF                         | #  |    |    |    |    |    |    |    |    |    |    |    |    |
| QRF*                        | #  | #  |    |    |    |    |    |    |    |    |    |    |    |
| RZF                         |    |    |    |    |    |    |    |    |    |    |    | #  |    |
| GQR*                        |    |    |    |    |    |    |    |    |    |    |    |    | #  |
| MQR**                       |    |    |    |    |    |    |    |    |    |    |    |    | #  |

- *: also RQ, QL, and LQ
- **: also RQ, RZ, QL, and LQ

**Solving Eigenvalue or SVD Problems**

The following table indicates the ScaLAPACK subroutines for finding eigenvalues and eigenvectors or singular values and singular vectors:

|     |    |    |    |    |    |    | HE |    |    |    |
|-----|----|----|----|----|----|----|----|----|----|----|
|     | GE | GG | HS | HG | TR | TG | SY | ST | PT | BD |
| HRD | #  |    |    |    |    |    |    |    |    |    |
| TRD |    |    |    |    |    |    | #  |    |    |    |
| BRD | #  |    |    |    |    |    |    |    |    |    |
| EQZ |    |    |    |    |    |    |    |    |    |    |
| EIN |    |    |    |    |    |    |    | #  |    |    |
| EBZ |    |    |    |    |    |    |    | #  |    |    |
| EDC |    |    |    |    |    |    |    | #  |    |    |
| EVC |    |    |    |    | #  |    |    | #  |    |    |
| GST |    |    |    |    |    |    | #  |    |    |    |

**Orthogonal and Unitary Transformations**

Orthogonal/unitary transformation routines have also been provided for the reductions that use elementary transformations.

|     | UN |
|-----|----|
|     | OR |
| GHR | #  |
| GTR | #  |
| GBR | #  |
| MHR | #  |
| MTR | #  |
| MBR | #  |

### Driver Routines

In addition, a number of driver routines are provided with this release. The naming convention for the driver routines is the same as for the LAPACK routines, but the last 3 characters YYY have the following meanings (note an `X' in the last character position indicates a more expert driver):

| YYY | Routine Type |
|-----|--------------|
| SV  | factor the matrix and solve a system of equations |
| SVX | equilibrate, factor, solve, compute error bounds and do iterative refinement, and estimate the condition number |
| LS  | solve over- or underdetermined linear system using orthogonal factorizations |
| EV  | compute all eigenvalues and/or eigenvectors |
| EVD | compute all eigenvalues and, optionally, eigenvectors (using divide and conquer algorithm) |
| EVX | compute selected eigenvalues and eigenvectors |
| GVX | compute selected generalized eigenvalues and/or generalized eigenvectors |
| SVD | compute the SVD and/or singular vectors |

The driver routines provided in ScaLAPACK are indicated by the following table:

|     |    |    |    |    |    |    |    |    |    | HE | HB |    |
|-----|----|----|----|----|----|----|----|----|----|----|----|----|
|     | GE | GG | DB | GB | DT | GT | PO | PB | PT | SY | SB | ST |
| SV  | #  |    | #  | #  | #  |    | #  | #  | #  |    |    |    |
| SVX | #  |    |    |    |    |    | #  |    |    |    |    |    |
| LS  | #  |    |    |    |    |    |    |    |    |    |    |    |
| EV  |    |    |    |    |    |    |    |    |    | #  |    |    |
| EVD |    |    |    |    |    |    |    |    |    | #  |    |    |
| EVX |    |    |    |    |    |    |    |    |    | #  |    |    |
| GVX |    |    |    |    |    |    |    |    |    | #  |    |    |
| SVD | #  |    |    |    |    |    |    |    |    |    |    |    |
