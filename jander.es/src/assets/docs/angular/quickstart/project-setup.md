#### Create new project, using sass as style, and generate routing

```bash
$ ng new jander.es --style=scss --routing
```

#### Add dependencies for bootstrap, jquery and fontawesome

```bash
$ npm install --save jquery bootstrap font-awesome
```

#### Angular-CLI generate options

| Scaffold  | Usage                           |
|:---------:|:-------------------------------:|
| Component | ng g component my-new-component |
| Directive | ng g directive my-new-directive |
| Pipe      | ng g pipe my-new-pipe           |
| Service   | ng g service my-new-service     |
| Class     | ng g class my-new-class         |
| Guard     | ng g guard my-new-guard         |
| Interface | ng g interface my-new-interface |
| Enum      | ng g enum my-new-enum           |
| Module    | ng g module my-module           |

#### Add bootstrap and fontawesome to the styles file

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









