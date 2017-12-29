# Linux Bash Shell

## FTP commands

### Establish connection

```bash
ftp user@ftpdomain.com
```

### Set local destination

```bash
lcd <targetPath>
```

### Download file

**Without wildcards**

```bash
get <remoteFilePath>
```

**With wildcards**

```bash
mget <remoteFilePath>
```

### Upload file

```bash
put <localFilePath>
```

## LFTP (for explicit TLS over ftp)

* **Disable certificate check**: `set ssl:verify-certificate no`
* **Connection**: `lftp -du user,pass ftp.host.com`

## Test page status code with curl

```bash
$ [ 200 -eq `curl -skL https://www.google.es -w "%{http_code}" -o /dev/null` ]
```

*Note*: Option -k is to allow for self-signed https certificates.

## Proxy

Edit `~/.curlrc`

```
proxy = {user}:{pass}@{proxy-host}:{port}
```

## Get last command status code

```bash
$ ls
$ echo $?
```

## Conditionals

**Sample if-then-else structure**

```bash
#!/bin/bash
if [ "foo" = "foo" ]; then
   echo 'ok'
else
   echo 'error!'
fi
```

**With number comparison**

```bash
#!/bin/bash
if [ 200 -eq $1 ]; then
   echo 'number matches'
else
   echo 'number does not match!'
fi
```

## Sed replace lines containing text

**Given file 'test.txt':**
```
this is line one
this line is my_target to replace
this is another line
```

**Running:**
`sed -i '/my_target/c\REMOVED LINE' test.txt`

**Expect:**

```
this is line one
REMOVED LINE
this is another line
```

## Extract components from a string

For example, from a file name:

```bash
filename=$(basename "$fullfile")
extension="${filename##*.}"
filename="${filename%.*}"
```