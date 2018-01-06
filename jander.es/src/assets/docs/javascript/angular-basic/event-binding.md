Just like with properties, we can bind events to our views, the most typical is 'click', for a button for example.

This follows the same approach as before. Given the component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: '<div><button class="btn btn-primary" (click)="msg()">Click me</button></div>',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor() { }

  msg () {
    alert('clicked!');
  }
}
```

The event can be passed to the function, calling it like:

```html
<button (click)="msg($event)">Click me!</button>
```

Including this component anywhere with show a button, and clicking it will show an alert for it, the result of calling the method 'msg'.

Useful events:

* **Receive/Lose focus**: focus, blur
* **Submit button clicked**: submit
* **Button click/double click**: click, dblclick
* **Mouse presence**: mousenter, mousedown, mouseup
* **Keys**: keydown, keypress, keyup
* **Scroll**: scroll

