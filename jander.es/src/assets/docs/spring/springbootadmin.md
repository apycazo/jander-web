## Custom security

### Console user/password

Set the following properties:

```properties
# --- User name and password for the spring boot admin console
security.user.name      = admin
security.user.password  = 4dm1n
```

### Client registry with user/password

Set the following properties on the client service (example):

```properties
spring.boot.admin.username: demo
spring.boot.admin.password: d3m0
```

Include the security configuration (example):

```java
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter
{
    @Value("${security.user.name:admin}")
    private String consoleUserName;
    @Value("${security.user.password:4dm1n}")
    private String consoleUserPassword;

    // Optional, by default will use the properties for the console AND the app register
    @Autowired
    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception
    {
        auth.inMemoryAuthentication()
                .withUser(consoleUserName).password(consoleUserPassword).roles("admin")
                .and()
                .withUser("demo").password("d3m0").roles("app");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Page with login form is served as /login.html and does a POST on /login
        http.formLogin().loginPage("/login.html").loginProcessingUrl("/login").permitAll();
        // The UI does a POST on /logout on logout
        http.logout().logoutUrl("/logout");
        // The ui currently doesn't support csrf
        http.csrf().disable();

        // Requests for the login page and the static assets are allowed
        http.authorizeRequests()
                .antMatchers("/login.html", "/**/*.css", "/img/**", "/third-party/**")
                .permitAll();
        // ... and any other request needs to be authorized
        http.authorizeRequests().antMatchers("/**").authenticated();

        // Enable so that the clients can authenticate via HTTP basic for registering
        http.httpBasic();
    }

}
```