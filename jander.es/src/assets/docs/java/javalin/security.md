To secure endpoint we can use a `before` handler, so every request sent to a specific endpoint (or all of them) is checked for credentials. To keep things simple we are just going to create a new endpoint, that can only be accessed with basic credentials including user/password:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        // previous code ommited for brevity
        before("/secure", ctx -> {
            BasicAuthCredentials bac = ctx.basicAuthCredentials();
            if (bac == null) {
                throw new HaltException(401, "Unauthorized");
            }
            if ("admin".equalsIgnoreCase(bac.getUsername()) && "pass".equalsIgnoreCase(bac.getPassword())) {
                ctx.next();
            } else {
                throw new HaltException(401, "Unauthorized");
            }
        });
        path("/secure", () -> {
            get(ctx -> ctx.result("The secret key is 1234"));
        });
    });
});
```

Notice that 'HaltException' is specific to Javalin, and allows us to prevent the next hanlder to be called at all.

### Configuring SSL

To use SSL in the embedded server we need to provide an SSL context factory, and a custom embedded server. This can be achieved with:

```java
private static SslContextFactory getSslContextFactory() {
    SslContextFactory sslContextFactory = new SslContextFactory();
    sslContextFactory.setKeyStorePath(EmbeddedServer.class.getResource("/keystore.jks").toExternalForm());
    sslContextFactory.setKeyStorePassword("password");
    return sslContextFactory;
}

public static void main(String[] args) {

    Javalin app = Javalin.create()
        .embeddedServer(new EmbeddedJettyFactory(() -> {
                Server server = new Server();
                ServerConnector sslConnector = new ServerConnector(server, getSslContextFactory());
                sslConnector.setPort(443);
                ServerConnector connector = new ServerConnector(server);
                connector.setPort(80);
                server.setConnectors(new Connector[]{sslConnector, connector});
                return server;
        }))
        .start();
}
```