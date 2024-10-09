---
title:  "Convert FFT from Real-data FFT"
excerpt: ""
# subtitle: " "
tag: "Fast Algorithm"
layout: post
---

This post summarizes how one convert the real-data FFT to the original complex FFT.

The real-data FFT inputs a real array and outputs a complex array. For input dimension `n1 x n2`, the output dimension is `n1 x (n2//2+1)` due to symmetric. The later half, which is the conjugate of the first half, is not stored.

The storage layout is C-alike, row-majored and matches the output of `fftw`.

Only 2d, r2c version is now presented:

```python
def convert2d(real: np.ndarray, n: int) -> np.ndarray:
    """
    real: a 2d real array, dimesnion n x (n//2+1)

    output: a 2d complex array, dimension n x n
    """
    h = n//2 + 1
    assert real.shape == (n, h)
    comp = np.zeros((n, n), dtype=np.complex128)
    comp[:, :h] = real[:, :]
    comp[0, h:] = real[0, 1:n-h+1].conj()[::-1]
    comp[1:, h:] = np.flipud(np.fliplr(real[1:, 1:n-h+1])).conj()
    return comp
```

