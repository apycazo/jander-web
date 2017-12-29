# Spring testing

## Mocking beans

### Requirements

* moquito-core (included on spring-test)

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-test</artifactId>
    <scope>test</scope>
</dependency>
```

### Example

**References**: [Mocked bean test](https://gitlab.com/launchbase/launchbase-spring/blob/master/launchbase-spring-basic/src/test/java/com/gitlab/launchbase/spring/basic/mocks/SomeComplexBeanTest.java)

**Bean to be mocked**

```java 
@Component
public class SomeComplexBean // maybe not so complex :)
{
    AtomicInteger value = new AtomicInteger(0);

    public void reset ()
    {
        value.set(0);
    }

    public int get ()
    {
        return value.get();
    }

    public int inc ()
    {
        return value.incrementAndGet();
    }

    public boolean isOdd (int number)
    {
        return number % 2 == 0;
    }
}
```

**Mock test**

```java
@Slf4j
@SpringBootTest
@RunWith(SpringRunner.class)
public class SomeComplexBeanTest
{
    @Mock
    private SomeComplexBean bean;

    @Test
    public void mockedBeanBehaviour ()
    {
        when(bean.get()).thenReturn(10);
        // this is not really the bean behavior, to prove it is being mocked
        when(bean.inc()).thenReturn(1).thenReturn(3).thenReturn(5);

        // no matter how many times I call 'get', I will only get 10 all the time
        IntStream.rangeClosed(1,10).forEach(__ -> assertEquals(10, bean.get()));

        // and the first three times I call 'inc' i will get values 1,3,5
        assertEquals(1, bean.inc());
        assertEquals(3, bean.inc());
        assertEquals(5, bean.inc());

        // and if I try again, I will get the same value (the last one)
        assertEquals(5, bean.inc());
        assertEquals(5, bean.inc());
        assertEquals(5, bean.inc());

        // I can also provide an 'any' matcher for parameters
        when(bean.isOdd(anyInt())).thenReturn(true);
        assertTrue(bean.isOdd(0));
        assertTrue(bean.isOdd(1));
        assertTrue(bean.isOdd(2));
    }
}
```

## Testing Json objects

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

## Rest controller tests

### GET request

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SimpleRCTest
{
    @LocalServerPort
    private int serverPort;

    @Autowired
    private TestRestTemplate restTemplate;

    private JacksonTester<StringValue> json;

    @PostConstruct
    public void setup ()
    {
        JacksonTester.initFields(this, new ObjectMapper());
    }

    @Test
    public void test_http_get ()
    { 
        StringValue response = restTemplate.getForObject("/test", StringValue.class);

        JsonContent<StringValue> jsonContent = json.write(response);
        assertThat(jsonContent)
                .hasJsonPathStringValue("text")
                .hasJsonPathStringValue("serial")
                .hasJsonPathNumberValue("created");     
    }
}
```

### POST request

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SimpleRCTest
{
    @LocalServerPort
    private int serverPort;

    @Autowired
    private TestRestTemplate restTemplate;

    private JacksonTester<StringValue> json;

    @PostConstruct
    public void setup ()
    {
        JacksonTester.initFields(this, new ObjectMapper());
    }

    @Test
    public void test_http_post() throws Exception
    {
        StringValue data = new StringValue("token");

        RequestEntity<StringValue> request = RequestEntity
                .post(new URI("/echo"))
                .accept(MediaType.APPLICATION_JSON)
                .body(data);

        ResponseEntity<StringValue> response = restTemplate.exchange(request, StringValue.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.ACCEPTED);
        StringValue echo = response.getBody();
        assertThat(echo).isNotNull();

        assertThat(echo.getText()).isEqualTo(data.getText());
        assertThat(echo.getSerial()).isEqualTo(data.getSerial());
        assertThat(echo.getCreated()).isEqualTo(data.getCreated());
    }
}
```