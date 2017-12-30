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

## Components

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

## Services

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

## Quick notes

#### Jquery

To use jquery, `$` must be declared as variable:

```typescript
import { Component, } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent {

  constructor() {
    const = $('h1');
    // ...    
  }
}
```

#### Using @ViewChild

To select child elements, the decorator `@ViewChild` can be used to fetch, either the component by name, or the dom element by tag id. For example,
given the html (file: 'test.component.html'):

```html
<div id="element">
  <p #first>First paragraph</p>
  <p #second>Second paragraph</p>
</div>
```

To query the element '#first' from a **parent** component, we can code:

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html'
})
export class TestComponent implements AfterViewInit {
  
  @ViewChild('fist') 
	private firstElement : ElementRef;
	@ViewChild('second') 
	private secondElement : ElementRef;
	
	ngAfterViewInit() {

    console.log(this.firstElement.nativeElement.textContent);
    // output: 'First paragraph'
    console.log(this.secondElement.nativeElement.textContent);
    // output: 'Second paragraph'
  }
}  
```

## Deploying

To generate production ready sources use, for example:

```bash
$ ng build --prod --base-href="https://jander.es"
```

Where `--prod` optimizes files for uploading and serving, and `--base-href` sets the base path for routing.





