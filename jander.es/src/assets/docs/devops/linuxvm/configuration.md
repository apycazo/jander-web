### Change system hostname

```bash
hostnamectl status
hostnamectl set-hostname --static “sandbox”
```

### Run a distro upgrade

```bash
sudo dnf upgrade --refresh
sudo dnf install dnf-plugin-system-upgrade
sudo dnf system-upgrade download --refresh --releasever=24
sudo dnf system-upgrade reboot
```

**Note**: After upgrade, clean packages with command `sudo dnf clean packages`

### SELinux

To temporarily disable, run command:

```bash
sudo setenforce 0
```

Or edit config:

```bash
sudo sed -i ‘s/enforcing/disabled/g’ /etc/selinux/config
```

### Epel repositories

```bash
sudo dnf -y install epel-release
```

### Change `/tmpfs` size

Temporarily:

```bash
sudo mount -o remount,size=3G tmpfs /tmp/
```

Permanently, edit `/etc/fstab` to include:

```config
tmpfs                   /dev/shm                tmpfs   size=3g        0 0
```

### Install additional desktops

Any of these can be used:

```bash
sudo dnf install @kde-desktop
sudo dnf install @mate-desktop
sudo dnf install @xfce-desktop
sudo dnf install @lxde-desktop
sudo dnf install @cinnamon-desktop
```

### Configure Vim

Edit `/.vimrc` for current user, or `/etc/vim/vimrc` for all users, and include:

```properties
set tabstop=4 softtabstop=0 noexpandtab shiftwidth=4
```



### Avoid Gnome graphical password requirement

If this becomes annoying, including the following in a `bashrc` config file will switch to a text-based password input

```bash
unset SSH_ASKPASS
```

### Configure proxy

#### Defaults

Default proxy settings can be added to `/etc/profile` like:

```bash
MY_PROXY_URL="http://my.proxy:8080/"
HTTP_PROXY=$MY_PROXY_URL
HTTPS_PROXY=$MY_PROXY_URL
FTP_PROXY=$MY_PROXY_URL
http_proxy=$MY_PROXY_URL
https_proxy=$MY_PROXY_URL
ftp_proxy=$MY_PROXY_URL

export HTTP_PROXY HTTPS_PROXY FTP_PROXY http_proxy https_proxy ftp_proxy
```

To enforce changes in current terminal without restarting it:

```bash
source /etc/profile
```

#### Dnf/Yum proxy

Edit either `/etc/dnf/dnf.conf` or `/etc/yum/yum.conf` and include:

```bash
proxy=http://my.proxy:8080/
```

#### Wget

Edit `/etc//etc/wgetrc`

```bash
http_proxy = http://my.proxy:8080/
https_proxy = http://my.proxy:8080/
ftp_proxy = http://my.proxy:8080/
```

