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