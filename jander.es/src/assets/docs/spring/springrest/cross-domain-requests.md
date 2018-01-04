Allowing cross domain requests (CORS) can also be done in several ways

### Implementing a filter

A filter like this can include the required `Access-Control-Allow-Origin` header for requests:

```java
@Component
public class CorsFilter implements Filter {

    private Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        log.info("Filtering request: {}", request.getRequestURI());

        HttpServletResponse resp = (HttpServletResponse) servletResponse;
        resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,HEAD");
        resp.setHeader("Access-Control-Allow-Headers", request.getHeader("Access-Control-Request-Headers"));
        
        if (request.getMethod().equals("OPTIONS")) {
            resp.setStatus(HttpServletResponse.SC_OK);
            return;
        }

        chain.doFilter(request, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
```

### Configure spring MVC routes

This is used to include CORS directly into the mappings of Spring MVC

```java
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**");
    }
}
```

### Cross-Origin annotation

This annotation can be included either at class or method level. An example:

```java
@CrossOrigin(origins = "http://localhost:9000")
@GetMapping("/test")
public TestValue test() {
    
    return new TestValue(Instant.now().getEpochSecond());
}
```