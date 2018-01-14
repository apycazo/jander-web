The directive switch works similar to ngIf, but can have multiple condition values to match. An example of this:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <button class="btn btn-default" (click)="inc()">Switch value</button>
        <div [ngSwitch]="value">
            <p *ngSwitchCase="0">Value is 0</p>
            <p *ngSwitchCase="1">Value is 1</p>
            <p *ngSwitchCase="2">Value is 2</p>
            <p *ngSwitchDefault>Value is too large!</p>
        </div>
        <p *ngIf="isHidden">Optional content</p>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  value = 0;

  constructor() { }

  inc () {
    this.value++;
  }
}
```

This will alternate between multiple dom elements, until it reaches a default value.