Creating components in Vue is easy, just call the Vue method 'component' with the required component config. A very simple component would be like this:

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS intial setup</h1>
    <div id="app">
      <p>Component tag used below:</p>
      <about>
    </div>

    <script>

        Vue.component('about', {
            template: '<strong>Version: 1.0</strong>'
        });

        var vm = new Vue({
            el: '#app'
        });
    </script>

  </body>

</html>
```

Now, if we want to do something more useful, we probably want to pass data to the component, for example, we will create a component to render a table with a list of elements. To pass data to our component it has to include a list of properties to be binded.

NOTE: Do not use case-sensitive elements, if name separation is required, use kebab-case (hyphen-separated words).

Notice that we can use in a component the same we can use in the Vue constructor, with out exception: `data` must be a function, so instead of the regular data structure, we need to use something like this:

```js
Vue.component('version', {
    template: '<current version is {{ v }}',
    data: function () {
        return {
            v: '1.0-alpha'
        }
    }
})
```

An example of binded component, to render a table out of some data:

```html
<!DOCTYPE html>
<html>

  <head>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.5.13/dist/vue.js"></script>
  </head>

  <body>
    <h1>VueJS intial setup</h1>
    <div id="app">
      <p>Table data below</p>
      <datatable v-bind:rowdata="someDataList"></datatable>
    </div>

    <script>

        Vue.component('datatable', {
            props: ['rowdata'],
            template: `
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="row in rowdata">
                    <tr>
                      <td>{{ row.id }}</td>
                      <td>{{ row.value }}</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            `
        });

        var vm = new Vue({
            el: '#app',
            data: {
              someDataList: [
                { id: 0, value: 'first' },
                { id: 1, value: 'second' },
                { id: 2, value: 'third' }
              ]
            }
        });
    </script>

  </body>

</html>
```

In the example above we have iteraded over values inside the component template. If we want to iterate over the component itself, we need to provide a key for the elements, so Vue can properly keep track of them. For example, given the component:

```js
Vue.component('item-render', {
    props: ['element'],
    template: `<div>
        <span>Element to render is <strong>{{element}}</strong></span>
    </div>`
});
```

And the Vue config:

```js
new Vue({
    data: {
        records: [
            { id: 0, text: 'record one' },
            { id: 1, text: 'record two' },
            { id: 2, text: 'record three' }
        ]
    }
});
```

To iterate over them using the 'item-render' component, we need to do something like (notice the 'key' binding):

```html
<item-render v-for="element in records" :element="element" :key="element.id"></item-render>
```

