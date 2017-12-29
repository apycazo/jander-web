# Creating a proxy class for Spring

**Reference**: [https://dzone.com/articles/power-proxies-java](java proxies).

## Create a custom initializer

Base source code:

```java
public class CustomInitializer 
       implements ApplicationContextInitializer<ConfigurableApplicationContext> 
{
    public void initialize(ConfigurableApplicationContext appContext) {
        // logic goes here
    }
}
```

## Create a custom invocation handler

Example:

```java
public class CustomHandler implements InvocationHandler 
{
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable 
    {
        // here we can override a method, or continue using the proxied object
        // Note: We can not access the proxied object from here, unless we have got it while creating.
    }
}
```

## Registering custom initializer

#### Using a factory

On `META-INF/spring.factories`:

```
org.springframework.context.ApplicationContextInitializer=\
com.example.YourInitializer
```

#### On the builder

```java
new SpringApplicationBuilder(YourApp.class)
    .initializers(YourInitializer.class);
    .run(args);
```