# Java/Spring HTTP and RestTemplate notes

## HttpServletRequest info

Using the following as test:

```java
@RestController
@RequestMapping("demo")
public static class RequestDemo {

    @GetMapping(value = "request", produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String,Object> processRequest (HttpServletRequest request) {

        Map<String,Object> response = new HashMap<>();
        response.put("getProtocol", request.getProtocol());
        response.put("getScheme", request.getScheme());
        response.put("getLocalAddr", request.getLocalAddr());
        response.put("getLocalPort", request.getLocalPort());
        response.put("getRequestURL", request.getRequestURL().toString());
        response.put("getRequestURI", request.getRequestURI());
        response.put("getQueryString", request.getQueryString());
        response.put("getMethod", request.getMethod());
        response.put("getContextPath", request.getContextPath());
        response.put("getPathInfo", request.getPathInfo());
        response.put("getPathTranslated", request.getPathTranslated());
        response.put("getRemoteUser", request.getRemoteUser());
        response.put("getRemoteUser", request.getServletPath());
        response.put("getParameterMap", request.getParameterMap());

        return response;
    }
}
```

Testing with a request like: `http://localhost:9901/demo/request?name=john&name=jane&id=1` yields the following response:

```json
{
    "getRequestURL": "http://localhost:9901/demo/request",
    "getPathInfo": null,
    "getScheme": "http",
    "getLocalPort": 9901,
    "getRequestURI": "/demo/request",
    "getLocalAddr": "0:0:0:0:0:0:0:1",
    "getQueryString": "name=john&name=jane&id=1",
    "getParameterMap": {
        "name": [
            "john",
            "jane"
        ],
        "id": [
            "1"
        ]
    },
    "getProtocol": "HTTP/1.1",
    "getMethod": "GET",
    "getContextPath": "",
    "getPathTranslated": null,
    "getRemoteUser": "/demo/request"
}
```

And not including params, like: `http://localhost:9901/demo/request`, returns:

```json
{
    "getRequestURL": "http://localhost:9901/demo/request",
    "getPathInfo": null,
    "getScheme": "http",
    "getLocalPort": 9901,
    "getRequestURI": "/demo/request",
    "getLocalAddr": "0:0:0:0:0:0:0:1",
    "getQueryString": null,
    "getParameterMap": {},
    "getProtocol": "HTTP/1.1",
    "getMethod": "GET",
    "getContextPath": "",
    "getPathTranslated": null,
    "getRemoteUser": "/demo/request"
}
```

## Proxy

### Custom rest template (first version)

Configuring manually a `RestTemplate` instance:

```java
public static class RestTemplateCreator {

    public RestTemplate createCustomRestTemplate(String proxyHost, int proxyPort, String user, String pass) 
    {
        return createCustomRestTemplate("", 0, "", "");
    }

    public RestTemplate createCustomRestTemplate(String proxyHost, int proxyPort, String user, String pass) 
    {

        PoolingHttpClientConnectionManager connectionManager;
        connectionManager = new PoolingHttpClientConnectionManager();

        connectionManager.setMaxTotal(maxTotalConnections);
        connectionManager.setDefaultMaxPerRoute(maxRouteConnections);

        RequestConfig config = RequestConfig
                .custom()
                .setConnectTimeout(connectTimeout)
                .build();

        HttpClientBuilder builder = HttpClientBuilder
                .create()
                .setConnectionManager(connectionManager)
                .setDefaultRequestConfig(config);

        // --- add credentials if found
        if (!StringUtils.isEmpty(user)) {
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(
                new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT),
                new UsernamePasswordCredentials(user, pass));
            builder.setDefaultCredentialsProvider(credentialsProvider);
        }

        // --- set proxy when required
        if (!StringUtils.isEmpty(proxyHost) && proxyPort > 0) {
            HttpHost proxy = new HttpHost(proxyHost, proxyPort);
            builder.setProxy(proxy);
        }

        ClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(builder.build());
        return new RestTemplate(factory);
    }
}
```

### Custom rest template (second version)

**Source**: http://docs.spring.io/spring-boot/docs/current/reference/html/howto-http-clients.html

> Here’s an example of configuring HttpComponentsClientRequestFactory with an HttpClient that uses a proxy for all hosts except 192.168.0.5. 

```java
static class ProxyCustomizer implements RestTemplateCustomizer 
{
    @Override
    public void customize(RestTemplate restTemplate) {

        HttpHost proxy = new HttpHost("proxy.example.com");
        HttpClient httpClient = HttpClientBuilder
                .create()
                .setRoutePlanner(new DefaultProxyRoutePlanner(proxy))
                .build();
        restTemplate.setRequestFactory(new HttpComponentsClientHttpRequestFactory(httpClient));
    }
}
```

### Using a URL with embedded proxy info

```java
public URL createProxyURL (String url, String proxyHost, Integer proxyPort) throws  MalformedURLException 
{
    if (!StringUtils.isEmpty(proxyHost)) {
        Proxy proxy = new Proxy(Proxy.Type.HTTP, new InetSocketAddress(proxyHost, proxyPort));
        return createProxyURL(url, proxy);
    } else {
        return new URL(url);
    }
}

/**
* Crea una URL que pase por el proxy especificado en el parametro.
* @param url La URL base.
* @param proxy El proxy de paso para las peticiones a traves de esta URL.
* @return URL con conexion a traves del proxy especificado como parametro.
* @throws MalformedURLException
*/
public URL createProxyURL(String url, final Proxy proxy) throws MalformedURLException {

    return new URL(null, url, new URLStreamHandler() {

        protected URLConnection openConnection(URL url) throws IOException {

            return new URL(url.toString()).openConnection(proxy);
        }
    });
}
```

## CORS

### Using filter

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

### Using spring boot WebMVC

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

## RestTemplate outgoing filter

As an example, to add a header on all requests:

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

## Trust self-signed SSL certificates

Reference to update: http://www.baeldung.com/httpclient-ssl

```java
public RestTemplate buildRestTemplate () throws KeyStoreException, NoSuchAlgorithmException, KeyManagementException
{
    HttpComponentsClientHttpRequestFactory requestFactory;
    requestFactory = new HttpComponentsClientHttpRequestFactory();
    SSLContext cxt = new SSLContextBuilder()
                    .loadTrustMaterial(null, new TrustSelfSignedStrategy())
                    .build();
    SSLConnectionSocketFactory sslConnections = new SSLConnectionSocketFactory(cxt);
    CloseableHttpClient httpclient = HttpClients
        .custom()
        .setSSLSocketFactory(sslConnections)
        .build();
    requestFactory.setHttpClient(httpclient);
    return new RestTemplate(requestFactory);
}
```
