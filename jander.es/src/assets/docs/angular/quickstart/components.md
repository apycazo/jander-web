To generate a component using the CLI:

```bash
ng generate component <componentPath>
```

Note that all components reside in `src/app`, so, if we run `ng generate component test/foo` we will get a component in `src/app/test/foo`.

**Shorthand**: The same can be done with `ng g c <componentPath>`.

This generates a component like the default one:

**app.component.ts**:
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    // empty on creation
  }
}
```

And includes the component inside the main module:

**app.module.ts**:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [ AppComponent ],
  imports: [ BrowserModule ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
```