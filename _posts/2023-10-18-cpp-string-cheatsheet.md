---
title:  "C++ String Cheatsheet"
excerpt: ""
# subtitle: " "
tag: "C/C++"
layout: post
toc: true
---

Source: [http://c.biancheng.net/view/400.html](http://c.biancheng.net/view/400.html)

Assume all the Variables like s* are declared as a string.

## **Constructors**

```cpp
string s1();  // si = ""
string s2("Hello");  // s2 = "Hello"
string s3(4, 'K');  // s3 = "KKKK"
string s4("12345", 1, 3);  //s4 = "234"，即 "12345" 的从下标 1 开始，长度为 3 的子串

// Wrong!
// string s1('K');
// string s2(123);
```

## **Assignment**

```cpp
s1 = "Hello";  // s1 = "Hello"  (const char *)
s2 = 'K';      // s2 = "K"          (const char)

string s1("12345"), s2;
s3.assign(s1);             // s3 = s1
s2.assign(s1, 1, 2);       // s2 = "23"，即 s1 的子串(1, 2)
s2.assign(4, 'K');         // s2 = "KKKK"
s2.assign("abcde", 2, 3);  // s2 = "cde"，即 "abcde" 的子串(2, 3)
```

## **Length / Size**

```cpp
s1.size();
s1.length();
```

## **Concatenating strings**

```cpp
string s1 = s2 + s3;
s1 += s4;
string s1("123"), s2("abc");
s1.append(s2);  // s1 = "123abc"
s1.append(s2, 1, 2);  // s1 = "123abcbc"
s1.append(3, 'K');  // s1 = "123abcbcKKK"
s1.append("ABCDE", 2, 3);  // s1 = "123abcbcKKKCDE"，添加 "ABCDE" 的子串(2, 3)
```

## **Comparing strings**

```cpp
s1 >= s2; s1 != s2; s1 > s2;
string s1("hello"), s2("hello, world");
int n = s1.compare(s2);
n = s1.compare(1, 2, s2, 0, 3);  //比较s1的子串 (1,2) 和s2的子串 (0,3)
n = s1.compare(0, 2, s2);  // 比较s1的子串 (0,2) 和 s2
n = s1.compare("Hello");
n = s1.compare(1, 2, "Hello");  //比较 s1 的子串(1,2)和"Hello"
n = s1.compare(1, 2, "Hello", 1, 2);  //比较 s1 的子串(1,2)和 "Hello" 的子串(1,2)
```

## **Finding substrings**

```cpp
string s1 = "this is ok";
string s2 = s1.substr(2, 4);  // s2 = "is i"
s2 = s1.substr(2);  // s2 = "is is ok"
```

## **Exchanging two strings**

```cpp
string s1("West"), s2("East");
s1.swap(s2);  // s1 = "East"，s2 = "West"
```

## **Searching, indexing substrings and chars**

```cpp
string s1("Source Code");
s1.find('u')            != string::npos // out 2
s1.find("Source", 3)    != string::npos // search start from 3, out npos
s1.find("Co")           != string::npos // out 7
s1.find_first_of("ceo") != string::npos // first of 'c', 'e', or 'o', out 1
s1.find_last_of('e')    != string::npos // last of 'e', out 10
s1.find_first_not_of("eou", 1) != string::npos // start from 1, out 3
```

## **Replacing, removing and inserting substrings**

```cpp
string s1("Real Steel");
s1.replace(1, 3, "123456", 2, 4);  //用 "123456" 的子串(2,4) 替换 s1 的子串(1,3) R3456 Steel
string s2("Harry Potter");
s2.replace(2, 3, 5, '0');  //用 5 个 '0' 替换子串(2,3) HaOOOOO Potter
s2.replace(s2.find("OOOOO"), 5, "XXX");  //将子串(n=2,5)替换为"XXX" HaXXX Potter

string s1("Real Steel");
s1.erase(1, 3);  //删除子串(1, 3)，此后 s1 = "R Steel"
s1.erase(5);  //删除下标5及其后面的所有字符，此后 s1 = "R Ste"

string s1("Limitless"), s2("00");
s1.insert(2, "123");  //在下标 2 处插入字符串"123"，s1 = "Li123mitless"
s1.insert(3, s2);  //在下标 2 处插入 s2 , s1 = "Li10023mitless"
s1.insert(3, 5, 'X');  //在下标 3 处插入 5 个 'X'，s1 = "Li1XXXXX0023mitless"
```

## **Handling string streams**

```cpp
string src("Avatar 123 5.2 Titanic K");
istringstream istrStream(src); //建立src到istrStream的联系
string s1, s2; int n;  double d;  char c;
istrStream >> s1 >> n >> d >> s2 >> c; // split by whitespace ' '
ostringstream ostrStream;
ostrStream << s1 << ' ' << s2 << ' ' << n << ' ' << d << ' ' << c <<' ';
ostrStream.str();  // "Avatar 123 5.2 Titanic K"
```

## **Using STL algorithm**

```cpp
string s("afgcbed");
string::iterator p = find(s.begin(), s.end(), 'c');
if (p != s.end())
    cout << p - s.begin() << endl;  //输出 3
sort(s.begin(), s.end());
cout << s << endl;  //输出 abcdefg
next_permutation(s.begin(), s.end());
cout << s << endl; //输出 abcdegf
```
