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