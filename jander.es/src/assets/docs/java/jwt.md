## Introduction
---

Json Web Tokens are a way to securely prove claims between entities, for example a token provided to a server might claim that its client has logged in, and has the role of an administrator. These tokens are useful for single-sign-on purposes, so one can log into one system and still be recognized by a different, yet related one.

## Framework for java/maven
---

To create a JWT token using java we can use the library `io.jsonwebtoken.jjwt`, which is pretty simple and straightforward to use. To begin, include the following dependency into your maven config:

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt</artifactId>
    <version>0.9.0</version>
</dependency>
```

## Properties
---

The JWT token requires a couple configuration settings to work:

* Secret key: This is the key the server uses to encrypt the token, and to recognize it.
* Encryption algorithm: The specific implementation to be used for the key and/or the signature itself.

## Sample session service
---

A sample service to generate and validate JWT tokens (it just validates that there is a claim):

```java
@Service
public class SessionManager
{
    private static final Logger log = LoggerFactory.getLogger(SessionManager.class);
    private String secret = "B^#vdaD$ZEM8j<>";
    private String keyAlgorithm = "AES";
    private long tokenTimeToLiveInSeconds = 300;

    private final Key key;

    public SessionManager ()
    {
        this.key = new SecretKeySpec(secret.getBytes(), keyAlgorithm);
    }

    public String generateSession (String username) {

        long ttl = tokenTimeToLiveInSeconds * 1000;
        Date expiration = new Date(Instant.now().toEpochMilli() + ttl);

        return Jwts.builder()
                .setSubject(username)
                .setExpiration(expiration)
                .signWith(SignatureAlgorithm.HS512, key)
                .compact();
    }

    public boolean isSessionValid (String session)
    {
        try {
            String subject = Jwts.parser().setSigningKey(key).parseClaimsJws(session).getBody().getSubject();
            log.info("Session key for user '{}' is valid", subject);
            return !StringUtils.isEmpty(subject);
        } catch (Exception e) {
            log.info("Session key seems invalid ({})", e.getMessage());
            return false;
        }
    }
}
```

## Bearer request
---

The requests using JWT tokens need to provide the header 'Authorization', using as key the JWT token to use, prepended with 'Bearer', for example:

```header
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

## Detailed example
---

An implementation of a library using JWT tokens can be found <a class="btn btn-sm btn-primary" href="https://github.com/apycazo/api-gateway/tree/master/api-gateway-provider/src/main/java/com/github/apycazo/api/gateway/provider" target="_blank">Here</a>