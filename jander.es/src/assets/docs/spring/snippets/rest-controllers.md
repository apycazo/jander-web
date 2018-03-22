Some rest controller sample methods:

### Controller advice to handle exceptions

```java
@Slf4j
@ControllerAdvice
public class ErrorHandler
{
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity handleException(IllegalArgumentException e)
    {
        log.trace("Captured exception: {}", e.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
```

### Send an error response

```java
@GetMapping("{id}")
public StringRecord readById(
    @PathVariable String id, 
    HttpServletResponse servletResponse) throws IOException
{
    if (!data.containsKey(id)) {
        servletResponse.sendError(HttpStatus.NOT_FOUND.value(), "Record id '" + id + "' not found");
        return null;
    }

    return data.get(id);
}
```


### Validate data

Given a sample validable resource:

```java
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class StringRecord
{
    @NotEmpty
    @Length(max = 32)
    private String value;
    @NotEmpty
    private String id;
    private long created;
    private long updated;
}
```

A Rest Controller accepting only valid records:

```java
@RequestMapping(
        value = Mapping.ROOT,
        method = { RequestMethod.POST, RequestMethod.PUT },
        consumes = MediaType.APPLICATION_JSON_VALUE)
public UserInfo save (@Valid @RequestBody StringRecord userInfo)
{
    // ...
}
```

### Sample delete with ResponseEntity

```java
@DeleteMapping(Mapping.ROOT)
public OperationResult deleteAll () throws URISyntaxException
{
    URI uri = new URI(path + SimpleRestController.Mapping.ROOT);
    ResponseEntity response = restTemplate.exchange(RequestEntity.delete(uri).build(), Void.class);

    return OperationResult.builder()
            .operationName("deleteAll")
            .successful(response.getStatusCode().is2xxSuccessful())
            .details("Deleted all records")
            .build();
}
```

### Rest template exchange example

```java
UserInfo createdUser = rest
    .exchange(
        RequestEntity
            .post(uri)
            .contentType(MediaType.APPLICATION_JSON)
            .body(info), 
        UserInfo.class)
    .getBody();
```



