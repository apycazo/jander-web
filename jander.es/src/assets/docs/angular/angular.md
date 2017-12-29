# Angular quick start

## Project set up

#### Create new project, using sass as style, and generate routing

```bash
$ ng new jander.es --style=scss --routing
```

#### Add dependencies for bootstrap, jquery and fontawesome

```bash
$ npm install --save jquery bootstrap font-awesome
```

#### Add bootrstrap and fontawesome to the styles file

Edit the styles.scss file with:

```scss
@import "~bootstrap/dist/css/bootstrap.min.css";
@import "~font-awesome/css/font-awesome.css";
```

Edit the `.angular-cli.json` file to import the scripts:

```json
{
    ...
    "scripts": [
        "../node_modules/jquery/dist/jquery.min.js",
        "../node_modules/bootstrap/dist/js/bootstrap.js"
    ],
    ...
}
```

#### Enable custom tags on karma tests

Modules with custom tags might require something like this for karma tests to run (prevents *Template parse errors*).

1. Import **CUSTOM_ELEMENTS_SCHEMA**.
2. Add the imported artifact to 'schemas'.


```typescript
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent, NavbarComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
```
