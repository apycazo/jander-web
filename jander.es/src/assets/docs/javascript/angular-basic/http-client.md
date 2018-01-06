### Description

In angular 4.3 a new http client module (named **HttpClientModule**) was made available, and since angular 5 the old one is considered as 'deprecated' (named **HttpModule**).

### Configuration

First, we need our module to import `HttpClientModule`, like in this example:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Services */
import { SharedService} from './shared.service';
import { TestComponent } from './home/test/test.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,    
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ SharedService ],
  bootstrap: [ AppComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
```

After this, we can use the client in our components, declaring it like:

```typescript
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  constructor(private http: HttpClient){
    // we can use http client from now on
  }
}
```

### Basic usage

**GET request (as subscription)**

```typescript
this.http.get('https://httpbin.org/get').subscribe(data => console.log('Data:', data));
```

Note that the following code gives an error:

```typescript
this.http.get('https://httpbin.org/get').subscribe(data => console.log('Origin:', data.origin));
```

This is because 'origin' is not part of 'object', to extract fields we need to use the string notation: `data['origin']` or define an interface like:

```typescript
export interface TestResponse {
    origin: string;
    // required for the 'post' example.
    data: string;
}
```

And repeat the call like:

```typescript
this.http.get<TestResponse>('https://httpbin.org/get').subscribe(data => console.log('Origin:', data.origin));
```

Note that the return type for 'get' is an observable like: `Observable<TestResponse>`.

**POST request**

Sending data is pretty much the same:

```typescript
const payload = {
    origin: '10.0.1.1'
};

this.http.post<TestResponse>('https://httpbin.org/post', payload).subscribe(res => {

    // note that httpbin returns the same as with 'get', but including received payload as string under 'data'.
    this.result = res.data && JSON.parse(res.data).origin || 'unknown';
});
```

### Request config

The requests can be configured using an additional parameter to include, for example, additional params, headers... an example of this:

```typescript
// some code ommited for brevity
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { TestResponse} from './test-response';

const payload = {
    origin: '10.0.1.1'
};

const config = {
    params: new HttpParams().set('status', 'ok'),
    headers: new HttpHeaders({ 'x-id': 'demo' })
};

this.http.post<TestResponse>('https://httpbin.org/post', payload, config).subscribe(res => {

    this.result = res.data && JSON.parse(res.data).origin || 'unknown';
    console.log(res);
});
```

