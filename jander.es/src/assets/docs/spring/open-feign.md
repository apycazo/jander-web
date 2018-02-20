## Introduction
---

Feign is a framework to generate http clients automatically just by providing an annotated interface. Spring has an integration with feign, but here we are going to use the default, manual way to implement a rest client.

## Dependencies
---

Feign requires a few dependencies besides its core, and some of them might seem as duplicates, but are actually the feign wrappers over several thrird party libraries.

First, we need to include in maven the feign core application

```xml
<dependency>
    <groupId>com.netflix.feign</groupId>
    <artifactId>feign-core</artifactId>
    <version>${feign-core.version}</version>
</dependency>
```

Next, we need three more things, the logging library, the json serializer and the actual http client implementation. To include the logging we will add:

```xml
<dependency>
    <groupId>com.netflix.feign</groupId>
    <artifactId>feign-slf4j</artifactId>
    <version>${feign-core.version}</version>
</dependency>
```

As a serializer we will include jackson:

```xml
<dependency>
    <groupId>com.netflix.feign</groupId>
    <artifactId>feign-jackson</artifactId>
    <version>${feign-core.version}</version>
</dependency>
```

And as the http client we will include okhttp

```xml
<dependency>
    <groupId>com.netflix.feign</groupId>
    <artifactId>feign-okhttp</artifactId>
    <version>${feign-core.version}</version>
</dependency>
```

## Declaring the service interface
---

To begin, we need to create an interface representing the rest service we want to generate, for example, for a basic GET/POST test service using the service provided by https://httpbin.org/:

```java
public interface HttpBinService
{
    @RequestLine("GET /get?testName={testName}")
    Map<String,Object> getRequestInfo (@Param("testName") String testName);

    @RequestLine("POST /post?testName={testName}")
    @Headers("Content-Type: application/json")
    Map<String,Object> sendRequestInfo (@Param("testName") String testName, Info info);
}
```

## Creating the implementation
---

We can create an implementation for the service above using feign like this:

```java
HttpBinService httpBinService = Feign
    .builder()
    .encoder(new JacksonEncoder())
    .decoder(new JacksonDecoder())
    .logger(new Slf4jLogger())
    .client(new OkHttpClient())
    .target(HttpBinService.class, "https://httpbin.org");
```

