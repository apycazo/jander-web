To generate a component using the CLI:

```bash
ng generate service <service>
```

Or using the shorthand method: `ng g s <service>`. This works the same as with components.

The result will look like this:

**shared.service.ts**:
```typescript
import { Injectable } from '@angular/core';

// this means we can inject this service into other components.
@Injectable()

export class SharedService {
  constructor() { }
}
```

We will use this service to share some data and methods, for example: 

**shared.service.ts**:
```typescript
import { Injectable } from '@angular/core';

// this means we can inject this service into other components.
@Injectable()

export class SharedService {
  
  version = 1.0;

  constructor() { }

  fullVersion () { return `v${this.version}`; }
}
```

To use this service in a module, we need to include it, like this:

**app.module.ts**:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SharedService} from './shared.service';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  providers: [ SharedService ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
```

And then inject it into the client:

**app.component.ts**:
```typescript
import { Component } from '@angular/core';
import { SharedService} from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private sharedService: SharedService) {
    console.log('version: ', sharedSvc.version, ', full version:', sharedSvc.fullVersion());
    // output: 'version:  1 , full version: v1'
  }
}
```



