We can also create custom 'pipes' or transformers, from the cli using:

```bash
ng generate pipe my-pipe
```

This will leave us with something like this:

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keylist'
})
export class KeylistPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      // out code goes here
  }
}
```

For example, we can use the following code to filter (sanitize) URLs bypassing security:

```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizer'
})
export class SanitizerPipe implements PipeTransform {

  constructor (private sanitizer: DomSanitizer) {
      // just to add the sanitizer
  }

  transform(value: any, args?: any): any {

    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
```

And use it like:

```html
<div [innerHTML]="htmlFiled | sanitizer"></div>
```
