Now I am going to embed another service, this time spring-cloud-config, so the services can get their configuration 
from a remote, centralized service.

### Server

* Add dependency management for spring cloud

```xml
<properties>
    <spring-cloud.version>Dalston.SR1</spring-cloud.version>
</properties>
```
```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-dependencies</artifactId>
            <version>${spring-cloud.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

* Include dependencies for the server

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>
```

* Enable the server

```java
@EnableConfigServer
@SpringBootApplication
public class CentralApp
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(CentralApp.class).run(args);
    }
}
```

* And configure it (note that we change to path from `/` to `/cloud`, to avoid errors with the eureka dashboard)

```yml
# Cloud config
# Configures properties directory, by default it uses git, but can be classpath:.., file://...
spring.cloud.config.server.git.uri: classpath:/config
# Avoids clashing with Eureka
spring.cloud.config.server.prefix: cloud
spring.profiles.active: native
```

**NOTE** By default this service is expected on port 8888.

### Client

* Include dependencies (requires access to the dependency management too)

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
```

* Configure cloud service

Since this service will be loaded BEFORE the service itself, it uses a different configuration file: `bootstrap.yml` 
(as usual, regular property files can be used too). The security config is in place in case spring security is in the
classpath.

```yml
spring:
    application.name: demo
    profiles.active: defaults
    cloud.config:
        uri: http://localhost:8761/cloud
        username: root
        password: s3cr3t
        server.prefix: cloud
```
