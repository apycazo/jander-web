To configure the spring asynchronous executor:

```java
@Data
@EnableAsync
@Configuration
@ConfigurationProperties("app.async")
public class ScaffoldAsyncAutoConfig extends AsyncConfigurerSupport
{
    private int corePoolSize = 4;
    private int maxPoolSize = 10;
    private int queueCapacity = 200;

    @Override
    public Executor getAsyncExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(corePoolSize);
        executor.setMaxPoolSize(maxPoolSize);
        executor.setQueueCapacity(queueCapacity);
        executor.setThreadNamePrefix("async");
        executor.initialize();
        return executor;
    }
}
```