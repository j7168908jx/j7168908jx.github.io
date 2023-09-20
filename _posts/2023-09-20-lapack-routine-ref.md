---
title:  "(Sca)LAPACK Routine Reference"
excerpt: "Simply a copy of netlib"
# subtitle: " "
tag: "High-performance Computing"
layout: post-with-toc
---

## Before

This is basicly a copy of [netlib's ScaLAPACK Routines' reference page](https://netlib.org/scalapack/lawn93/node48.html) and [Auxiliary Routines](https://netlib.org/scalapack/lawn93/node49.html).

This copy is for my own convenience, and I do not own any of the content.

## Name Conventions

Each subroutine name in ScaLAPACK, which has an LAPACK equivalent, is simply the LAPACK name prepended by a `P`.

All names consist of seven characters in the form `PTXXYYY`.

## Data Types
- The second letter, T, indicates the matrix data type as follows:

| T | Matrix Data Type                        |
|---|------------------                       |
| S | REAL                                    |
| D | DOUBLE PRECISION                        |
| C | COMPLEX                                 |
| Z | COMPLEX*16                              |
| _ | all of S,D,C,Z unless otherwise noted   |

## Matrix Types

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
| LA | no special meaning, **only appears in auxiliary routines**               |
| OR | (real) orthogonal                                                       |
| PB | symmetric or Hermitian positive definite band                           |
| PO | symmetric or Hermitian positive definite                                |
| PT | symmetric or Hermitian positive definite tridiagonal                    |
| ST | symmetric tridiagonal                                                   |
| SY | symmetric                                                               |
| TR | triangular (or in some cases quasi-triangular)                          |
| TZ | trapezoidal                                                             |
| UN | (complex) unitary                                                       |

## Routine Types

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

### Solving Linear Equations

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

### Solving Eigenvalue or SVD Problems

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

### Orthogonal and Unitary Transformations

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

### Auxiliary Routines

| P_LANGE | General matrix             |
|---------|----------------------------|
| P_LANHE | (complex) Hermitian matrix |
| P_LANHS | Upper Hessenberg matrix    |
| P_LANSY | Symmetric matrix           |
| P_LANTR | Trapezoidal matrix         |
| ******* | ******************************* |
| P_GEBD2 | reduce a general matrix to bidiagonal form                           |
| P_GEHD2 | reduce a square matrix to upper Hessenberg form                      |
| P_GELQ2 | compute an LQ factorization without pivoting                         |
| P_GEQL2 | compute a QL factorization without pivoting                          |
| P_GEQR2 | compute a QR factorization without pivoting                          |
| P_GERQ2 | compute an RQ factorization without pivoting                         |
| P_GETF2 | compute the LU factorization of a general matrix                     |
| P_HETD2 | (complex) reduce a Hermitian matrix to real tridiagonal form         |
| P_ORG2L | (real) generate the orthogonal matrix from PxGEQLF                   |
| P_ORG2R | (real) generate the orthogonal matrix from PxGEQRF                   |
| P_ORGL2 | (real) generate the orthogonal matrix from PxGEQLF                   |
| P_ORGR2 | (real) generate the orthogonal matrix from PxGERQF                   |
| P_ORM2L | (real) multiply by the orthogonal matrix from PxGEQLF                |
| P_ORM2R | (real) multiply by the orthogonal matrix from PxGEQRF                |
| P_ORML2 | (real) multiply by the orthogonal matrix from PxGELQF                |
| P_ORMR2 | (real) multiply by the orthogonal matrix from PxGERQF                |
| P_ORMR3 | (real) multiply by the orthogonal matrix from PxTZRZF                |
| P_POTF2 | compute the Cholesky factorization of a positive definite matrix     |
| P_SYGS2 | (real) reduce a symmetric-definite generalized eigenvalue problem to |
| P_SYTD2 | (real) reduce a symmetric matrix to tridiagonal form                 |
| P_TRTI2 | compute the inverse of a triangular matrix                           |
| P_UNG2L | (complex) generate the unitary matrix from PxGEQLF                   |
| P_UNG2R | (complex) generate the unitary matrix from PxGEQRF                   |
| P_UNGL2 | (complex) generate the unitary matrix from PxGEQLF                   |
| P_UNGR2 | (complex) generate the unitary matrix from PxGERQF                   |
| P_UNM2L | (complex) multiply by the unitary matrix from PxGEQLF                |
| P_UNM2R | (complex) multiply by the unitary matrix from PxGEQRF                |
| P_UNML2 | (complex) multiply by the unitary matrix from PxGELQF                |
| P_UNMR2 | (complex) multiply by the unitary matrix from PxGERQF                |
| P_UNMR3 | (complex) multiply by the unitary matrix from PxTZRZF                |
| ******* | ******************************* |
| P_LABAD | (real) returns square root of underflow and overflow if exponent range is large |
| P_LABRD | reduce NB rows or columns of a matrix to upper or lower bidiagonal form         |
| P_LACGV | (complex) conjugates a complex vector of length n                               |
| P_LACHKIEEE |  (real) performs a simple check for the features of the IEEE standard        |
| P_LACON | estimate the norm of a matrix for use in condition estimation                   |
| P_LACONSB |  (real) looks for two consecutive small subdiagonal elements                   |
| P_LACP2 | copies all or part of a distributed matrix to another distributed matrix        |
| P_LACP3 | (real) copies from a global parallel array into a local replicated array or vice versa. |
| P_LACPY | copy all or part of a distributed matrix to another distributed matrix |
| P_LAED0 | Used by PxSTEDC.                                                       |
| P_LAED1 | (real) Used by PxSTEDC.                                                |
| P_LAED2 | (real) Used by PxSTEDC.                                                |
| P_LAED3 | (real) Used by PxSTEDC.                                                |
| P_LAEDZ | (real) Used by PxSTEDC.                                                |
| P_LAEVSWP | moves the eigenvectors from where they are computed to a standard block cyclic array |
| P_LAHEF | (complex) compute part of the diagonal pivoting factorization of a Hermitian matrix |
| P_LAHQR | Find the Schur factorization of a Hessenberg matrix (modified version of HQR from EISPACK) |
| P_LAHRD | reduce NB columns of a general matrix to Hessenberg form                       |
| P_LAIECTB | (real) computes the number of negative eigenvalues in where the sign bit is assumed to be bit 32.                                             |
| P_LAIECTL | (real) computes the number of negative eigenvalues in where the sign bit is assumed to be bit 64.                                             |
| _LANV2 | (complex) computes the Schur factorization of a real 2-by-2 nonsymmetric matrix |
| P_LAPIV | applies permutation matrix to a general distributed matrix                     |
| P_LAPV2 | pivoting                                                                       |
| P_LAQGE | equilibrate a general matrix                                                   |
| P_LAQSY | equilibrate a symmetric matrix                                                 |
| P_LARED1D | (real) Redistributes an array assuming that the input array, BYCOL, is distributed across rows and that all process columns contain the same copy of BYCOL. |
| P_LARED2D | Redistributes an array assuming that the input array, BYROW, is distributed across columns and that all process rows contain the same copy of BYROW.  The output array, BYALL, will be identical on all processes.  |
| P_LARF | apply (multiply by) an elementary reflector to a general rectangular matrix.      |
| P_LARFB | apply (multiply by) a block reflector or its transpose/conjugate-transpose to a general rectangular matrix.  |
| P_LARFC | (complex) apply (multiply by) the conjugate-transpose of an elementary reflector to a general matrix. |
| P_LARFG | generate an elementary reflector (Householder matrix).                         |
| P_LARFT | form the triangular factor of a block reflector                                |
| P_LARZ  | apply (multiply by) an elementary reflector as returned by P_TZRZF to a general matrix.  |
| P_LARZB | apply (multiply by) a block reflector or its transpose/conjugate transpose as returned by P_TZRZF to a general matrix. |
| P_LARZC | (complex) apply (multiply by) the conjugate transpose of an elementary reflector as returned by P_TZRZF to a general matrix. |
| P_LARZT | form the triangular factor of a block reflector as returned by P_TZRZF.        |
| P_LASCL | multiplies a general rectangular matrix by a real scalar CTO/CFROM P_LASE2     |
| P_LASET | initializes a matrix to BETA on the diagonal and ALPHA on the off-diagonals    |
| P_LASMSUB | (real) looks for a small subdiagonal element from the bottom of the matrix that it can safely set to zero. |
| P_LASNBT | computes the position of the sign bit of a double precision floating point number P_LASRT   |
| P_LASSQ | Compute a scaled sum of squares of the elements of a vector                    |
| P_LASWP | Perform a series of row interchanges                                           |
| P_LATRA | computes the trace of a distributed matrix                                     |
| P_LATRD | reduce NB rows and columns of a real symmetric or complex Hermitian matrix to tridiagonal form |
| P_LATRS | solve a triangular system with scaling to prevent overflow                     |
| P_LATRZ | reduces an upper trapezoidal matrix to upper triangular form                   |
| P_LAUU2 | Unblocked version of P_LAUUM                                                   |
| P_LAUUM | Compute the product UU' or L'L (blocked version)                               |
| P_LAWIL | forms the Wilkinson transform                                                  |