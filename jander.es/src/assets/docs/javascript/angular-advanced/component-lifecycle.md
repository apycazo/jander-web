The life cycle for an angular component follows:

* **constructor**
* **ngOnChanges**: This will be invoked when some *input* property is updated.
* **ngOnInit**: Right after the component is initialized, and once after the first ngOnChanges.
* **ngDoCheck**
    * **ngAfterContentInit**: All content has been included in the view
    * **ngAfterContentChecked**
    * **ngAfterViewInit**: The component view has been fully initialized
    * **ngAfterViewChecked**
* **ngOnDestroy**

To implement any of them, just add an `implements` followed by the event, removing 'ng'. For example:

```typescript
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html'
})
export class TestComponent implements AfterViewInit {

    ngAfterViewInit() {
        // add your code here
  }
}
```

