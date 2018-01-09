A minimum AngularJS project requires, at least, importing the angularjs library, create a module, and include a controller. Going step by step, this means:

### Create index.html

First we need to create our initial html file, with the dependencies for angularjs, and any others we need. A sample template of this:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>

    <body>
        <p>This is the initial template content!</p>
    </body>
</html>
```

Next we need to import AngularJS into our web. We will also include a simple styling for it:

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
    </head>

    <body>
        <p class="demo">This is the initial template content!</p>
    </body>

    <style>
        .demo {
            padding: 20px;
            text-align: center;
        }
    </style>
</html>
```

### Create a main angular module

This will be our main app module, the expression for this is `angular.module({moduleName}, [dependencies])`. Dependencies can be empty, but not undefined, that would be the expression to *retrieve* an angular module. So, we will create this module, without any additional dependencies, and name it `app`. This last value is important, since we are going to need it after this.

```javascript
// create the main angular module
var app = angular.module('app',[]);
```

If we wanted to retrieve this module from, lets say, another file, we can do so:

```javascript
// fetches the main angular module
let app = angular.module('app');
```

In the future we might want to import additional modules into our app. For example, if we need the 'ngRoutes' module, we would use:

```javascript
var app = angular.module('app',['ngRoute']);
```

*(Note that ngRoute requires including an additional import on angularjs)*

### Create out first controller

We will create a controller for angular to start working. In this example we are just going to create a controller with the texts we included inline in the template.

The syntax to create a controller:

```javascript
// in case we do not already have a variable holding it
let app = angular.module('app');
app.controller('MainCtrl', function ($scope) {
    // our controller code
});
```

We have included '$scope' in the function signature, this indicates angularjs that we want a new scope to be created for this controller, and be passed as a parameter.

*(Note that this syntax is not really the best for production apps, since minifying the code will make angular to stop working properly, a better syntax will be described later)*

### Bind html DOM elements to angularjs data model

What we want in this case is for angularjs to handle updates on the data model, so any change also updates the DOM. To bind a value in angular we use the syntax: `{{value}}`. For example:

```html
<!-- this line -->
<p class="demo">This is the initial template content!</p>
<!-- becomes this -->
<p class="demo">{{welcome}}</p>
```

We also need to provide the data value to angularjs:

```javascript
$scope.welcome = 'This is the initial template content!';
```

For this to work we just need one more thing, indicate where angular should start worring about the DOM. Since we want it to handle all the page, we will indicate this with:

```html
<html ng-app="app">
```

¿Remember the value we said we would need before? This 'app' value is the name we gave out main angular module. We also need to bind out controller to the DOM we want to handle (since we will be having several controllers in the end).

We can bind the controller to any tag we want, in this case we want it to apply to the entire body. The syntax for this is:
```html
<body ng-controller="MainCtrl">
```

### Initial result

We now will have something like this:

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
    </head>

    <body ng-controller="MainCtrl">
        <p class="demo">{{welcome}}</p>
    </body>

    <script>
        // create angular application, and bind it to 'ng-app'
        var app = angular.module('app',[]);

        // main controller binding
        app.controller('MainCtrl', ['$scope', function ($scope) {
            $scope.welcome: 'This is the initial template content!';
        }]);
    </script>

    <style>
        .demo {
          padding: 20px;
          text-align: center;
        }
    </style>

</html>
```

Running this code should some the same value as before, but now is angular the responsible to handle everything.

### Proving angularjs is doing something!

To prove that angularjs is managing the data binding, we are going to make thing a little bit more complicated (not much tough). We will ask angular to inject another service, called `$interval`, and update the displayed value every 5 seconds. If will stop after reaching '10'.

We will include one slight improvement, instead of using the expression: `$scope.welcome = ...` we will use an angular function to merge the elements. While this is not required, it improves readability. This expression will end like: `angular.extend($scope, { welcome: '...'})`.

Also, the code will be compacted slightly to better fit an example:

```html
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <title>NG-Starter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.6/angular.min.js"></script>
    </head>

    <body ng-controller="MainCtrl">
        <p class="demo">{{welcome}} ({{counter}})</p>
    </body>

    <script>
        angular
            // create angular application, and bind it to 'ng-app'
            .module('app',[])
            // main controller binding
            .controller('MainCtrl', ($scope, $interval) => {
                angular.extend($scope, {
                    welcome: 'This is the initial template content!',
                    counter: 0
                });
                $interval(() => $scope.counter++, 5000, 10);
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

The output for this page should increase the value every 5 seconds, and be like this, after a while:

```text
This is the initial template content! (10)
```

Check this repository to get the source file: [sources](https://github.com/apycazo/jander-angularjs/blob/master/template-simple/ng-starter.html)



