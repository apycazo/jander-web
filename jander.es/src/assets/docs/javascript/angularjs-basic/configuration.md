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

Let's examine a detailed example

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
          // create angular application, and bind it to 'ng-app'
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

(TBC)