

        TO BE REVIEWED: https://blog.angular-university.io/angular-ng-template-ng-container-ngtemplateoutlet/

Since angular directives ofter mess with the DOM structure, adding elements, for example, CSS styles might render things in unexpected ways.
For example, angular replaces:

```html
<div *ngIf="test" class="cool-element">
    <p>Value</p>
</div>
```

With:

<ng-template [ngIf]="test">
  <div class="cool-element">Value</div>
</ng-template>

To avoid problems with the rendering or the styling, the tag 'ng-container' can be used. This would change this to look like:

```html
<!-- markup -->
<ng-container *ngIf="test" class="cool-element">Value</ng-container>
```

The point being, `ng-container` tags will NOT be rendered by Angular, thus preventing errors.