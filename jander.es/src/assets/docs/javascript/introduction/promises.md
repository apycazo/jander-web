A promise is an asyncronous element for operations that need to return, and execute a callback when done. The most typical example of this is the http request. A promise notation is as follows:

```javascript
let operation = new Promise(resolve, reject);
```

Where 'resolve' is the function to call when everything is ok, and 'reject' when the promise has failed for whatever reason. A promise is the return value for many javascript functions. Suppose we have some complex operation to do, we can implement a function like:

```javascript
function myCostlyOperation (value = 0) {
    return promise = new Promise((resolve, reject) => {
        function task () {
            if (value % 2 == 0) {
                resolve('ok');
            } else {
                reject('only even numbers are good!');
            }
        }

        setTimeout(task, 3000);
    });
}
```

This function waits for 3 seconds, and then produces a result, calling 'resolve' if ok (the number was even) or calling reject (if the number was odd). Using a promise requires calling the method 'then' with the required functions (at least 'resolve', while 'reject' can be forfeited in some cases). This looks like this:

```javascript
myCostlyOperation(10).then(
    success => console.log('Completed: ', success),
    failure => console.error('Completed: ', failure)
);
```

Since the value passed (10) is an even number, the console will show the output *Completed: ok*.

### Wait for multiple promises to complete

The class `Promise` has a static method to wait for all of them to complete: `all(iterable)`. This way, we can do:

```javascript
function operation (value, delay = 3000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve('completed ' + value), delay);
    });
}

Promise.all([
    operation(1, 5000),
    operation(2, 2000)
]).then(results => {
    console.log(`Result[0]: ${results[0]} at ${new Date().toISOString()}`);
    console.log(`Result[1]: ${results[1]} at ${new Date().toISOString()}`)
});
```

The output of this (to show both were shown at the same time):

```text
Result[0]: completed 1 at 2018-01-09T21:34:38.655Z
Result[1]: completed 2 at 2018-01-09T21:34:38.655Z
```