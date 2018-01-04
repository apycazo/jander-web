### MongoDB

**Installation**
```bash
$ sudo dnf install -y mongodb mongodb-server 
```

**Start service**
```bash
$ sudo systemctl start mongod
```

### Mysql (MariaDB)

**Installation**
```bash
$ sudo dnf install -y mysql-server
```

**Initial setup**
```bash
$ mysql_secure_installation
```

**Start service**
```bash
$ sudo systemctl start mariadb
```

### NodeJS

To install latest version instead of default stable:

```bash
curl -sL https://rpm.nodesource.com/setup_8.x | bash -
dnf install -y nodejs
```

### Postman 

**Installation**
```bash
wget https://dl.pstmn.io/download/latest/linux64 -O postman.tar.gz
sudo tar -xzf postman.tar.gz -C /opt
rm postman.tar.gz
sudo ln -s /opt/Postman/Postman /usr/bin/postman
```

**Create icon under XFCE**

```bash
cat > ~/.local/share/applications/postman.desktop <<EOL
[Desktop Entry]
Encoding=UTF-8
Name=Postman
Exec=postman
Icon=/opt/Postman/resources/app/assets/icon.png
Terminal=false
Type=Application
Categories=Development;
EOL
```