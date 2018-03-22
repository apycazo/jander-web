Enable scheduling using spring:

```java
@Configuration
@EnableScheduling
public class AppConfig implements SchedulingConfigurer 
{
    @Override
    public void configureTasks(ScheduledTaskRegistrar taskRegistrar) 
    {
        taskRegistrar.setScheduler(taskExecutor());
    }

    @Bean(destroyMethod="shutdown")
    public Executor taskExecutor() 
    {
        return Executors.newScheduledThreadPool(100);
    }
}
```

Scheduled job:

```java
@Component
public class ScheduledJob
{
    public static final long TICK_IN_MS = 500L;

    private AtomicInteger count = new AtomicInteger(0);

    @Scheduled(fixedDelay = TICK_IN_MS)
    protected void tick ()
    {
        count.incrementAndGet();
    }

    public int getCurrentValue ()
    {
        return count.get();
    }
}
```