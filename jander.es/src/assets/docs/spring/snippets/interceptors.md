### Interceptor example

```java
@Slf4j
@Component
public class LogFilter extends HandlerInterceptorAdapter
{
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception
    {
        String requestURI = request.getRequestURI();
        log.debug("Request URI: {}", request.getRequestURI());
        return true;
    }
}
```

### Include interceptor

```java
@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter
{
    @Autowired
    private LogFilter logFilter;

    @Override
    public void addInterceptors(InterceptorRegistry registry)
    {
        registry.addInterceptor(logFilter);
    }
}
```