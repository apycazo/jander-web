If we have more that a couple options, ng-switch can replace ng-if. This will receive a switch value condition, and mark which DOM elements to render in each case. The markup for this:

```html
<div ng-controller="DemoController">
    <div ng-switch on="counter">
        <span ng-switch-when="0">Counter has yet to start</span>
        <span ng-switch-default>Counter is active (value: {{counter}})</span>
        <span ng-switch-when="5">Counter has completed</span>
    </div>
</div>
```

And the sample controller:

```javascript
angular.module('app',[]).controller('DemoController', ($scope, $interval) => {
    $scope.counter = 0;
    $interval(() => $scope.counter++, 1000, 5);
});
```

This example will only show numbers 1-4, and change the DOM each second.

