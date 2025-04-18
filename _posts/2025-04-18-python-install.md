---
title:  "Install Python from Source in Ubuntu"
subtitle: ""
tag: "Python"
layout: post
---

Install Python from source code can be painful. The following is a simple script to build such from scratch.

The first step is to install OpenSSL as the dependency.


```bash
export OPSSL_VER=3.0.8

wget https://www.openssl.org/source/openssl-$OPSSL_VER.tar.gz
wget https://www.openssl.org/source/openssl-$OPSSL_VER.tar.gz.sha256
sha256sum openssl-$OPSSL_VER.tar.gz
cat openssl-$OPSSL_VER.tar.gz.sha256
rm openssl-$OPSSL_VER.tar.gz.sha256

tar -xzvf openssl-$OPSSL_VER.tar.gz
cd openssl-$OPSSL_VER/
./config --prefix=/opt/OpenSSL/$OPSSL_VER --openssldir=/opt/OpenSSL/$OPSSL_VER shared zlib
make -j
make test

sudo make install
```


Then we can build Python and install it.




```bash
sudo apt-get install libbz2-dev libncurses5-dev libncursesw5-dev libgdbm-dev  liblzma-dev libsqlite3-dev tk-dev uuid-dev libreadline-dev libffi-dev


export OPSSL_VER=3.0.8
export LDFLAGS=-L/opt/OpenSSL/$OPSSL_VER/lib64
export LD_LIBRARY_PATH=/opt/OpenSSL/$OPSSL_VER/lib64

# ensure you export these env vars before configure!!!

# Go to python.org download corresponding versino of .xz format
# usually you should check which version is the newest

export PY_VER=3.8.12
export PY_VER=3.10.13
export PY_VER=3.12.2

wget https://www.python.org/ftp/python/$PY_VER/Python-$PY_VER.tar.xz --no-check-certificate



tar -xvf Python-$PY_VER.tar.xz && cd Python-$PY_VER
LDFLAGS="${LDFLAGS} -Wl,-rpath=/opt/OpenSSL/$OPSSL_VER/lib64" ./configure \
    --enable-optimizations --enable-loadable-sqlite-extensions \
    --enable-ipv6 --enable-big-digits \
    --with-lto --with-pymalloc \
    --with-doc-strings --with-openssl=/opt/OpenSSL/$OPSSL_VER \
    --enable-shared \
    --prefix=/opt/Python/$PY_VER > configure.log 2>&1

# check configure.log
# check if configure log shows that ssl support is correctly installed! (check the last part of the log to see if any module is not correctly installed)
grep SSL configure.log

make -j > make.log 2>&1


# check make.log
# make sure no module fails to build! except _dbm only
tail -n 25 make.log



sudo make install

# Copy or create modulefiles
# sudo cp -r modulefiles/Python /etc/modulefiles

# optional
sudo ln -s /opt/Python/$PY_VER/bin/python3 /opt/Python/$PY_VER/bin/python
sudo ln -s /opt/Python/$PY_VER/bin/pip3 /opt/Python/$PY_VER/bin/pip

sudo /opt/Python/$PY_VER/bin/python3 -m pip install --upgrade pip

# install frequently used packages
sudo /opt/Python/$PY_VER/bin/python3 -m pip install pandas polars scikit-learn numpy matplotlib requests

```

