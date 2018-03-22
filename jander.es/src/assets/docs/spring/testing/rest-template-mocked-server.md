Using a Mocked server to intercept rest template requests.

### Simple interception

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MockedRestServiceTest
{
    @Autowired
    private RestTemplate restTemplate;
    private ObjectMapper mapper = new ObjectMapper();

    @Test
    public void interceptRestTemplateCall () throws JsonProcessingException
    {
        MockRestServiceServer server = MockRestServiceServer.bindTo(restTemplate).build();
        // configuration
        String user = mapper.writeValueAsString(UserInfo.builder().id(1).username("test").build());
        String url = UriComponentsBuilder.fromHttpUrl("http://google.com").queryParam("test", "true").toUriString();
        // configure mocked response
        server
                .expect(manyTimes(), requestTo(url))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(user, MediaType.APPLICATION_JSON));
        // the next query will be intercepted by the mocked server
        UserInfo info = restTemplate.getForObject(url, UserInfo.class);
        assertNotNull(info);
        assertEquals(1, info.getId());
        assertEquals("test", info.getUsername());
    }
}
```

### Intercept and expect a verification error on the expected call stack

```java
@Slf4j
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class MockedRestServiceTest
{
    @Autowired
    private RestTemplate restTemplate;
    private ObjectMapper mapper = new ObjectMapper();

    @Test(expected = AssertionError.class)
    public void makeCallsInOrderAndValidatedExpectingError ()
    {
        MockRestServiceServer server = MockRestServiceServer.bindTo(restTemplate).build();
        // first query expected (note that 'manyTimes()' means 1+)
        String firstQueryUrl = "http://127.0.0.1:9000/one";
        String firstQueryResponse = "{\"key\":1}";
        server
                .expect(manyTimes(), requestTo(firstQueryUrl))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(firstQueryResponse, MediaType.APPLICATION_JSON));
        // second query expected
        String secondQueryUrl = "http://127.0.0.1:9000/two";
        String secondQueryResponse = "{\"key\":2}";
        server
                .expect(min(2), requestTo(secondQueryUrl))
                .andExpect(method(HttpMethod.GET))
                .andRespond(withSuccess(secondQueryResponse, MediaType.APPLICATION_JSON));
        // now make the calls and verify
        String response;
        response = restTemplate.getForObject(firstQueryUrl, String.class);
        assertEquals(firstQueryResponse, response);
        response = restTemplate.getForObject(secondQueryUrl, String.class);
        assertEquals(secondQueryResponse, response);
        // I expect this to throw an exception
        server.verify();
    }
}
```

### Configure MockRestServiceService to ignore call order

```java
MockRestServiceServer server = MockRestServiceServer.bindTo(restTemplate).ignoreExpectOrder(true).build();
```
