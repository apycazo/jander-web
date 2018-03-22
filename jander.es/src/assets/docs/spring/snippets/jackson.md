Jackson mapper snippets

### Set builder with default values

```java
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CountResponse
{
    @Builder.Default
    public int count = -1;
}
```

### String record with validated fields

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
    private String id;
    private long created;
    private long updated;
}
```

### Ignore field on serialization

From jackson 2.6 onwards:

```java
public class User 
{
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}
```

### Custom ObjectMapper

```java
@Slf4j
@Configuration
public class ObjectMapperFactory
{
    public static final String BEAN_NAME = "custom::objectmapper";

    @Lazy
    @Bean(BEAN_NAME)
    public ObjectMapper createObjectMapper ()
    {
        ObjectMapper mapper = new ObjectMapper();

        mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
        mapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);

        return mapper;
    }
}
```

### Serialize as string

```java
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfo
{
    @Builder.Default
    @JsonSerialize(using = ToStringSerializer.class)
    private Long ts = Instant.now().toEpochMilli();
}
```