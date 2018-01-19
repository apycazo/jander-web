### Basics

Angular deals with forms by adding a few internal logic to it, keeping track of when as it been modified, or if all fields pass validation. To access this features, the form must have defined the property `name`. If this property is set, angular will bind status properties to it.

For example, a very simple form would look like this:

```html
<form name="demoForm">
    <label>Name <input type="text" ng-model="data.name"/></label>
    <p>Form modified?: {{demoForm.$dirty}}</p>
</form>
```

AngularJS will bind a few useful status element to `demoForm`:

* **$pristine**: The form has not been modified.
* **$dirty**: The form has changes.
* **$submitted**: The form has already been submitted.
* **$valid**: The form passes validation.

Additionally, we can bind useful properties to field including a `name` property:

```html
<form name="demoForm">
    <label>Name <input type="text" ng-model="data.name" name="username"/></label>
    <span>Form modified?: {{demoForm.$dirty}}</span>
    <br>
    <span>User name entered?: {{demoForm.username.$touched}}</span>
    <br>
</form>
```

Some useful properties:

* **$touched**: True when the field has been modified.
* **$untouched**: True when no modification have been made to the field.
* **$valid**: Field passes validation.
* **$invalid**: Field contains validation errors.
* **$error**: Required an additional key for each error to check (see below).

### Form validation

To include validation in a form, first we need to disable browser navigation using the property `novalidation`. Done that, we can include the required validation. On validation, angular will add the following css clases, extracted from the angular documentation:

>* ng-valid: the model is valid
>* ng-invalid: the model is invalid
>* ng-valid-[key]: for each valid key added by $setValidity
>* ng-invalid-[key]: for each invalid key added by $setValidity
>* ng-pristine: the control hasn't been interacted with yet
>* ng-dirty: the control has been interacted with
>* ng-touched: the control has been blurred
>* ng-untouched: the control hasn't been blurred
>* ng-pending: any $asyncValidators are unfulfilled

To require an element, simply use the property 'required', this will use the input 'type' to properly validate the value. Also we can bind an element to show only when the value is entered, but invalid:

```html
<form name="demoForm">
    <label>Name <input type="text" ng-model="data.name" name="username" required/></label>
    <div ng-show="demoForm.username.$touched && demoForm.username.$error.required">A name is required</div>
</form>
```

Validation properties include: `required`, `pattern`, `minlength`, `maxlength`, `min`, `max`.

An example using a number:

```html
<form name="demoForm">
    <label>Size <input type="number" ng-model="data.size" name="size" min="1" max="5" required/></label>
</form>
```

### Example

Check below a simple form, or <a class="btn btn-sm btn-primary" href="https://plnkr.co/edit/sQiizd3boFAJrU5XFfp4?p=preview" target="_blank">Check in Plunker</a>.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta name="description" content="angular form">
    <title>NG-Starter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.7/angular.min.js"></script>
    
    <script src="script.js"></script>
    <link rel="stylesheet" href="style.css">
  </head>
  <body ng-app="app">
    <div ng-controller="MainCtrl" class="main">
      <p class="centered">Status: {{status}}</p>
      <form novalidate name="userForm">
        <label>Name: 
          <input 
            type="text" 
            ng-model="formData.name" 
            required />
        </label>
        <br/>
        <label>E-mail: 
          <input 
            type="email" 
            ng-model="formData.email" 
            required />
        </label>
        <br />
        <input 
               type="submit" 
               ng-click="save(formData)" 
               value="Save" 
               ng-disabled="userForm.$invalid"/>
               
        <p>Data: <code>{{formData | json}}</code></p>
      </form>
    </div>
  </body>
</html>
```

```js
angular
.module('app',[])
.controller('MainCtrl', ($scope) => {
  angular.extend($scope, {
    status: 'working correctly',
    formData: {},
    save: (data) => alert(JSON.stringify(data))
  });
});
```
