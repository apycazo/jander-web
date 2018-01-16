This directive is useful when we do not want to render part of the DOM depending on a condition. The markup for this is:

```html
<div ng-controller="DemoController">
    <div ng-if="condition">$scope.condition value is: true</div>
</div>
```

This is a different another option, which will render the DOM, and use 'display' to hide it.

```html
<div ng-controller="DemoController">
    <div ng-show="condition">$scope.condition value is: true</div>
</div>
```
