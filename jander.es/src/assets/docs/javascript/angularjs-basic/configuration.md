AngularJS uses the following syntax to declare configuration blocks. Notice that only *Providers* can be injected into this block (in angular they usually have 'provider' in the name, like '$filterProvider').

```javascript
angular.module('app', []).config(function(injectables) { // providers });
```

There are a few shorthand methods for the common providers (examples):
```javascript
angular
    .module('app', [])
    .value('version','1.0')
    .factory('adder', ...)
    .directive('onEnterKey', ...)
    .filter('allLowerCase', ...)
```

### Detailed example

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js"></script>
    </head>

    <body ng-controller="MainCtrl">
        <div class="demo">
            <p>[Version: {{version}}] {{welcome}} ({{counter}})</p>
            <p>Last update: {{lastUpdate | addBraces }}</p>
        </div>

    </body>

    <script>
        angular
          // creates angular application, and binds it to 'ng-app'
          .module('app',[])
          // define a simple value
          .value('version', '1.0')
          // defines a constant
          .constant('author', 'Andres Picazo')
          // creates a factory
          .factory('dateFactory', () => {
              return {
                  getDate: () => new Date().toISOString()
              }
          })
          // a service is like a factory or value, but called using 'new' (notice 'this').
          // they are practically the same, except in a few circunstances.
          .service('dateService', (dateFactory) => {
              this.getDate = () => new Date().toISOString();
          })
          // filters are factories that can be used in the DOM with '|'
          .filter('addBraces', () => {
              return (input) => {
                  return `[${input}]`;
              }
          })
          // initial config (placeholder only)
          .run(($rootScope, $window, $location) => {})
          // main controller binding
          .controller('MainCtrl', ($scope, $interval, version, dateFactory) => {
              angular.extend($scope, {
                  welcome: 'This is the initial template content!',
                  counter: 0,
                  version: version,
                  lastUpdate: dateFactory.getDate()
              });
              var intervalCounter = $interval(() => {
                $scope.counter++;
                $scope.lastUpdate = dateFactory.getDate();
              }, 5000, 10);

              // proper way to dispose of a $interval
              $scope.$on('$destroy', function() {

                  $interval.cancel(intervalCounter);
                  intervalCounter = undefined;
              });
          });
    </script>

    <style>
        .demo {
            padding: 20px;
            text-align: center;
        }
    </style>

</html>
```

### Creating a service

In the example we create 4 services, in 4 different ways:

**Using a value**: Values can NOT be injected into *config* blocks, and in exchange they can be captured by decorators.

```javascript
angular.module('app',[]).value('version', '1.0')
```

**Using a constant**: Constants can be injected into *config* blocks, but can NOT be captured by decorators.

```javascript
angular.module('app',[]).constant('author', 'Andres Picazo')
```

**Using a service**: This is a constructor function. Internally angularjs will call *new* to instance this object. Services can not be injected in a *config* block.

```javascript
angular.module('app',[]).service('dateService', (dateFactory) => {
    this.getDate = () => new Date().toISOString();
})
```

**Using a factory**: This is a generic service, does not return an object constructor, but an object already created. Factories can not be injected in a *config* block.

```javascript
angular.module('app',[]).factory('dateFactory', () => {
    return {
        getDate: () => new Date().toISOString()
    }
})
```

**Provider**: This is a configurable service. It can be injected both as a dependency and as a configuration. It is a service more generic than a factory. An example of this:

```javascript
angular.module('app',[])
    .provider('Version', function VersionProvider () {

        var version = 1.1;
        // this is only available on config blocks
        setVersion = (newValue) => version = newValue;
        // this is not available on config blocks
        getVersion = () => version;

        return {
            setVersion: (newValue) => version = newValue,
            // the $get function behaves as a service
            $get: () => {
                // this returned object behaves as a factory
                return {
                    getVersion: getVersion
                }
            }
        }
    })
    .config((VersionProvider) => {
        VersionProvider.setVersion(1.5);
    })
    // main controller binding
    .controller('MainCtrl', ($scope, Version) => {
        angular.extend($scope, {
            version: Version.getVersion()
        });
    });
```

There is one very important thing here to know: a provider name can not include 'Provider' in the name, and the function name must do, otherwise you might get a *modulerr* error message, which is quite complicated to debug.


### Filter

A filter allows use to use special notation pipe ('|') to transform objects. In the example we have implemented a filter that takes a value and wraps it in brackets:

```javascript
angular.module('app',[]).filter('addBraces', () => {
    return (input) => {
        return `[${input}]`;
    }
})
```

And use it like this, wrapping the text holded by 'lastUpdate':

```html
<p>Last update: {{lastUpdate | addBraces }}</p>
```

There are multiple predefined filters in angularjs:

* uppercase => `<p>{{'hi!' | uppercase}}<p>` renders as `HI!`.
* lowercase => `<p>{{'HI!' | lowercase}}<p>` renders as `hi!`.
* number:{decimals} => `<p>{{'35' | number:2}}<p>` renders as `35.00` (note that the number is optional).
* date:{format} => `<p>{{ "2018-01-12" | date:'yyyy'}}</p>`
* json: pretty prints json objects.
* limitTo: Limits iterables. Example: `<li ng-repeat="entry in list | limitTo:10"> {{item.id}} </li>`.

Filters can also be passed properties, separated in markup with ':', for example:

```javascript
angular.module('app',[]).filter('wrapWith', () => {
    return (input, left, right) => {
        left = left ? left : '"';
        right = right ? right : left;
        return `${left}${input}${right}`;
    }
})
```

```html
<ul ng-controller="DemoController">
    <li ng-repeat="element in data">{{element | wrapWith:'> ':' <'}}</li>
</ul>
```