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