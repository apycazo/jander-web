Sample configurer to customize Spring MVC:

```java
@Configuration
@ConfigurationProperties(prefix = "app.mvc")
public class CustomMvcConfig extends WebMvcConfigurerAdapter
{
    private String corsPattern = "/";
    private String allowedOrigins = "*";

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer config)
    {
        config
                // path extensions will always be used when present
                .favorPathExtension(true)
                // allow us to define media types manually
                .useJaf(false)
                // Note that a browser might send a default xml header, which would override this
                .defaultContentType(MediaType.APPLICATION_JSON)
                // Extensions we allow to use (note that using xml requires dependency on 'jackson-dataformat-xml')
                .mediaType("xml", MediaType.APPLICATION_XML)
                .mediaType("json", MediaType.APPLICATION_JSON);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry)
    {
        registry.addMapping(corsPattern).allowedOrigins(allowedOrigins);
    }

}
```