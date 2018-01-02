Also called 'interpolation', to bind a property included in a controller there are multiple approaches. Suppose we have a controller like:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  id = 'main-app';

  constructor() {
    
  }
}
```

We can bind this id like:

```html
<!-- first form -->
<app-root id="{{id}}"></app-root>
<!-- second form -->
<app-root [id]="id"></app-root>
```

In both cases the output will be:

```html
<app-root id="main-app"></app-root>
```
