Right now you can get the Eureka dashboard at `http://localhost:8761`, but if actuator is present on the client, you
can get a more detailed dashboard. Here I am going to run it along with the Eureka server, instead of a stand alone
service.

* Add server dependencies:

```xml
<properties>
    <spring-admin.version>1.5.1</spring-admin.version>
</properties>
```

```xml
<dependencies>
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-server</artifactId>
        <version>${spring-admin.version}</version>
    </dependency>
    <dependency>
        <groupId>de.codecentric</groupId>
        <artifactId>spring-boot-admin-server-ui</artifactId>
        <version>${spring-admin.version}</version>
    </dependency>
</dependencies>
```

* Enable service 

Note that this requires an eureka discovery client to be active too.

```java
@EnableAdminServer
@EnableEurekaServer
@EnableDiscoveryClient
@SpringBootApplication
public class NimbusCentralApp
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(NimbusCentralApp.class).run(args);
    }
}
```

* Configure the dashboard not to clash with eureka:

```yml
spring.boot.admin.contextPath: /admin
```