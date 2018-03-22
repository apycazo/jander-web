### Required dependencies (using caffeine)

```xml
<!-- Cache tests with caffeine in memory cache -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>com.github.ben-manes.caffeine</groupId>
    <artifactId>caffeine</artifactId>
</dependency>
```

### Cache config

```java
@EnableCaching
@Configuration
public class CacheConfig
{
    // This is only to enable the cache without polluting App.class
}
```

### Sample caffeine cache config

```yaml
# From Caffeine Doc:
#
#    The string syntax is a series of comma-separated keys or key-value pairs, each corresponding to a Caffeine builder method.
#
#    initialCapacity=[integer]: sets Caffeine.initialCapacity.
#    maximumSize=[long]: sets Caffeine.maximumSize.
#    maximumWeight=[long]: sets Caffeine.maximumWeight.
#    expireAfterAccess=[duration]: sets Caffeine.expireAfterAccess(long, java.util.concurrent.TimeUnit).
#    expireAfterWrite=[duration]: sets Caffeine.expireAfterWrite(long, java.util.concurrent.TimeUnit).
#    refreshAfterWrite=[duration]: sets Caffeine.refreshAfterWrite(long, java.util.concurrent.TimeUnit).
#    weakKeys: sets Caffeine.weakKeys().
#    weakValues: sets Caffeine.weakValues().
#    softValues: sets Caffeine.softValues().
#    recordStats: sets Caffeine.recordStats().
#    Durations are represented by an integer, followed by one of "d", "h", "m", or "s", representing days, hours, minutes, or seconds respectively. There is currently no syntax to request expiration in milliseconds, microseconds, or nanoseconds.
#
#    Whitespace before and after commas and equal signs is ignored. Keys may not be repeated; it is also illegal to use the following pairs of keys in a single value:
#
#    maximumSize and maximumWeight
#    weakValues and softValues

spring.cache:
    # use 'none' to disable cache
    type: caffeine
    cache-names: timed-cache
    caffeine.spec: expireAfterAccess=2s, initialCapacity=10, maximumSize=100
```

### Cacheable service

```java
@Service
public class CountService
{
    private AtomicInteger accessCount = new AtomicInteger(0);

    @Cacheable("timed-cache")
    public Integer getCount ()
    {
        return accessCount.incrementAndGet();
    }

    @CacheEvict(cacheNames = "timed-cache", allEntries = true)
    public void evict ()
    {
        // force eviction of all entries
    }
}
```