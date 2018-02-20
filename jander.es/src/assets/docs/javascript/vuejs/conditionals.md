We have two ways to hide/show elements in Vue (just like in AngularJS), one of them hides the element using css, but actually renders the DOM, and the other just does not render anything it does not need.

### Using v-show

The first method uses the attribute v-show along with the required condition. The condition can be a binded value (recommended) or a function. An example of this:

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS show/hide using v-show</h1>
    <div id="app">
      <p>The disappearing value is (<span v-show="showElement">Here!</span>).</p>
      <button @click="toggleView">{{ buttonText }}</button>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                showElement: true
            },
            computed: {
                buttonText: function () {
                    return this.showElement ? 'Hide' : 'Show';
                }
            },
            methods: {
                toggleView: function () {
                    this.showElement = !this.showElement;
                }
            }
        });
    </script>
    
  </body>

</html>
```


### Using if-then-else

The second form, which does not render things it does not have to uses several attributes, not all of them mandatory, following the typical 'if-then-else' forms:

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS show/hide using v-show</h1>
    <div id="app">
      <p>
        The changing value is:
            <span v-if="value === 1">One!</span>
            <span v-else-if="value === 2">Two!</span>
            <span v-else>Three or four!</span>
      </p>
      <button @click="inc">Next value: {{ value + 1 }}</button>
    </div>
    
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                value: 1
            }
            methods: {
                inc: function () {
                    this.value++;
                    if (this.value >= 5) this.value = 1;
                }
            }
        });
    </script>
    
  </body>

</html>
```

### Using templates

If we want to include control structures like this, but do not want to include them in the same elements to apply, or want to group several of them, we can use the tag `template`, which will not be rendered at all, keeping things neat when multiple elements are used:

```html
<div>
    <template v-if="userIsAdmin">
        <!-- elements only for the admin -->
    </template>
</div>
```
