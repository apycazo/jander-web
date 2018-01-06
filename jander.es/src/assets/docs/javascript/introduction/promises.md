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