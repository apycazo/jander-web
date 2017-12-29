# Docker

## Command samples

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-yw4l">**Outcome**</th>
    <th class="tg-yw4l">**Command**</th>
  </tr>
  <tr>
    <td class="tg-yw4l">Pull &amp; run hello world, delete when done</td>
    <td class="tg-yw4l">docker run -it --rm hello-world</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Pull alpine, save it as 'ubuntu-demo' and run bash</td>
    <td class="tg-yw4l">docker run -it --name ubuntu-demo ubuntu bash</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Build docker file, and tag it as test</td>
    <td class="tg-yw4l">docker build -t test .</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Start existing ubuntu-demo container</td>
    <td class="tg-yw4l">docker start ubuntu-demo</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Bash into existing ubuntu-demo container</td>
    <td class="tg-yw4l">docker exec -it ubuntu-demo bash</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Start a dockerized redis service in the background</td>
    <td class="tg-yw4l">docker run --name redis-service -d redis</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Stop running redis service</td>
    <td class="tg-yw4l">docker stop redis-service</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Start mysql service and bind port</td>
    <td class="tg-yw4l">docker run --name mysql-service -p 3306:3306 -d mysql</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Start existing and attach</td>
    <td class="tg-yw4l">docker start -ai mysql-service</td>
  </tr>
</table>

## Cleanup

```bash
$ docker rm $(docker ps -a -q)
$ docker rmi $(docker images -q -f dangling=true)
$ docker volume ls -q | xargs --no-run-if-empty docker volume rm
```

## Single-run container

*Note*: Option `--rm` deletes the container on exit (not compatible with `-d` option).

```bash
$ docker run --rm alpine ls -lF
total 52
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 bin/
drwxr-xr-x    5 root     root           340 Apr 28 06:21 dev/
drwxr-xr-x   14 root     root          4096 Apr 28 06:21 etc/
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 home/
drwxr-xr-x    5 root     root          4096 Mar  3 11:20 lib/
drwxr-xr-x    5 root     root          4096 Mar  3 11:20 media/
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 mnt/
dr-xr-xr-x  156 root     root             0 Apr 28 06:21 proc/
drwx------    2 root     root          4096 Mar  3 11:20 root/
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 run/
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 sbin/
drwxr-xr-x    2 root     root          4096 Mar  3 11:20 srv/
dr-xr-xr-x   13 root     root             0 Apr 28 06:21 sys/
drwxrwxrwt    2 root     root          4096 Mar  3 11:20 tmp/
drwxr-xr-x    7 root     root          4096 Mar  3 11:20 usr/
drwxr-xr-x   12 root     root          4096 Mar  3 11:20 var/
```

## Docker run common options

* **Detached (`-d`)**: Do not attach the console to the process. This option cannot be used with `--rm`.
* **Keep stdin open (`-i`)**: Keeps stdin open, even on detached mode.
* **Pseudo TTY (`-t`)**: Allocates a pseudo-TTY
* **Remove container (`--rm`)**: Remove the container when done.

*Note*: Use `-it` to allocate a tty to the container process.

## Command reference

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-yw4l">**Operation**</th>
    <th class="tg-yw4l">**Command**</th>
  </tr>
  <tr>
    <td class="tg-yw4l">Process list</td>
    <td class="tg-yw4l">docker ps</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Process list (all)</td>
    <td class="tg-yw4l">docker ps -a</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Image list</td>
    <td class="tg-yw4l">docker images -a</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Image pull</td>
    <td class="tg-yw4l">docker pull &lt;image&gt;:&lt;tab&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Run container in background</td>
    <td class="tg-yw4l">docker run -d &lt;tag&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Run on container</td>
    <td class="tg-yw4l">docker exec &lt;tag&gt;&lt;cmd&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Run on interactive tty</td>
    <td class="tg-yw4l">docker run -it &lt;tag&gt;&lt;cmd&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Run &amp; dispose container</td>
    <td class="tg-yw4l">docker run -it --rm &lt;tag&gt;&lt;cmd&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Stop all containers</td>
    <td class="tg-yw4l">docker stop $(docker ps -a -q)</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Kill all containers</td>
    <td class="tg-yw4l">docker kill $(docker ps -a -q)</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Remove all containers</td>
    <td class="tg-yw4l">docker rm $(docker ps -a -q)</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Remove image</td>
    <td class="tg-yw4l">docker rmi &lt;image&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Remove dangling images</td>
    <td class="tg-yw4l">docker rmi $(docker images -q -f dangling=true)</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Network list</td>
    <td class="tg-yw4l">docker network</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Network details (bridge)</td>
    <td class="tg-yw4l">docker network inspect bridge</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Build image with tags</td>
    <td class="tg-yw4l">docker build -t &lt;tag&gt; .</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Open bash terminal</td>
    <td class="tg-yw4l">docker exec -ti &lt;container_name&gt; /bin/bash</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Container logs</td>
    <td class="tg-yw4l">docker logs &lt;tag&gt;</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Container logs (+ tail)</td>
    <td class="tg-yw4l">docker logs -ft &lt;tag&gt;</td>
  </tr>
</table>

## Sample image Dockerfile

From https://github.com/apycazo/trivialis repository:

```
### ==========================================================================
### Docker image for the trivialis provider to run:
### $ mvn clean package && docker build -t trivialis/provider .
### $ docker run -d -p 8080:8080 --name trivialis-provider trivialis/provider
### ==========================================================================

# Use Centos as base layer
FROM centos
# Run system update
RUN yum -y upgrade
# Install openjdk
RUN yum -y install java-1.8.0-openjdk
# Open port
EXPOSE 8080
# Mount tmp volume on host
VOLUME /tmp
# Add jar file
ADD /target/trivialis-provider-1.0-SNAPSHOT.jar trivialis-provider.jar
# Update 'last modified' field
RUN sh -c 'touch /trivialis-provider.jar'
# On start command
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/trivialis-provider.jar"]
```

## Sample docker compose file

```
From https://github.com/apycazo/trivialis repository
# Full docker test:
# $ docker-compose up -d --build
# curl http://127.0.0.1:9101/users should be the same as curl http://127.0.0.1:9102/process

version: '2'

services:
    provider:
        build: ./trivialis-provider
        ports:
            - 9101:8080
    client:
        build:
            context: ./trivialis-client
            args:
                - provider_ip=provider
        ports:
            - 9102:8080
        links:
            - provider
```

## Docker compose with external build references

`docker-compose.yml`

```
# $ export BASE_PATH=/usr/local/test
# $ docker-compose up -d --build

version: "2"
services:
    test-service:
        build:
            context: ${BASE_PATH}/files
            dockerfile: ${BASE_PATH}/docker/Dockerfile
        image: test/service
        container_name: test-service
        ports:
            - 8080:8080
```

`.env`

```
BASE_PATH=/usr/local/test
```

## Network connect

Excerpt from docker documentation:


>Connect a running container to a network
>
>```bash
>$ docker network connect multi-host-network container1
>```
>

## Connect a container to a network when it starts

You can also use the `docker run --network=<network-name>`option to start a container and immediately connect it to a network.

```bash
$ docker run -itd --network=multi-host-network busybox
```

## Specify the IP address a container will use on a given network

You can specify the IP address you want to be assigned to the container’s interface:

```bash
$ docker network connect --ip 10.10.36.122 multi-host-network container2
```

## Volume Mount

Use parameter `-v <target>` to mount a volume on the container (this is equivalent to use `VOLUME` on the Dockerfile). An example:
`docker run -d -P --name web -v /webapp training/webapp python app.py`

*Note*: the `-P` option maps ports ensuring no conflicts

## To save a running container as an image

```
docker commit -m “commit message” -a “author” container_name username/image_name:tag
```

**A reduced form:**

```
docker commit <tag> <new name>
```

## Use windows cmder as a docker shell

*Note*: Requires having a bash shell (in this example, using the git-bash shell included as part of git-scm).

* Open 'setup tasks' (click on the right of the green 'plus' icon, or type win+alt+t.
* Click on the + button to add a new task.
* Give it whatever name you want (for example: `docker-sh`).
* On 'task parameters' enter the icon path to use, like: `/icon "C:\Program Files\Docker Toolbox\docker.exe"`.
* As commands, add the following (modify to use your own paths, if required): `"C:\Program Files\Git\bin\bash.exe" --login -i "C:\Program Files\Docker Toolbox\start.sh" "-new_console:d:C:\Program Files\Docker Toolbox"`

## Mounting volumes along with SELinux

When a container is deployed on a Linux host with SELinux active, volumes should be mounted attaching the option `:z` so docker can tell SELinux to allow linking. So a volume might look like this:

```
volumes:
    - /volumes/data:/var/data:z
```

## Proxy settings

* Edit or create file (directory too): `/etc/systemd/system/docker.service.d/http-proxy.conf`

```
[Service]
Environment="HTTP_PROXY=http://<user>:<pass>@<proxy_url>:<port>/"
Environment="NO_PROXY=127.0.0.1,localhost,192.168.*"
```

* Reload daemon: `$ sudo systemctl daemon-reload`
* Reload service: `$ systemctl restart docker`
* Check environment: `$ systemctl show --property=Environment docker`

## Compose with container volumes

### Create volume container (Dockerfile)

```
# Pull base image
FROM ubuntu:16.04
# Create config directory
RUN mkdir /data
# Create shared volumes
VOLUME /data
```

### Container service (docker-compose.yml)

```
version: "2.1"
services:
  data-store:
    image: datastore
    container_name: data-store
    command: 
      - /bin/true
    networks:
      - datanetwork
networks:
  datanetwork:
    ipam:
      driver: default
      config:
        - subnet: 172.28.0.0/16
```

### Container usage (docker-compose.yml, sample service)

```
version: "2.1"
services:
  myservice:
    image: myservice
    container_name: myservice-container
    volumes_from:
      - container:data-store
    networks:
      - dockercomposedata_datanetwork
    ports:
      - "8080:8080"
    external_links:
     - data-store
networks:
  dockercomposedata_datanetwork:
    external: true
```