Binding events to actions in Vue is quite easy, we just need to use the attribute `v-on:` followed by whatever event we want binded. For example, binding to `click` would be either `v-on:click`, if we use the full syntax, or `@click`, if we use the shorthand. 

Methods to call on events shall be written inside the `methods` key in Vue config. Following the previous example, we will add a button to update our value, so we can see how Vue automatically updated the computed value.

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
      <p>{{ dateInfo }}</p>  
      <p v-bind:title="dateInfo">Hover this to show the computed value</p>
      <p :title="dateInfo + '(using shorthand)'">Same as above, but using a shorthand</p>
      <button @click="updateValue">Click me to update the date 'value'</button>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                value: new Date().toISOString()
            },
            computed: {
                dateInfo: function () {
                    return 'Page generated at: ' + this.value;
                }
            },
            methods: {
                updateValue: function () {
                this.value = new Date().toISOString();
                }
            }
        });
    </script>
    
  </body>

</html>
``` 

You can toy with this example <a class="btn btn-sm btn-primary" href="https://plnkr.co/edit/pDoc1H?p=preview" target="_blank">Here</a>