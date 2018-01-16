As an AngularJS project grows, keeping everything inside a single html page is not practical, and angularjs provides with an internal page routing mechanism that hides the page loading effect when changing from page to page (what is known as a Single Page Interface, or SPI). Angular will load templates and apply changes in the background so the user notices nothing.

This mechanism requires loading and injecting a new module: `ngRoute`, which in NOT part of the regular angularjs module. We need to import ngRoute with something like:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.8/angular-route.min.js"></script>
```

And inject into our module with:

```js
let app = angular.module('app',['ngRoute']);
```

Next we need to configure out routing, injecting a provider named `$routeProvider` into a config block. Next we can define the routing we want, including the template to use and the controller to handle it. This template can be injected inline using `template` or as a file reference using `templateUrl`.

An example config block using these, and a redirect on default:

```js
angular
    .module('app',['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
        .when("/first", {
            controller: "FirstCtrl",
            templateUrl: "firstPage.html"
        })
        .when("/second", {
            controller: "SecondCtrl",
            template: '<h2>Controller ID (2): {{value}}</h2>'
        })
        .otherwise({ redirectTo: "/first" });
    })
```

This example loads the template file named 'firstPage.html' on a request URL like: `http://localhost:8080/ng-demo.html#!/first`. The second page uses an inline template instead, and when the value is not recognized, redirect to the fist.

### Inline templates

If the templates are too big to include inside the javascript file, and too small to be worth of a separate file, a script can be used instead. This is not recommended, but since it is useful for small, self-contained demos, an example is provided.

In this case, insted of creating a separate file for 'firstPage.html', we can include the following:

```html
<script type="text/ng-template" id="firstPage.html">
    <h2>Controller ID (1): {{value}}</h2>
</script> 
```

### Internal routing links

To use links and redirections inside AngularJS routes, create links with format `#!<route>`. For example, the following will match route '/first':

```html
<a href="#!first">Go to first page</a>
```

### Routing with parameters

If we need to pass values to the controller though the URL, we can use the syntax `:<varName>` to add parameters tho the mapping. If we wanted a url to display data on a book, given a book id, managed by the same controller, we would use a route like `#!books/:id`.

To access the parameters we need to inject `$routeParams` in the controller, and then we can access each value using the same name we included in the route (For example, `$routeParams.id` in this case).

### Basic example

A complete example using these features can be reviewed below, or <a class="btn btn-sm btn-primary" href="https://jsbin.com/bakibap/1/edit?html,js,output" target="_blank">Check on JSBin</a>, or <a class="btn btn-sm btn-primary" href="https://github.com/apycazo/jander-angularjs/blob/master/demo/ng-route-demo.html" target="_blank">Check on GitHub</a>. 

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.8/angular.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.8/angular-route.min.js"></script>
  <title>AngularJS routing</title>
</head>
<body ng-app="app">

  <div>
    <h3>Angular routing example</h3>
    <a href="#!first">First</a>
    <a href="#!first/myId">First with param</a>
    <a href="#!second">Second</a>
  </div>

  <div >
    <span>Content is generated below</span><hr>
    <ng-view></ng-view>
    <hr><span>Page end</span>
  </div>

  <!-- inline html content for the example -->
  <script type="text/ng-template" id="firstPage.html">
    <h2>Controller ID (1): {{value}} (id? {{id}})</h2>
  </script>
  <script type="text/ng-template" id="secondPage.html">
    <h2>Controller ID (2): {{value}}</h2>
  </script>

  <script>
  angular
    .module('app',['ngRoute'])
    .config(function ($routeProvider) {
      $routeProvider
        .when("/first", {
          controller: "FirstCtrl",
          templateUrl: "firstPage.html"
        })
        .when("/first/:id", {
          controller: "FirstCtrl",
          templateUrl: "firstPage.html"
        })
        .when("/second", {
          controller: "SecondCtrl",
          template: '<h2>Controller ID (2): {{value}}</h2>'
        })
        .otherwise({ redirectTo: "/first" });
    })
    .controller('FirstCtrl', function FirstCtrl ($scope, $routeParams) {
      $scope.value = 'FirstController';
      $scope.id = $routeParams.id ? $routeParams.id : 'unknown';
    })
    .controller('SecondCtrl', function SecondCtrl ($scope) {
      $scope.value = 'SecondController';
    });

  </script>

</body>
</html>
```