---
title:  "Setting up Oh My Zsh"
excerpt: "Just getting started with `Zsh`."
# subtitle: " "
tag: "Linux"
layout: post
toc: true
---

This tutorial follows [GeekHour's Guide](https://www.geekhour.net/2023/10/21/linux-terminal/).

## Install Zsh

First we should set up `Zsh` as our default shell.

```bash
$ cat /etc/shells
...
/bin/zsh
```

If you see the `zsh` in your results, then you can skip this step.

Otherwise, install `zsh` with `yum`, `apt`, etc.

## Install Fonts (Optional)

Oh My Zsh recommends several fonts to appear perfectly, but sadly looks like I am not familiar with these fonts and feel uncomfortable so I decieded to skip this step.

Following the [ReadMe page](https://github.com/romkatv/powerlevel10k#fonts) of theme Powerlevel10k that we are going to use, you can decide whether to install them or not. They provides better experience for `Oh My Zsh` users (More fancy UI I think).

I am continuing using the Microsoft's Terminal's default choice `Cascadia Mono`.

## Install Oh My Zsh

Either install directly from their repo

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Or when you needs mirror...

```bash
wget https://gitee.com/mirrors/oh-my-zsh/raw/master/tools/install.sh
chmod +x install.sh
```

but updates the repo's places before executing the script.

In `install.sh`:

```text
# Default settings
ZSH=${ZSH:-~/.oh-my-zsh}
REPO=${REPO:-ohmyzsh/ohmyzsh} -> REPO=${REPO:-mirrors/oh-my-zsh}
REMOTE=${REMOTE:-https://github.com/${REPO}.git} -> REMOTE=${REMOTE:-https://gitee.com/${REPO}.git}
BRANCH=${BRANCH:-master}
```

Then execute the script to install Oh My Zsh.

Run `exec zsh` to start the `zsh` shell.


## Setting up the Powerlevel10k and Other Plugins

First clone their repos to local.

```zsh
# powerlevel10k theme
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/themes/powerlevel10k
# zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions
# zsh-syntax-highlighting
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Then write them into the `.zshrc` file.

```bash
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

Edit `.zshrc` again to add plugins.

```text
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

Restart `zsh` to set up the theme.

You can further adjust what to enable in `.p10k.zsh` file.

Hope you will enjoy it!
