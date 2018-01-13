This directive allows us to generate DOM elements from a list, saving a lot of repetitive work. This directive works best with arrays, but can work iterating over an object's keys. The latter is not recommended though, as is actually not possible with angular 2+. Given the following controller:

```javascript
angular
    .module('app',[])
    .controller('DemoController', ($scope) => $scope.data = [{id:1, value:'one'},{id:2, value:'two'}]);
```

We can render the data inside a list using the markup:

```html
<ul ng-controller="DemoController">
    <li ng-repeat="element in data">{{element.value}}</li>
</ul>
```

With would render as:

```html
<ul>
    <li>one</li>
    <li>two</li>
</ul>
```

### ngRepeat on objects

To do the same using objects (result being exactly the same):

```javascript
angular
    .module('app',[])
    .controller('DemoController', ($scope) => $scope.data = {first: {value:'one'}}, second: {value:'two'}});
```

If we need the current iteraing key, the markup would be:

```html
<ul ng-controller="DemoController">
    <li ng-repeat="(key, element) in data">Key: {{key}}, Value: {{element.value}}</li>
</ul>
```

Note that ngRepeat will skip keys starting with '$', and that filters and orderBy won't work.

### Scope variables

Iterating usually requires some additional information, and angularjs gives us some additional information to add for the markup, the following are available:

* $index
* $odd
* $even
* $first
* $last

A markup example, listing some info:

```html
<ul ng-controller="DemoController">
    <li ng-repeat="element in data">index: {{$index}}, isFirst? {{$first}}, isEven? {{$even}}, value: {{element.value}}</li>
</ul>
```

### Duplicates and tracking

This directive uses the objects identity to determine when an object is different, to avoid recreating the entire affected DOM every time. If for some reason this value is not correct (we might for example have repeated items), the syntax 'track by' allows us to define the value to use. Track by must be the *last* expression to be used.

```html
<div ng-repeat="n in [42, 42, 43, 43] track by $index">{{n}}</div>
```

The default track by expression used would be:

```html
<div ng-repeat="item in collection track by $id(item)">{{n}}</div>
```


### Keeping filtered result in an alias

The result from filtering elements can be kept using the expresion `as {variableName}`. This could be done as this:

```javascript
angular
    .module('app',[])
    .controller('DemoController', ($scope) => $scope.data = {first: {value:'one'}}, second: {value:'two'}});
```

The following markup will render two lists, each with five elements, with the second not requiring the filter.
```html
<div ng-controller="DemoController">
    <ul>
        <li ng-repeat="element in data | limitTo:5 as reduced">{{element}}</li>
    </ul>
    <ul>
        <li ng-repeat="element in reduced">{{element}}</li>
    </ul>
</div>
```