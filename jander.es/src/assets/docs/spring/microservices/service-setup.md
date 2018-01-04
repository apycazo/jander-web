This section describes the maven configuration for each specific project.

### Service dependencies

* **Spring boot web starter**

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

* **Spring boot actuator starter**: Production-ready administration endpoints

**NOTE**: Many other services, like eureka or cloud config make use of this one.
   
```xml
<dependency>
   <groupId>org.springframework.boot</groupId>
   <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

Initial dev configuration:
```yaml
management.contextPath: /
management.security.enabled: false
endpoints.enabled: true

info:
    application: ${spring.application.name}
    instanceId: ${random.uuid}
```

* **Apache HTTP clients**: Replaces java default http services on rest templates.

```xml
<dependencies>
    <!-- HTTP client -->
    <dependency>
        <groupId>org.apache.httpcomponents</groupId>
        <artifactId>httpclient</artifactId>
    </dependency>
    <!-- HTTP async client -->
    <dependency>
        <groupId>org.apache.httpcomponents</groupId>
        <artifactId>httpasyncclient</artifactId>
    </dependency>
</dependencies>
```

* **Feign**: Declarative rest client

```xml
<!-- Feign client -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>
```

Note that the service using feign clients must enable them (on the top package):
```java
@EnableFeignClients
@SpringBootApplication
public class NimbusDemoApp
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(NimbusDemoApp.class)
                .properties("sun.misc.URLClassPath.disableJarChecking=true")
                .run(args);
    }
}
```

* **Git commit ID**: If you are using git, this will create a git info file (will be used by `spring-actuator`)

```xml
<plugin>
    <groupId>pl.project13.maven</groupId>
    <artifactId>git-commit-id-plugin</artifactId>
    <version>${git-commit.version}</version>
</plugin>
```

* **Spring boot Maven builder**: To generate a custom artifact, use this dependency:

```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
    <!-- Add service script -->
    <configuration>
        <executable>true</executable>
    </configuration>
    <!-- Create a fat jar -->
    <executions>
        <execution>
            <goals>
                <goal>build-info</goal>
                <goal>repackage</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
This will do three things:
* Create a fat-jar, with all dependencies included.
* Insert information about the build (to be used by the `spring-actuator` module)
* Create an embedded service script on the jar file, so it can be used as a service out of the box.

### Initial configuration

An example of a customized application properties file would look like this in `yaml`:

```yml
spring.application.name: service-name
logging.file: logs/${spring.application.name}.log
logging.level: INFO
server.port: 8080
# if security is in the classpath, but want it disabled
# security.basic.enabled: false
```

