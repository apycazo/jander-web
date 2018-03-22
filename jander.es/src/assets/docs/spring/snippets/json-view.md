To avoid serializing everything all the time, we can use Json views. First, annotate the data model:

```java
@Data
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfo
{
    public interface Summary {}

    @NotNull
    @Min(value = 0)
    @JsonView(UserInfo.Summary.class)
    private int id;

    @NotEmpty
    @Length(max = 32)
    @JsonView(UserInfo.Summary.class)

    private String username;

    private List<String> roles;

    private Long createdOn;

    private Long updatedOn;

    @Builder.Default
    @JsonSerialize(using = ToStringSerializer.class)
    private Long internalId = Long.MAX_VALUE;
}
```

And then use it on the services requiring specific views:

```java
@GetMapping
@JsonView(UserInfo.Summary.class) // show only a summary of each entry
public List<UserInfo> findAll ()
{
    // removed for brevity
}

@GetMapping
public UserInfo findId (String id)
{
    // removed for brevity
}
```