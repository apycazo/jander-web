The recommended packages for a development installation (taking fedora as an example). Note that some of this requires rebooting.

**Run as system update**
```bash
sudo dnf update -y;
```

**Install kernel-devel (reboot after this one)**

This is required for virtualbox guest tools.

```bash
sudo dnf install -y kernel-devel-$(uname -r);
```

**Install development tools (group install)**

```bash
sudo dnf install -y @development-tools;
```

**Some additional packages**

```bash
sudo dnf install -y vim dkms tmux ImageMagick pinta chromium filezilla firefox lftp;
```

**Java JDK**

```bash
sudo dnf install -y java-1.8.0-openjdk nodejs maven;
```
