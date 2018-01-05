## Configure HTTPS 

### Generate certificate file (windows) on c:\develop\develop.jks

*note: uses 'develop' as password.*

```bash
keytool -genkey -alias develop -keyalg RSA -file develop.csr -keystore d:\develop\develop.jks
```

### Configure https (/conf/server.xml)

```xml
<Connector 
    port="8443" 
    protocol="org.apache.coyote.http11.Http11Protocol" 
    SSLEnabled="true"
    maxThreads="150" 
    scheme="https" 
    secure="true"
    clientAuth="false" sslProtocol="TLS"
    keystoreFile="c:\develop\develop.jks"
    keystorePass="develop"/>
```

### Test

Start tomcat from `/bin/start.sh` or `/bin/start.bat`. Enter https://127.0.0.1:8443

**Warning!** Using https://localhost:8443


