Now that we have the basic structure, lets create some more endpoints. The basic endpoint definition is done through a fluent API, using `path` and the method to accept, `get`, `post`, etc... All these methods accept functional interfaces with a single parameter of type `Context`, as can be seen in the previous example.

A very basic Handler structure for a simple API might look like this:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        get(ctx -> ctx.result("This is the 'get' response"));
        put(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (put): '" + payload + "'");
        });
        post(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (post): '" + payload + "'");
        });
        delete(ctx -> ctx.status(200));
    });
});
```

### Path parameters

If we want to receive a parameter inside the path, we can extract the value we define with ':<paramName>' using `ctx.param(paramName)`. Let's extend our `get` method with an id:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        get(ctx -> ctx.result("This is the 'get' response"));
        get("/:id", ctx -> ctx.result("Got id: " + ctx.param("id")));
        put(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (put): '" + payload + "'");
        });
        post(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (post): '" + payload + "'");
        });
        delete(ctx -> ctx.status(200));
    });
});
```

A different approach would have been nesting a `path`:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        get(ctx -> ctx.result("This is the 'get' response"));        
        put(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (put): '" + payload + "'");
        });
        post(ctx -> {
            String payload = ctx.body();
            ctx.result("Received payload (post): '" + payload + "'");
        });
        delete(ctx -> ctx.status(200));
        path(":id", () -> {
            get(ctx -> ctx.result("Got id: " + ctx.param("id")));
        });
    });
});
```

### Path values

An important thing to remember is that when we are concatenating paths, the method `path` will add a slash (/) character at the start if you don't, but other methods don't do that. For example, if we have this:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        get(ctx -> ctx.result("This is the 'get' response"));        
        get(":id", ctx -> ctx.result("Got id: " + ctx.param("id")));
    });
});
```

The id method will probably not match, the correct way of doing this, if we don't use another `path`, is to write it like:

```java
Javalin.create().routes(() -> {
    path("/", () -> {
        get(ctx -> ctx.result("This is the 'get' response"));        
        // notice the trailing '/'
        get("/:id", ctx -> ctx.result("Got id: " + ctx.param("id")));
    });
});
```