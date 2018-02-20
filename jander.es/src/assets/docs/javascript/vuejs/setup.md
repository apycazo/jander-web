VueJs is quite similar to AngularJS, so we will follow more or less the same approach. First, we are going to create a very basic application,
showing the data binding to get us started.

Notice that, similarly to angularJS, we tell Vue where to start, by providing an anchor element, in this case located by the id 'app':

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS intial setup</h1>
    <div id="app">
      <p>Binded value is '{{ value }}'</p>  
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                value: new Date().toISOString()
            }
        });
    </script>
    
  </body>

</html>
```
