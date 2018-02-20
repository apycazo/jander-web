Next we will configure our yarn installation (which along with hadoop, so we don't need to install anything else). Yarn is a resource allocator that will manage how resources are shared among our map-reduce jobs.

Edit or create file `$HADOOP_HOME/etc/hadoop/mapred-site.xml` (might be present as `mapred-site.xml.template`, in this case we might just copy and rename the file).

```xml
<?xml version="1.0"?>
<?xml-stylesheet type="text/xsl" href="configuration.xsl"?>

<configuration>

    <!-- configure how the nodemanages share info -->
    <property>
        <name>yarn.nodemanager.aux-services</name>
        <value>mapreduce_shuffle</value>
    </property>

    <!-- if the machine swap memory is less than the physical we will get an error, so we can disable this check -->
    <property>
        <name>yarn.nodemanager.vmem-check-enabled</name>
        <value>false</value>
    </property>

    <!-- (optional) limit number of cpus (default: 8) -->
    <!--
    <property>
        <name>yarn.nodemanager.resource.cpu-vcores</name>
        <value>2</value>
    </property>
    -->

    <!-- (optional) Limit container memory (at least 2GB+) -->
    <!--
    <property>
        <name>yarn.nodemanager.resource.memory-mb</name>
        <value>3072</value>
    </property>
    -->
</configuration>
```

Now we can start yarn and check all processes are running:

```bash
$ start-yarn.sh 
Starting resourcemanager
Starting nodemanagers

$ jps -l
3248 org.apache.hadoop.hdfs.server.namenode.NameNode
4593 org.apache.hadoop.yarn.server.nodemanager.NodeManager
3528 org.apache.hadoop.hdfs.server.namenode.SecondaryNameNode
3352 org.apache.hadoop.hdfs.server.datanode.DataNode
4924 sun.tools.jps.Jps
4495 org.apache.hadoop.yarn.server.resourcemanager.ResourceManager
```

As with hdfs, yarn also has a web interface to check: http://localhost:8088/cluster.

