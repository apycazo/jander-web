### Introduction

Feign has integration with Spring, and some annotations can be different, find below the same example done previously with OpenFeign using the Spring framework. 

The main differences are the service interface annotations, where you can use the standard Spring Rest ones, and the client instances, that will be created by Spring as usual.

To begin using Feign with spring include the dependency:

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-feign</artifactId>
</dependency>
```

### Enable Feign clients

This annotation tells Spring to find interfaces annotated with `@FeignClient` and instance the clients for us. This can be included in any `@Configuration` class, for example:

```java
@EnableFeignClients
@SpringBootApplication
public class App
{
    public static void main(String[] args)
    {
        new SpringApplicationBuilder(App.class).build().run();
    }
}
```

### Feign client interface

Compare the following interface with the one created with OpenFeign directly (Note that either 'value' or 'name' are required).

```java
@FeignClient(value = "httpbin", url = "https://httpbin.org/")
public interface HttpBinClient
{
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @Headers("Content-Type: application/json")
    String getRequestInfo (@RequestParam(value = "param") String param);

    @RequestMapping(value = "post", method = RequestMethod.POST)
    @Headers("Content-Type: application/json")
    String sendRequestInfo(@RequestBody String content);
}
```

### Feign clients with Eureka

If Eureka client is being used, we can replace the URL line with just the service name, and Feign will locate the service through the Eureka registry:

```java
@FeignClient("quotes-svc")
public interface QuotesClient
{
    @GetMapping("/quotes")
    List<String> getQuotes ();
}
```