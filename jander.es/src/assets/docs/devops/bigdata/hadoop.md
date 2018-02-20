To install Hadoop, just download the binaries from http://hadoop.apache.org/releases.html, and prepare a directory for the installation, for example: `/usr/lib/bigdata/apps`, and uncompress with `tar -zcvf hadoop-3.0.0.tar.gz`. This will leave things like this:

```bash
$ pwd
/usr/local/bigdata/apps
$ ls
hadoop-3.0.0  hadoop-3.0.0.tar.gz
```

We will use the following directory structure:

```bash
/usr/local/bigdata
+--- /apps
|    \---- hadoop-3.0.0
+--- /store
     +---- namenode
     \---- datanode
```

Now we will add the Hadoop binaries to the system path. For this, edit the user home `bashrc`, and include the path like this:

```bash
# Java HOME path
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.fc27.x86_64/

# Hadoop HOME path
export HADOOP_HOME=/usr/local/bigdata/apps/hadoop-3.0.0
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH
```

To apply changes for the current terminal (if we are using one) we can use the command `source ~/.bashrc`, or close and reopen the terminal.

This will let you start both the hdfs filesystem and yarn (which is included with hadoop). Before starting anything, we need to configure our installation. First we will need to edit file `$HADOOP_HOME/etc/hadoop/core-site.xml` to define the default FS:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<configuration>
    <!-- donde se localiza el servicio de hdfs -->
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

Next we edit the hdfs config file `$HADOOP_HOME/etc/hadoop/hdfs-site.xml`. Here we will configure the following:

* The replication factor: Since we only want to use a single machine, we leave this as '1'.
* The default block size: This value will be used to split files into blocks. Must be a multiple of 512.
* The namenode data directory: Where should the name node store its data.
* The datanode data directory: Same thing, for our (single) datanode.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<!-- Put site-specific property overrides in this file. -->
<configuration>
    <!-- factor de replicacion de hdfs (default: 3) -->
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <!-- tamaño de bloque de hdfs (afecta al rendimiento, en bytes, multiplo de 512) -->
    <property>
        <name>dfs.blocksize</name>
        <!-- 64 MB -->
        <value>67108864</value>
    </property>
    <!-- directorio de datos del namenode -->
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>/usr/local/bigdata/store/namenode</value>
    </property>
    <!-- directorio de datos del datanode -->
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>/usr/local/bigdata/store/datanode</value>
    </property>
</configuration>
```

Now, to allow the datanode and namenode to connect, we will generate out local keys and export the ssh key generated with the commands:

```bash
ssh-keygen
ssh-copy-id localhost
```

The last thing we need to do to have our hadoop installation ready is to initialize our namenode:

```bash
hadoop namenode -format
```

And either run `start-dfs.sh` to start the filesystem or `stop-dfs.sh` to stop it. If you see the following errors, it means that the ssh service is not running:

```bash
$ start-dfs.sh 
Starting namenodes on [localhost]
localhost: ssh: connect to host localhost port 22: Connection refused
Starting datanodes
localhost: ssh: connect to host localhost port 22: Connection refused
Starting secondary namenodes [devbox]
devbox: ssh: connect to host devbox port 22: Connection refused
```

So you need to start it first: 

```bash
sudo systemctl start sshd
```

And then everything should work just fine:

```bash
$ start-dfs.sh 
Starting namenodes on [localhost]
Starting datanodes
Starting secondary namenodes [devbox]
```

We can check that the processes are running with:

```bash
$ jps -l
3248 org.apache.hadoop.hdfs.server.namenode.NameNode
3733 sun.tools.jps.Jps
3528 org.apache.hadoop.hdfs.server.namenode.SecondaryNameNode
3352 org.apache.hadoop.hdfs.server.datanode.DataNode
```

Or inside a web browser checking url `http://localhost:9870/dfshealth.html#tab-overview` (notice that older releases uses port `50070` instead).

Now just create your user home directory inside hdfs with:

```bash
hdfs dfs -mkdir -p /user/$(whoami)
```

And everthing should be up and running!.




