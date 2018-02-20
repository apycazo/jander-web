To bind data to inputs we need to use a different attribute: instead of using `v-bind`, we will use `v-model`. The rest is more or less the same, and we can use values from 'data' or 'computed' however we like.

As usual, an example of this:

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS intial setup</h1>
    <div id="app">
      <span>Introduce a new value:</span>
      <input v-model="inputValue">
      <br>
      <p>Introduced value is: {{ inputValue }}</p>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                inputValue: ''
            }
        });
    </script>
    
  </body>

</html>
```