### Requirements

* assertj (included in spring-test)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Example

**Target object**

```java
@Data
@ToString
public class StringValue
{
    @NotEmpty
    private String text;
    @NotEmpty
    private String serial;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private Date created;

    public StringValue()
    {
        this("");
    }

    public StringValue(String text)
    {
        this.text = text;
        serial = UUID.randomUUID().toString();
        created = new Date();
    }
}
```

```json
{
    "text": "test",
    "serial": "3b531f2e-f1ad-438d-9598-d5ebaa0f70b0",
    "created": 1506165476283
}
```

**Validation**

```java
@Test
public void value_is_generated_ok () throws Exception
{
    StringValue target = new StringValue("test");

    JsonContent<StringValue> jsonContent = json.write(target);
    assertThat(jsonContent)
            .hasJsonPathStringValue("text")
            .hasJsonPathStringValue("serial")
            .hasJsonPathNumberValue("created");

    assertThat(jsonContent).extractingJsonPathStringValue("test").isEqualTo("test");
}
```