### Basic usage

To iterate over elements angular provides the directive `ngFor`, which is good for any iterable type. A simple example, given:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: '<div><p *ngFor="let element of data">element id {{element.id}} has value: {{element.value}}</p></div>',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  readonly data = [
    { id: 1, value: 'one' },
    { id: 2, value: 'two' },
    { id: 3, value: 'three' }
  ];

  constructor() { }
}
```

The generated html from using the custom tag `app-test` should be like:

```html
<div>
    <p>element id 1 has value: one</p>
    <p>element id 2 has value: two</p>
    <p>element id 3 has value: three</p>
</div>
```

### Tracking elements

For angular not to constantly replace all dom elements each time a change is made to the backing data, the object id is usuallu employed. If this is not acceptable, we can use a custom `trackBy` element. The notation for this is simple, using the example from above:

```javascript
let element of data; trackBy: id
```

Or if we want to use a method:

```javascript
let element of data; trackBy: elementId
```

Where `elementId` is a component function like:

```javascript
elementId (element) {
    return element ? element.id : undefined;
}
```

### Extracting metadata

This core directive includes some additional information about the loop iteration, which can be extracted to be used. The most common are:

* **first**: `let first = first`.
* **last**: `let last = last`.
* **even**: `let even = even`.
* **odd**: `let odd = odd`.
* **index**: `let index = index`.
* **even**: `let even = even`.

An example of this:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  template: `
    <div *ngFor="let element of data; let i = index; let first = first; let last = last">
        <p>Element {{element.value}}, index: {{i}}, first?: {{first}}, last?: {{last}}</p>
    </div>`,
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  readonly data = [
    { id: 1, value: 'one' },
    { id: 2, value: 'two' },
    { id: 3, value: 'three' }
  ];

  constructor() { }
}
```

Yields the following result:

```html
<div>
    <p>Yields the following result: Element one, index: 0, first?: true, last?: false</p>
    <p>Yields the following result: Element two, index: 1, first?: false, last?: false</p>
    <p>Yields the following result: Element three, index: 2, first?: false, last?: true</p>
</div>
```


