---
title:  "Efficiency Comparison of Feather and Parquet Storage Formats"
subtitle: ""
tag: "Python"
layout: post
excerpt: "本报告系统对比了Feather与Parquet等主流数据存储格式在不同压缩算法下的读写性能与压缩效果."
toc: true
---

# 数据存储格式性能分析报告

## 概述

本报告基于100万个数据（无论行数）的测试结果 (原始文件大约 800 MB), 对比了Feather、Parquet和Avro三种数据格式在不同压缩算法下的性能表现.

## 1. 按数据列配置分组对比

### 1.1 简单数据结构 (1整数列 + 1浮点列)

| 格式 | 压缩方式 | 10股票 | | | 100股票 | | | 1000股票 | | |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| | | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) |
| feather | uncompressed | 1.154 | 0.000 | 762.94 | 1.219 | 0.000 | 762.94 | 1.177 | 0.000 | 762.94 |
| feather | lz4 | 1.319 | 1.055 | 313.14 | 1.491 | 1.062 | 347.51 | 1.512 | 1.060 | 360.24 |
| feather | zstd | 1.902 | 1.243 | 224.26 | 2.683 | 1.406 | 236.91 | 2.728 | 1.374 | 250.45 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| parquet | uncompressed | 1.777 | 0.240 | 342.86 | 2.170 | 0.232 | 423.52 | 2.171 | 0.247 | 432.35 |
| parquet | snappy | 1.754 | 0.240 | 311.15 | 2.193 | 0.241 | 316.22 | 2.406 | 0.234 | 327.80 |
| parquet | gzip | 11.945 | 0.257 | 273.25 | 12.670 | 0.297 | 250.96 | 11.748 | 0.238 | 257.74 |
| parquet | brotli | 3.694 | 0.362 | 268.56 | 4.459 | 0.380 | 249.19 | 4.739 | 0.393 | 257.29 |
| parquet | lz4 | 1.691 | 0.243 | 311.59 | 2.307 | 0.284 | 315.11 | 2.539 | 0.244 | 327.88 |
| parquet | zstd | 3.002 | 0.247 | 261.50 | 3.357 | 0.245 | 239.98 | 3.758 | 0.235 | 250.85 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| avro | uncompressed | 1.894 | 2.824 | 476.84 | 1.767 | 2.958 | 485.42 | 1.836 | 3.177 | 499.15 |
| avro | snappy | 4.251 | 6.411 | 351.91 | 3.991 | 6.231 | 380.09 | 4.150 | 6.635 | 395.73 |
| avro | deflate | 66.006 | 9.970 | 282.04 | 71.114 | 10.607 | 296.87 | 72.672 | 11.293 | 313.77 |

### 1.2 中等复杂数据结构 (10整数列 + 10浮点列)

| 格式 | 压缩方式 | 10股票 | | | 100股票 | | | 1000股票 | | |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| | | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) |
| feather | uncompressed | 1.507 | 0.000 | 762.94 | 1.472 | 0.001 | 762.94 | 1.507 | 0.000 | 762.94 |
| feather | lz4 | 1.577 | 0.961 | 490.79 | 1.573 | 0.961 | 493.82 | 1.621 | 0.965 | 496.14 |
| feather | zstd | 2.879 | 1.528 | 392.07 | 2.904 | 1.526 | 393.69 | 2.923 | 1.516 | 397.38 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| parquet | uncompressed | 0.912 | 0.231 | 442.70 | 1.114 | 0.199 | 444.08 | 1.075 | 0.219 | 445.64 |
| parquet | snappy | 1.006 | 0.220 | 422.17 | 1.240 | 0.210 | 425.04 | 1.148 | 0.237 | 427.42 |
| parquet | gzip | 13.991 | 0.363 | 390.14 | 13.583 | 0.371 | 391.46 | 14.416 | 0.376 | 394.17 |
| parquet | brotli | 2.977 | 0.929 | 389.39 | 3.086 | 0.916 | 390.96 | 3.131 | 0.897 | 393.79 |
| parquet | lz4 | 0.990 | 0.218 | 423.34 | 1.159 | 0.224 | 426.41 | 1.144 | 0.224 | 428.68 |
| parquet | zstd | 1.654 | 0.273 | 387.80 | 1.888 | 0.268 | 389.21 | 1.969 | 0.263 | 392.86 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| avro | uncompressed | 2.447 | 2.819 | 554.87 | 2.751 | 2.860 | 556.43 | 2.533 | 2.835 | 558.92 |
| avro | snappy | 5.180 | 6.433 | 520.14 | 5.628 | 6.859 | 523.55 | 5.143 | 6.481 | 525.78 |
| avro | deflate | 98.973 | 14.424 | 446.67 | 102.813 | 14.674 | 449.75 | 100.250 | 14.678 | 452.41 |

### 1.3 高复杂数据结构 (200整数列 + 200浮点列)

| 格式 | 压缩方式 | 10股票 | | | 100股票 | | | 1000股票 | | |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| | | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) | 文件大小(MB) |
| feather | uncompressed | 1.420 | 0.001 | 763.03 | 1.432 | 0.001 | 763.03 | 1.417 | 0.001 | 763.03 |
| feather | lz4 | 1.646 | 0.844 | 522.56 | 1.670 | 0.853 | 522.69 | 1.864 | 0.840 | 522.71 |
| feather | zstd | 2.784 | 1.458 | 425.36 | 2.843 | 1.475 | 425.53 | 2.784 | 1.462 | 425.56 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| parquet | uncompressed | 0.671 | 0.079 | 447.15 | 0.642 | 0.081 | 447.18 | 0.659 | 0.074 | 447.39 |
| parquet | snappy | 0.726 | 0.077 | 445.93 | 0.723 | 0.075 | 446.02 | 0.698 | 0.072 | 446.21 |
| parquet | gzip | 14.237 | 0.097 | 419.95 | 14.624 | 0.099 | 420.08 | 13.349 | 0.097 | 420.36 |
| parquet | brotli | 2.578 | 0.240 | 419.52 | 2.659 | 0.230 | 419.60 | 2.620 | 0.232 | 419.86 |
| parquet | lz4 | 0.704 | 0.073 | 447.60 | 0.724 | 0.071 | 447.67 | 0.722 | 0.069 | 447.81 |
| parquet | zstd | 1.259 | 0.092 | 419.34 | 1.327 | 0.086 | 419.42 | 1.325 | 0.084 | 419.62 |
|------|----------|--------|--------|--------|---------|--------|--------|----------|--------|--------|
| avro | uncompressed | 2.894 | 3.143 | 571.27 | 2.932 | 3.183 | 571.36 | 2.922 | 3.134 | 571.50 |
| avro | snappy | 5.021 | 6.630 | 551.42 | 5.043 | 6.714 | 552.24 | 5.062 | 6.832 | 553.81 |
| avro | deflate | 103.298 | 15.113 | 467.64 | 106.619 | 15.341 | 467.76 | 103.383 | 15.028 | 467.82 |

## 2. 1000股票10整数列配置下的最优性能对比

### 2.1 写入性能最优配置

| 格式 | 压缩方式 | 写入时间(秒) | 文件大小(MB) |
|------|----------|--------------|---------------|
| parquet | uncompressed | 1.075 | 445.64 |
| parquet | lz4 | 1.144 | 428.68 |
| parquet | snappy | 1.148 | 427.42 |
| feather | uncompressed | 1.507 | 762.94 |
| feather | lz4 | 1.621 | 496.14 |
| parquet | zstd | 1.969 | 392.86 |

### 2.2 读取性能最优配置

| 格式 | 压缩方式 | 读取时间(秒) | 文件大小(MB) |
|------|----------|--------------|---------------|
| feather | uncompressed | 0.000 | 762.94 |
| parquet | uncompressed | 0.219 | 445.64 |
| parquet | lz4 | 0.224 | 428.68 |
| parquet | snappy | 0.237 | 427.42 |
| parquet | zstd | 0.263 | 392.86 |
| parquet | brotli | 0.897 | 393.79 |

### 2.3 压缩效果最优配置

| 格式 | 压缩方式 | 文件大小(MB) | 写入时间(秒) | 读取时间(秒) |
|------|----------|--------------|--------------|--------------|
| parquet | zstd | 392.86 | 1.969 | 0.263 |
| parquet | brotli | 393.79 | 3.131 | 0.897 |
| parquet | gzip | 394.17 | 14.416 | 0.376 |
| feather | zstd | 397.38 | 2.923 | 1.516 |
| parquet | snappy | 427.42 | 1.148 | 0.237 |
| parquet | lz4 | 428.68 | 1.144 | 0.224 |

## 测试代码

```python
#%%

import polars as pl
import numpy as np
import time
import os
from pathlib import Path

# 测试配置
STOCK_COUNTS = [10, 100, 1000]
COLUMN_CONFIGS = [
    {"int_cols": 1, "float_cols": 1},
    {"int_cols": 10, "float_cols": 10},
    {"int_cols": 200, "float_cols": 200}
]
TARGET_ELEMENTS = 100_000_000  # 1亿个元素

# 存储格式和压缩方式
FORMATS = {
    'feather': ['uncompressed', 'lz4', 'zstd'],
    'parquet': ['uncompressed', 'snappy', 'gzip', 'brotli', 'lz4', 'zstd'],
    'avro': ['uncompressed', 'snappy', 'deflate']
}

# 排序方式
SORT_METHODS = ['time_only', 'stock_time']

def generate_data(stock_count, int_cols, float_cols, sort_method):
    """生成测试数据"""
    # 计算需要的行数
    total_cols = 2 + int_cols + float_cols  # stock_id + timestamp + 其他列
    rows = TARGET_ELEMENTS // total_cols

    print(f"生成数据: {stock_count}只股票, {rows}行, {total_cols}列")

    # 生成基础数据
    np.random.seed(42)
    stock_ids = np.random.randint(0, stock_count, rows)
    timestamps = np.random.randint(1640995200, 1640995200 + 86400 * 10, rows)  # 2022年时间戳

    data = {
        'stock_id': stock_ids,
        'timestamp': timestamps
    }

    # 添加整数列 (订单数量)
    for i in range(int_cols):
        col_name = f'quantity_{i}' if int_cols > 1 else 'quantity'
        # data[col_name] = np.random.randint(1, 10000, rows)
        data[col_name] = np.random.poisson(1000, rows)

    # 添加浮点数列 (价格)
    for i in range(float_cols):
        col_name = f'price_{i}' if float_cols > 1 else 'price'
        base_price = np.random.uniform(10, 1000, rows)
        volatility = np.random.normal(0, 0.02, rows)
        data[col_name] = base_price * (1 + volatility)

    df = pl.DataFrame(data)

    # 排序
    if sort_method == 'time_only':
        df = df.sort('timestamp')
    elif sort_method == 'stock_time':
        df = df.sort(['stock_id', 'timestamp'])

    return df

def test_write_read(df, filename, format_type, compression):
    """测试写入和读取性能"""

    # 写入测试
    if format_type == 'feather':
        filepath = f"{filename}.feather"
        start_time = time.time()
        if compression == 'uncompressed':
            df.write_ipc(filepath)
        else:
            df.write_ipc(filepath, compression=compression)
        write_time = time.time() - start_time

    elif format_type == 'parquet':
        filepath = f"{filename}.parquet"
        start_time = time.time()
        df.write_parquet(filepath, compression=compression)
        write_time = time.time() - start_time

    elif format_type == 'avro':
        filepath = f"{filename}.avro"
        start_time = time.time()
        df.write_avro(filepath, compression=compression)
        write_time = time.time() - start_time

    # 读取测试
    start_time = time.time()
    if format_type == 'feather':
        test_df = pl.read_ipc(filepath)
    elif format_type == 'parquet':
        test_df = pl.read_parquet(filepath)
    elif format_type == 'avro':
        test_df = pl.read_avro(filepath)
    read_time = time.time() - start_time

    # 获取文件大小
    file_size = os.path.getsize(filepath)

    # 删除文件
    os.remove(filepath)

    return write_time, read_time, file_size

def main():
    """主函数"""
    print("开始金融数据存储性能测试...")

    # 创建结果存储
    results = []

    # 计算总测试数
    total_tests = 0
    for stock_count in STOCK_COUNTS:
        for col_config in COLUMN_CONFIGS:
            for sort_method in SORT_METHODS:
                for format_type in FORMATS:
                    total_tests += len(FORMATS[format_type])

    current_test = 0

    # 开始测试
    for stock_count in STOCK_COUNTS:
        for col_config in COLUMN_CONFIGS:
            int_cols = col_config['int_cols']
            float_cols = col_config['float_cols']

            for sort_method in SORT_METHODS:
                # 生成数据
                df = generate_data(stock_count, int_cols, float_cols, sort_method)
                rows = len(df)
                total_elements = len(df) * len(df.columns)

                for format_type in FORMATS:
                    for compression in FORMATS[format_type]:
                        current_test += 1

                        filename = f"test_{stock_count}_{int_cols}_{float_cols}_{sort_method}_{format_type}_{compression}"

                        print(f"\n进度: {current_test}/{total_tests}")
                        print(f"测试: {stock_count}只股票, {int_cols}+{float_cols}列, {sort_method}, {format_type} {compression}")

                        try:
                            write_time, read_time, file_size = test_write_read(df, filename, format_type, compression)

                            # 记录结果
                            result = {
                                '股票数': stock_count,
                                '整数列数': int_cols,
                                '浮点列数': float_cols,
                                '排序方式': '时间排序' if sort_method == 'time_only' else '股票+时间排序',
                                '格式': format_type,
                                '压缩方式': compression,
                                '写入时间(秒)': round(write_time, 3),
                                '读取时间(秒)': round(read_time, 3),
                                '文件大小(MB)': round(file_size / 1024 / 1024, 2),
                                '行数': rows,
                                '总元素数': total_elements,
                                '写入速度(MB/s)': round(file_size / 1024 / 1024 / write_time, 2),
                                '读取速度(MB/s)': round(file_size / 1024 / 1024 / read_time, 2)
                            }
                            results.append(result)

                            print(f"  写入: {write_time:.3f}s, 读取: {read_time:.3f}s, 大小: {file_size/1024/1024:.1f}MB")

                        except Exception as e:
                            print(f"  错误: {e}")
                            continue

    # 创建结果DataFrame
    if results:
        results_df = pl.DataFrame(results)

        # 保存结果
        results_df.write_csv("storage_performance_results.csv")
        print(f"\n结果已保存到 storage_performance_results.csv")

        # 显示完整结果
        print("\n=== 完整测试结果 ===")
        print(results_df)

        # 找出最佳表现者
        print("\n=== 最佳表现者 ===")

        # 最快写入
        fastest_write = results_df.sort('写入时间(秒)').row(0)
        print(f"\n最快写入:")
        print(f"  {fastest_write[3]} {fastest_write[4]} {fastest_write[5]} - {fastest_write[6]}秒")

        # 最快读取
        fastest_read = results_df.sort('读取时间(秒)').row(0)
        print(f"\n最快读取:")
        print(f"  {fastest_read[3]} {fastest_read[4]} {fastest_read[5]} - {fastest_read[7]}秒")

        # 最小文件
        smallest_file = results_df.sort('文件大小(MB)').row(0)
        print(f"\n最小文件:")
        print(f"  {smallest_file[3]} {smallest_file[4]} {smallest_file[5]} - {smallest_file[8]}MB")

        # 按格式分组统计
        print("\n=== 按格式分组统计 ===")
        format_stats = results_df.group_by('格式').agg([
            pl.col('写入时间(秒)').mean().alias('平均写入时间'),
            pl.col('读取时间(秒)').mean().alias('平均读取时间'),
            pl.col('文件大小(MB)').mean().alias('平均文件大小'),
            pl.col('写入速度(MB/s)').mean().alias('平均写入速度'),
            pl.col('读取速度(MB/s)').mean().alias('平均读取速度')
        ]).sort('格式')
        print(format_stats)

        # 按压缩方式分组统计
        print("\n=== 按压缩方式分组统计 ===")
        compression_stats = results_df.group_by('压缩方式').agg([
            pl.col('写入时间(秒)').mean().alias('平均写入时间'),
            pl.col('读取时间(秒)').mean().alias('平均读取时间'),
            pl.col('文件大小(MB)').mean().alias('平均文件大小')
        ]).sort('压缩方式')
        print(compression_stats)

        # 按股票数量分组统计
        print("\n=== 按股票数量分组统计 ===")
        stock_stats = results_df.group_by('股票数').agg([
            pl.col('写入时间(秒)').mean().alias('平均写入时间'),
            pl.col('读取时间(秒)').mean().alias('平均读取时间'),
            pl.col('文件大小(MB)').mean().alias('平均文件大小')
        ]).sort('股票数')
        print(stock_stats)

    print("\n测试完成!")
    return results

if __name__ == "__main__":
    results = main()

```

## Notes

Environment:

```bash
$ python
Python 3.10.13 (main, Apr 18 2025, 16:11:27) [GCC 11.4.0] on linux

$ python -m pip freeze | grep polars
polars==0.20.18

$ python -m pip freeze | grep arrow
arrow==1.3.0
pyarrow==19.0.1
```

Disclaimer: This post is only for fun and testing purpose. The code examples and the text in this post are generated by Claude 4.
The execution result is sent to Claude 4 to generate the table in this post.
