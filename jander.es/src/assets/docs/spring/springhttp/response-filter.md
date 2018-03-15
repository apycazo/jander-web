Besides the usual filter for requests, we can also include interceptors for our service requests. An example custom config:

```java
public class RestTemplateConfig {

    private final Logger log = LoggerFactory.getLogger(getClass());

    @Value("${rest.header:X-Custom-Token}")
    private String customHeaderName;
    @Value("${rest.token:}")
    private String customHeaderValue;
    
    @Value("${rest.user:}")
    private String user;
    @Value("${rest.password:}")
    private String password;

    @Bean
    public RestTemplate customRestTemplate () {

        RestTemplateBuilder builder = new RestTemplateBuilder()
                .messageConverters(new MappingJackson2HttpMessageConverter())
                .additionalInterceptors(new OutgoingInterceptor())
                .requestFactory(SimpleClientHttpRequestFactory.class);

        if (!StringUtils.isEmpty(user)) {
            builder = builder.basicAuthorization(user, password);
        }

        return builder.build();
    }

    private class OutgoingInterceptor implements ClientHttpRequestInterceptor {

        @Override
        public ClientHttpResponse intercept(HttpRequest httpRequest, byte[] bytes, ClientHttpRequestExecution clientHttpRequestExecution) throws IOException {

            httpRequest.getHeaders().add(customHeaderName, customHeaderValue);
            return clientHttpRequestExecution.execute(httpRequest, bytes);
        }
    }

}
```
