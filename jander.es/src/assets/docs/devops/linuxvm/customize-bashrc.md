This is my customized bashrc. Some of it is shared among all users (/etc/bashrc), and some is specific of each one (~/.bashrc)

**File**: `/etc/bashrc`

```bash
gitBranch () {
    git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/(\1)/'
}

red_bash="\[$(tput bold)\]\[$(tput setaf 1)\]\u@\h \[$(tput setaf 7)\][\W] \[$(tput setaf 3)\]\$(gitBranch) \[$(tput setaf 1)\]\\n\\$ \[$(tput sgr0)\]\[$(tput sgr0)\]"
green_bash="\[$(tput bold)\]\[$(tput setaf 2)\]\u@\h \[$(tput setaf 7)\][\W] \[$(tput setaf 3)\]\$(gitBranch) \[$(tput setaf 2)\]\\n\\$ \[$(tput sgr0)\]\[$(tput sgr0)\]"
gold_bash="\[$(tput bold)\]\[$(tput setaf 3)\]\u@\h \[$(tput setaf 7)\][\W] \[$(tput setaf 7)\]\$(gitBranch) \[$(tput setaf 3)\]\\n\\$ \[$(tput sgr0)\]\[$(tput sgr0)\]"
```

**File**: `~/.bashrc` (regular user)

```bash
# User specific aliases and functions
export PS1=$green_bash
```

**File**: `/root/.bashrc` (root user)

```bash
# User specific aliases and functions
export PS1=$red_bash
```