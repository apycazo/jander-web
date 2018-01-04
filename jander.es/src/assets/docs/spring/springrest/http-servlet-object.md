Spring MVC rest services usually inject `HttpServlet` objects, either as part of a method signature, of autowired in the class. An example of the data received with a servlet request:

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