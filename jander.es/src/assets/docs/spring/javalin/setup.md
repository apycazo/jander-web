Javalin is a lightweight framework to create rest services, which comes in handy when a regular spring app might be a bit complex or heavy for the task.

Sources for a sample project can be found <a class="btn btn-sm btn-primary" href="https://github.com/apycazo/jander-javalin" target="_blank">Here</a>

We are going to create a very simple service, to serve as a starting point to create more complex APIs. Using maven we are going to need the following dependencies:

```xml
<dependency>
    <groupId>io.javalin</groupId>
    <artifactId>javalin</artifactId>
    <version>${javalin.version}</version>
</dependency>
<dependency>
    <groupId>org.slf4j</groupId>
    <artifactId>slf4j-simple</artifactId>
    <version>${slf4j-simple.version}</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>${jackson-databind.version}</version>
</dependency>
```

Even though `javalin` is the main dependency, you will need `jackson` to use json, and some log implementation (in this case I am using slf4j, but any other should work).

Also, to make sure the build works (remember that at least java 8 is required), I use the following plugin to make sure to build is successful:

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>${plugin.maven.compiler.version}</version>
    <configuration>
        <source>${java.version}</source>
        <target>${java.version}</target>
    </configuration>
</plugin>
```

### Main app class

To initialize the application, we just need to create a Javalin instance and include some routes to manage. By default javalin uses port 7000, but we can pass several options, including the port we want to use. A very simple app, listening on port 8080 and returning the current date:

```java
import io.javalin.Context;
import io.javalin.Javalin;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;

import static io.javalin.ApiBuilder.*;

public class App
{
    private static final Logger log = LoggerFactory.getLogger(App.class);

    private static void getDate (Context ctx)
    {
        SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
        ctx.result(formatter.format(Date.from(Instant.now())));
    }

    public static void main(String[] args)
    {
        Javalin.create()
                .port(8080)
                .routes(() -> {
                    path("/", () -> {
                        get(App::getDate);
                    });                    
                })
                .start();
    }
}
```

### Maven pom.xml

The most basic pom.xml file contains:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>es.jander</groupId>
    <artifactId>javalin-service</artifactId>
    <version>1.0-SNAPSHOT</version>

    <properties>
        <java.version>1.8</java.version>
        <plugin.maven.compiler.version>3.7.0</plugin.maven.compiler.version>
        <javalin.version>1.2.0</javalin.version>
        <slf4j-simple.version>1.7.25</slf4j-simple.version>
        <jackson-databind.version>2.9.3</jackson-databind.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>io.javalin</groupId>
            <artifactId>javalin</artifactId>
            <version>${javalin.version}</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-simple</artifactId>
            <version>${slf4j-simple.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson-databind.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>${plugin.maven.compiler.version}</version>
                <configuration>
                    <source>${java.version}</source>
                    <target>${java.version}</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### Some configuration methods

In the javalin constructor we can call several configuration methods which ca be very useful:

Method | Usage
------ | -----
port(int)   | Sets the port to use
enableStandardRequestLogging() | Will log the received requests
enableStaticFiles(string) | Gets a path to be server as static files