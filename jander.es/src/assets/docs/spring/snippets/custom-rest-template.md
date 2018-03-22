### Properties configuration class

```java
@Data
@ToString(exclude = "pwd")
@ConfigurationProperties("app.resttemplate")
public class RestTemplateSettings
{
    // --- proxy settings
    private String proxyHostName = "";
    private int proxyHostPort = 0;
    private boolean disableProxy = false;

    // --- auth configuration
    private String user = "";
    private String pwd;

    // --- connection settings
    private String userAgent = "";
    private boolean sslTrusted = false;
    private int connectTimeoutInMillis = 5000;
    private int maxConnections = 0;
    private int maxConnectionsPerRoute = 0;
}
```

### Bean configuration class

```java
@Data
@Slf4j
@Configuration
@EnableConfigurationProperties(RestTemplateSettings.class)
public class CustomRestTemplateConfig
{
    public static final String BEAN_NAME = "custom::rest-template";

    @Lazy
    @Bean(BEAN_NAME)
    public RestTemplate createRestTemplate (RestTemplateSettings settings, RestTemplateBuilder restTemplateBuilder)
    {
        HttpClientBuilder builder = HttpClientBuilder.create();

        // --- configures connection timeout
        if (settings.getConnectTimeoutInMillis() > 0) {
            RequestConfig config = RequestConfig
                    .custom()
                    .setConnectTimeout(settings.getConnectTimeoutInMillis())
                    .build();
            builder.setDefaultRequestConfig(config);
        }

        // --- configures connection pool
        PoolingHttpClientConnectionManager connectionManager;
        connectionManager = new PoolingHttpClientConnectionManager();

        if (settings.getMaxConnections() > 0) {
            connectionManager.setMaxTotal(settings.getMaxConnections());
        }
        if (settings.getMaxConnectionsPerRoute() > 0) {
            connectionManager.setDefaultMaxPerRoute(settings.getMaxConnectionsPerRoute());
        }

        builder.setConnectionManager(connectionManager);

        // --- configures proxy, if any
        if (!StringUtils.isEmpty(settings.getProxyHostName())) {
            HttpHost proxy;
            if (settings.getProxyHostPort() > 0) {
                proxy = new HttpHost(settings.getProxyHostName(), settings.getProxyHostPort());
            } else {
                proxy = new HttpHost(settings.getProxyHostName());
            }

            builder.setRoutePlanner(new DefaultProxyRoutePlanner(proxy));
        }

        // --- configures authentication, if present
        if (!StringUtils.isEmpty(settings.getUser())) {
            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
            credentialsProvider.setCredentials(
                    new AuthScope(AuthScope.ANY_HOST, AuthScope.ANY_PORT),
                    new UsernamePasswordCredentials(settings.getUser(), settings.getPwd()));
            builder.setDefaultCredentialsProvider(credentialsProvider);
        }

        // --- configures user agent
        if (!StringUtils.isEmpty(settings.getUserAgent())) {
            builder.setUserAgent(settings.getUserAgent());
        }

        // --- configures SSL
        if (settings.isSslTrusted()) {
            try {
                SSLContext ctx = new SSLContextBuilder()
                        .loadTrustMaterial(null, new TrustSelfSignedStrategy())
                        .build();
                builder.setSSLContext(ctx);
            } catch (NoSuchAlgorithmException | KeyManagementException | KeyStoreException e) {
                log.warn("Unable to create SSL context for RestTemplate (message is: '{}')", e.getMessage(), e);
            }
        }

        // --- creates the factory
        ClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory(builder.build());

        RestTemplate restTemplate = restTemplateBuilder.requestFactory(factory).build();

        if (log.isDebugEnabled()) {
            log.info("Created Rest Template with config: {}", settings);
        } else {
            log.info("Created Rest Template");
        }

        return restTemplate;
    }
}
```