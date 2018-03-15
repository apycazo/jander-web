To use a proxy as part of `RestTemplate` we have a few options:

### Manually configuring rest template

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

### Implementing a RestTemplateCustomizer

This is the preferred option for newer spring boot releases. An example of this:

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

**Reference**: http://docs.spring.io/spring-boot/docs/current/reference/html/howto-http-clients.html

### Embedding proxy info on URL

This one is useful if we can configure RestTemplate, or we are not using it:

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
* Creates an URL with the specifyed proxy values
* @param url The base url.
* @param proxy Proxy to be used.
* @return URL with a custom connection using the given proxy
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