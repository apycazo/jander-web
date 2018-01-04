This section describes the maven configuration to setup the project (for a bill-of-materials pom, also called 'BOM').

### Maven project parent 

This POM file will keep control of dependency versions, spring boot parent and makes sure some 
elements are readily available for all other components.

For this, include as a parent the latest spring-boot parent:

```xml
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>1.5.4.RELEASE</version>
    <!-- Setting this to empty eliminates a problem with the aggregator -->
    <relativePath/>
</parent>
```

**Note**: Setting an empty relative path for the parent. This helps to prevent a few warnings.

### Dependency management

Since I will be using the Netflix OSS stack, I include the dependencies required in the management section.
This makes sure the netflix components are available for the other components where required. The same is true for the
spring cloud modules:

```xml
<properties>
    <spring-cloud.version>Dalston.SR1</spring-cloud.version>
    <spring-admin.version>1.5.1</spring-admin.version>
</properties>
```

```xml
<dependencyManagement>
    <dependencies>
        <!-- Netflix dependencies import -->
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-netflix</artifactId>
            <version>${netflix.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
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

### Base dependencies

* **Lombok**: This saves a lot code for getter/setter and log instancing, not critical, but useful.

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```
* **Spring boot test starter**: Testing is surely going to be part of things, so including this is a must.

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

This provides the following artifacts:

* **JUnit** — The de-facto standard for unit testing Java applications.
* **Spring Test & Spring Boot Test** — Utilities and integration test support for Spring Boot applications.
* **AssertJ** — A fluent assertion library.
* **Hamcrest** — A library of matcher objects (also known as constraints or predicates).
* **Mockito** — A Java mocking framework.
* **JSONassert** — An assertion library for JSON.
* **JsonPath** — XPath for JSON.

#### **Spring boot configuration processor**

Generates a file `/META-INF/spring-configuration-metadata.json`containing the declared properties 
for the module (mainly, those annotated with `@ConfigurationProperties`).

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
</dependency>
```

The generated content for a configuration class like this:

```java
@Data
@Configuration
@ConfigurationProperties(prefix="nimbus.demo")
public class NimbusDemoSettings
{
    private Integer randomId = 0;
}
```

Looks like:

```json
{
  "hints": [],
  "groups": [
    {
      "sourceType": "com.github.apycazo.nimbus.demo.cfg.NimbusDemoSettings",
      "name": "nimbus.demo",
      "type": "com.github.apycazo.nimbus.demo.cfg.NimbusDemoSettings"
    }
  ],
  "properties": [
    {
      "sourceType": "com.github.apycazo.nimbus.demo.cfg.NimbusDemoSettings",
      "defaultValue": 0,
      "name": "nimbus.demo.random-id",
      "type": "java.lang.Integer"
    }
  ]
}
```


