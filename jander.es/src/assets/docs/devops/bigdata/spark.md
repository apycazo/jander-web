We can download Spark from: https://spark.apache.org/downloads.html, taking into account the Hadoop version we have installed. As usual, we set up the home and export system path:

```bash
# Java HOME path
export JAVA_HOME=/usr/lib/jvm/java-1.8.0-openjdk-1.8.0.151-1.b12.fc27.x86_64/

# Hadoop HOME path
export HADOOP_HOME=/usr/local/bigdata/apps/hadoop-3.0.0
export PATH=$HADOOP_HOME/bin:$HADOOP_HOME/sbin:$PATH

# Apache Hive HOME path
export HIVE_HOME=/usr/local/bigdata/apps/apache-hive-2.3.2-bin
export PATH=$HIVE_HOME/bin:$PATH

# Apache Derby HOME path
export DERBY_HOME=/usr/local/bigdata/apps/db-derby-10.14.1.0-bin
export PATH=$DERBY_HOME/bin:$PATH

# Apache Spark HOME path
export SPARK_HOME=/usr/local/bigdata/apps/spark-2.2.1-bin-hadoop2.7/
export PATH=$SPARK_HOME/bin:$PATH
```

*Remember to apply changes on current terminal with `source ~/.bashrc`*.

If we run a job command like `spark-submit --master local[*] job.py`, note that the `--master` flag will start a Spark instance for us, since we are not specifying any.

From here on, we can do the following:

* Start master: `start-master.sh`
* Register new slave: `start-slave.sh -m 1G spark://192.168.2.129:7077`
* Check slaves on master: Access URL http://192.168.2.129:8080/ in a web browser.
* Send job to remote master: `spark-submit --master spark://192.168.2.129:7077`
