### Basic usage

Another useful core directive is `ngIf`. Depending on the conditions given, part of the DOM will not be rendered. An example application:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <button class="btn btn-default" (click)="switch()">Switch value</button>
        <p>Content always visible</p>
        <p *ngIf="isHidden">Optional content</p>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  isHidden = true;

  constructor() { }

  switch () {

    this.isHidden = !this.isHidden;
  }
}
```

This will render two values, and one of them will be added or removed from the DOM each time the button is clicked. Note that the behaviour of this is fundamentally different from this:

```html
<p [hidden]="isHidden">...</p>
```

Hidding a value will modify the css `display` property, but the value will still be rendered. Using ngIf will modify the DOM.

### If-then-else

We can bind different templates to different conditions. Consider the following example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <button class="btn btn-default" (click)="switch()">switch ({{value}})</button>
        <p>Content always visible</p>
        <p *ngIf="value == 'one'; else second">Value {{value}} == 'one'</p>
        <ng-template #second>
          <p>Value {{value}} == 'two'</p>
        </ng-template>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  value = 'one';

  constructor() { }

  switch () {
    this.value = this.value === 'one' ? 'two' : 'one';
  }
}
```

The ngIf condition in this case is `value == 'one'; else second`, which tells angular to render current tag when 'value' equals 'one'. Otherwise, 
it should render the `ng-template` with id `second`.

Take into account that the following notation is also valid:

```typescript
*ngIf="condition; then whenTrue; else whenFalse"
```

An example:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div>
        <button class="btn btn-default" (click)="switch()">switch ({{value}})</button>
        <p>Content always visible</p>
        <div *ngIf="value == 'one'; then first; else second">
        <ng-template #first>
          <p>Value {{value}} == 'first'</p>
        </ng-template>
        <ng-template #second>
          <p>Value {{value}} == 'two'</p>
        </ng-template>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  value = 'one';

  constructor() { }

  switch () {
    this.value = this.value === 'one' ? 'two' : 'one';
  }
}
```


