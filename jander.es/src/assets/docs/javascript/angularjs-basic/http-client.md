The http client can be used injecting the service '$http', and using it's promises like:

### Get requests

Simple request, http get without configuration.

```html
<div ng-controller="DemoController">
    <span>{{origin || 'unknown'}}</span>
</div>
```

```javascript
angular.module('app',[]).controller('DemoController', ($scope, $http) => {
    $http.get('https://httpbin.org/get').then(
        response => $scope.origin = response.data.origin
    );
});
```

Request with headers and parameters

```javascript
angular.module('app',[]).controller('DemoController', ($scope, $http) => {
    let config = {
        headers: {
            'Accept': 'application/json'
        },
        params: {
            'test': true
        }
    }
    $http.get('https://httpbin.org/get', config).then(
        response => {
            $scope.origin = response.data.origin;
            $scope.test = response.data.args.test;
        }
    );
});
```

### Post requests

More or less the same, except that params are: `$http.post(url, content, config)`. An example:

```javascript
angular.module('app',[]).controller('DemoController', ($scope, $http) => {
    let config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    let data = {
        value: true
    };
    $http.post('https://httpbin.org/post', data, config).then(
        response => {
            $scope.echo = response.data.data;
        }
    );
});
```


