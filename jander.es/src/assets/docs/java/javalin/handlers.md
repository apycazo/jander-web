Handler can be setup to be run in threee phases: before, endpoint and after. Up till now we have been using 'enpoints', but we can require some checks before the actual method handling, or some cleanup after.

Using these three elements we can setup our API workflow as we want to. Examples below

### Before handler

We can either call the `before` method inside a `routes(...)`, or outside in `app.before(...)`. For example, to keep a count of how many requests has been received:

```java
app.before("/*", ctx -> counter.incrementAndGet());
```

### Endpoint handler

We can also create an endpoint directly:

```java
app.get("info/counter", ctx -> ctx.result("Counter value is " + counter.get()));
```

### After handler

And to call something after a method call:

```java
app.after(ctx -> log.info("Received request"));
```

Notice how we can either declare a handler to valid for any path either by using wildcards (`/*`) or by skipping the path value.
