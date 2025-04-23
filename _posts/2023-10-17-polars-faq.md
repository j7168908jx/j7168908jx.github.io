---
title:  "Polars Cheatsheet (WIP)"
excerpt: "This post(note) summarized some FAQs asked by myself during my working experiences."
# subtitle: " "
tag: "Python"
layout: post
toc: true
---

[User guide](https://pola-rs.github.io/polars/user-guide/)

[API documentation](https://pola-rs.github.io/polars/py-polars/html/reference/index.html)


## API Notes

### `group_by_dynamic`

Not to confuse this one with `groupby_dynamic`, which is deprecated.

An example of using it:

```python
>>> pl.DataFrame({"a": [1,4,8,12,16,23,29]}) \
>>>   .set_sorted("a")  \
>>>   .group_by_dynamic("a", every="7i", start_by="datapoint", include_boundaries=True, closed="right", label="right") \
>>>   .agg([pl.count(), pl.col("a").alias("ab")])
shape: (4, 5)
┌─────────────────┬─────────────────┬─────┬───────┬───────────┐
│ _lower_boundary ┆ _upper_boundary ┆ a   ┆ count ┆ ab        │
│ ---             ┆ ---             ┆ --- ┆ ---   ┆ ---       │
│ i64             ┆ i64             ┆ i64 ┆ u32   ┆ list[i64] │
╞═════════════════╪═════════════════╪═════╪═══════╪═══════════╡
│ 1               ┆ 8               ┆ 8   ┆ 2     ┆ [4, 8]    │
│ 8               ┆ 15              ┆ 15  ┆ 1     ┆ [12]      │
│ 15              ┆ 22              ┆ 22  ┆ 1     ┆ [16]      │
│ 22              ┆ 29              ┆ 29  ┆ 2     ┆ [23, 29]  │
└─────────────────┴─────────────────┴─────┴───────┴───────────┘
```