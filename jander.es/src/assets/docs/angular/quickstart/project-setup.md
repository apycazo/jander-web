#### Create new project, using sass as style, and generate routing

```bash
$ ng new jander.es --style=scss --routing
```

#### Add dependencies for bootstrap, jquery and fontawesome

```bash
$ npm install --save jquery bootstrap font-awesome
```

#### Angular-CLI generate options

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;}
.tg .tg-2cja{font-weight:bold;background-color:#656565;color:#ffffff;vertical-align:top}
.tg .tg-yw4l{vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-2cja">Scaffold</th>
    <th class="tg-2cja">Usage</th>
  </tr>
  <tr>
    <td class="tg-yw4l">Component</td>
    <td class="tg-yw4l">ng g component my-new-component</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Directive</td>
    <td class="tg-yw4l">ng g directive my-new-directive</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Pipe</td>
    <td class="tg-yw4l">ng g pipe my-new-pipe</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Service</td>
    <td class="tg-yw4l">ng g service my-new-service</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Class</td>
    <td class="tg-yw4l">ng g class my-new-class</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Guard</td>
    <td class="tg-yw4l">ng g guard my-new-guard</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Interface</td>
    <td class="tg-yw4l">ng g interface my-new-interface</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Enum</td>
    <td class="tg-yw4l">ng g enum my-new-enum</td>
  </tr>
  <tr>
    <td class="tg-yw4l">Module</td>
    <td class="tg-yw4l">ng g module my-module</td>
  </tr>
</table>

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









