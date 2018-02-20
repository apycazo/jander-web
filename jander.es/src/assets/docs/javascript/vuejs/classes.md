The same way we bind data, we can bind variable class values, so an element can use different CSS clases depending on the values we have. The syntax for this is either `v-bind:class` or the shorthand `:class`. These computed values can be used along with a regular `class` attribute.

Classes can be asigned using a construct like 'className' : 'condition', where condition can be a function, or a data element, like: 

```html
<p :class="{ myClassName : myCondition }">Stub</p>
```

Otherwise, we can assign a property with all info included, like: 

```html
<p :class="myClasses">Stub</p>
...
<script>
    new Vue({
        ...
        computed: {
            myClasses: function () {
                return {
                    myClassName: condition
                }
            }
        }
    });
</script>
```

Example of some validation using the previous example:

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
      <input v-model="inputValue" :class="{ danger : isValueTooLong }">
      <br>
      <p>Introduced value is: {{ inputValue }}</p>
      <p :class="status">Data is {{ isValueTooLong || inputValue.length === 0 ? 'invalid' : 'correct' }}</p>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
              inputValue: ''
            },
            computed: {
              isValueTooLong: function () {
                return this.inputValue && this.inputValue.length > 10;
              },
              status: function () {
                return {
                  danger: this.isValueTooLong,
                  valid: this.inputValue && this.inputValue.length > 0 && !this.isValueTooLong
                }
              }
            }
        });
    </script>
    
    <style>
      
      .danger {
        background-color: red;
      }
      
      .valid {
        background-color: green;
      }
    </style>
    
  </body>

</html>
```

