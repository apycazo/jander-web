A simple starter file, for quick tests. <a class="btn btn-sm btn-primary" href="https://jsbin.com/japekik/1/edit?html,css,js,output" target="_blank">Check on JSBin</a>

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js"></script>
    </head>
    <body>
        <div ng-controller="MainCtrl" class="main">
            <p class="centered">Status: {{status}}, version: {{version}}</p>
        </div>
    </body>
    <!-- source script -->
    <script>
        angular.module('app',[])
          .run(($rootScope, $window, $location) => {})
          .factory('CommonSvc', () => {
              return {
                  getVersion: () => { return 1.1; }
              }
          })
          .controller('MainCtrl', ($scope, CommonSvc) => {
              angular.extend($scope, {
                status: 'working correctly',
                version: CommonSvc.getVersion()
              });
          });
    </script>
    <!-- custom styles -->
    <style>
        .main { padding: 20px; }
        .centered { text-align: center; }
    </style>
</html>
```
