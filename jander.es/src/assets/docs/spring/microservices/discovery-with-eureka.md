The microservice support framework should consist of the following:

* Discovery server/client (Eureka)
* Configuration service (Cloud config)
* Logs & management (Sleuth & Zipkin)

Since I don't want to deploy three different services I am going to mix them a little inside a spring boot project.

### Server

You will need the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka-server</artifactId>
    </dependency>
</dependencies>
```

And enable the client in the configuration:

```java
@EnableEurekaServer
@SpringBootApplication
public class App
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(App.class)
                .properties("sun.misc.URLClassPath.disableJarChecking=true")
                .run(args);
    }
}
```

Configure the client (inside applications properties)
```yml
eureka:
    environment: deployment
    datacenter: local
    server:
        eviction-interval-timer-in-ms: 5000
        # for single node only
        enableSelfPreservation: false
    client:
        registerWithEureka: false
        serviceUrl.defaultZone: http://${eureka.instance.hostname:localhost}:${server.port}/eureka/
```

### Client

You will need the following dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-eureka</artifactId>
    </dependency>
</dependencies>
```

And enable the service in the configuration:

```java
@EnableDiscoveryClient
@SpringBootApplication
public class CentralApp
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(CentralApp.class).run(args);
    }
}
```

Configure the client instance (inside applications properties):

```yml
eureka.instance:
    preferIpAddress: true
    statusPageUrlPath: ${management.contextPath:/}info
    healthCheckUrlPath: ${management.contextPath:/}health
    # To setup a custom id
    # instanceId: ${spring.application.name}-${random.uuid}
    metadataMap.servicePath: ${nimbus.mapping:/data}
    leaseRenewalIntervalInSeconds: 30
    leaseExpirationDurationInSeconds: 30
```

