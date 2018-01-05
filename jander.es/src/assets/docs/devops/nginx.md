## Redirect port 8081 to 10.0.1.1 port 80

```cson
server {

    listen      8081;
    server_name my-site-address.com
    
    location / {
        proxy_pass          http://10.0.1.1:80;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    Host $host;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Rewrite incoming URL and redirect

Example: Redirect http://{serverName}/test/path/some/other/file.txt to http://127.0.0.1:8787/some/other/file.txt

```cson
location ~ /test/path/(?<section>.+) {
  proxy_pass http://127.0.0.1:8787/$section;
}
```