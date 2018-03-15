To trust self-signed ssl certificates we will need to do the following:

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