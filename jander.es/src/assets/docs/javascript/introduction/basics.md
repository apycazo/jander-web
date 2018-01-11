### Variable modifiers

There are three main modifiers: `let`, `var`, and `const`. The differences between them being:

* **let**: is a current-scope only variable, it won't be available anywhere else.
* **var**: this variable will persist, and be available to other scopes.
* **const** this is basically an immutable `var`.

### Iterator: For

Typical for-loop, in case the index is required or more than one value increment is required.

```javascript
{
    let values = [1,2,3,4];
    let sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i];
    }
    // sum = 10
}
```

### Iterator: For-Each

This is the preferred way to iterate an array, since it prevents index of bounds errors.

```javascript
{
    let sum = 0;
    [1,2,3,4].forEach(x => sum += x);
    // sum: 10
}
```

### Function

The following example defines a function with a default-valued parameter

```javascript
{
    function addOdds (a, c = 0) {
        return c += a % 2 == 0 ? a : 0;
    }
    let sum;
    [1,2,3,4].forEach(v => sum = addOdds(v, sum));
    // sum: 6
}
```

### Map function

This is very used function, which transforms an array into another with modified elements. In the following example we will generate another array, which values that are ten times the original ones, and then we will sum up all values.

```javascript
{
    let tenTimes = [1,2,3,4].map(v => v * 10);
    let res = 0;
    tenTimes.forEach(v => res += v);
    // res: 100
}
```
### Reduce

A simpler way to do the sum would have been using 'reduce'. This function takes an accumulator variable and the current iteration element, and applies whatever function is required for it. 

In this case we are initializing the accumulator to '0', just for clarity.

```javascript
{
    let res = [1,2,3,4].reduce((acc = 0, v) => acc += v);
    // res: 10
}
```

### Map-Reduce

This two functions can be effectively chained to transform and process data. The next example will create a number array from a string one, and then sum the values.

```javascript
{
    let res = ['v:1','v:2','v:3','v:4']
        .map(v => parseInt(v.replace('v:','')))
        .reduce((acc = 0, v) => acc += v);
    // res: 10
}
```

### Spread arrays

This can be used to extend an array with values from another. Consider the example below:

```javascript
{
    let arr = [5,10];
    let data = [1,2,3,4,...arr]; // arr: [1,2,3,4,5,10]
    let res = data.reduce((acc, v) => acc += v); // res: 25
}
```

### Object interpolation

To create an object from other variables, we can use:

```javascript
{
    let a = 10; let b = 20;
    let data = { a: a, b: b };
}
```

Or the more efficient:

```javascript
{
    let a = 10; let b = 20;
    let data = { a,b };
}
```

### Variable assignments from objects

The reverse also has a shorthand method. Given an object, we can extract its values to other variables like:

```javascript
{
    let source = { 
        id: '1', 
        value: 'test', 
        ignored: true, 
        complex : { 
            z : true
        }
    };
    let id = source.id;
    let value = source.value;
    let z = source.complex.z;
}
```

Or the more efficient

```javascript
{
    let source = { id: '1', value: 'test', ignored: true, complex : { z : true} };
    let { id, value , complex: {z} } = source;
}
```

