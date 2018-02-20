Javalin will pass a context to all parameters, the context will then be used to retrieve data, or set the response. The most typical will be:

* `body`: get the request body as string
* `param(string)`: get a path-parameter, ex "/:id" -> param("id")
* `header(string)`: get a header
* `result(string)`: Sets the result content
* `json(object)`: Returns the object as json (requires jackson)
* `status`: Sets the response status


The full list of commands, taken from the official doc:

**Request methods**

```java
ctx.request();                      // get underlying HttpServletRequest
ctx.anyFormParamNull("k1", "k2");   // returns true if any form-param is null
ctx.anyQueryParamNull("k1", "k2");  // returns true if any query-param is null
ctx.async();                        // run the request asynchronously
ctx.body();                         // get the request body as string
ctx.bodyAsBytes();                  // get the request body as byte-array
ctx.bodyAsClass(clazz);             // convert json body to object (requires jackson)
ctx.formParam("key");               // get form param
ctx.formParams("key");              // get form param with multiple values
ctx.formParamMap();                 // get all form param key/values as map
ctx.param("key");                   // get a path-parameter, ex "/:id" -> param("id")
ctx.paramMap();                     // get all param key/values as map
ctx.splat(0);                       // get splat by number
ctx.splats();                       // get array of splat-values
ctx.attribute("key", "value");      // set a request attribute
ctx.attribute("key");               // get a request attribute
ctx.attributeMap();                 // get all attribute key/values as map
ctx.basicAuthCredentials()          // get username and password used for basic-auth
ctx.contentLength();                // get request content length
ctx.contentType();                  // get request content type
ctx.cookie("key");                  // get cookie by name
ctx.cookieMap();                    // get all cookie key/values as map
ctx.header("key");                  // get a header
ctx.headerMap();                    // get all header key/values as map
ctx.host();                         // get request host
ctx.ip();                           // get request up
ctx.isMultipart();                  // check if request is multipart
ctx.mapFormParams("k1", "k2");      // map form params to their values, returns null if any form param is missing
ctx.mapQueryParams("k1", "k2");     // map query params to their values, returns null if any query param is missing
ctx.matchedPath();                  // get matched path, ex "/path/:param"
ctx.next();                         // pass the request to the next handler
ctx.path();                         // get request path
ctx.port();                         // get request port
ctx.protocol();                     // get request protocol
ctx.queryParam("key");              // get query param
ctx.queryParams("key");             // get query param with multiple values
ctx.queryParamMap();                // get all query param key/values as map
ctx.queryString();                  // get request query string
ctx.method();                       // get request method
ctx.scheme();                       // get request scheme
ctx.sessionAttribute("foo", "bar"); // set session-attribute "foo" to "bar"
ctx.sessionAttribute("foo");        // get session-attribute "foo"
ctx.sessionAttributeMap();          // get all session attributes as map
ctx.uploadedFile("key");            // get file from multipart form
ctx.uploadedFiles("key");           // get files from multipart form
ctx.uri();                          // get request uri
ctx.url();                          // get request url
ctx.userAgent();                    // get request user agent
```

**Response methods**

```java
ctx.response();                     // get underlying HttpServletResponse
ctx.result("result");               // set result (string)
ctx.result(inputStream);            // set result (stream)
ctx.resultString();                 // get response result (string)
ctx.resultStream();                 // get response result (stream)
ctx.charset("charset");             // set response character encoding
ctx.header("key", "value");         // set response header
ctx.html("body html");              // set result and html content type
ctx.json(object);                   // set result with object-as-json (requires jackson)
ctx.redirect("/location");          // redirect to location
ctx.redirect("/location", 302);     // redirect to location with code
ctx.status();                       // get response status
ctx.status(404);                    // set response status
ctx.cookie("key", "value");         // set cookie with key and value
ctx.cookie("key", "value", 0);      // set cookie with key, value, and maxage
ctx.cookie(cookieBuilder);          // set cookie using cookiebuilder
ctx.removeCookie("key");            // remove cookie by key
ctx.removeCookie("/path", "key");   // remove cookie by path and key
```