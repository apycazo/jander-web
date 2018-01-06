### Defining

A prototype is the basis of every javascript object, and they are also objects themselves. All javascript objects inherit from `Object.prototype`. Prototypes can be creates in multiple ways, and instanced with the `new`keyword. Consider the following:

```javascript
function Test (value) {
    this.value = 'Assigned value is: ' + value;
}

let tester = new Test('demo'):
console.log(tester.value);
// output: Assigned value is: demo
```

### Modifying prototypes

Given the test object:

```javascript
function Test (x, y) {
    this.x = x;
    this.y = y;
}

let test = new Test(1,2);
```
Add a new property to an object:

```javascript
test.z = 3;
console.log(`x:${test.x},y:${test.y},z:${test.z}`);
// output: x:1,y:2,z:3
```

Add a new method to an object:

```javascript
test.details = function () {
    return `x:${this.x},y:${this.y}`
}
console.log(test.details());
// output: x:1,y:2
```

Adding elements to a prototype is a bit different from an object, for example, we can not do:

```javascript
Test.details = function () {
    return `x:${this.x},y:${this.y}`
}
```

Instead, we need to access the underlaying *prototype* object:

```javascript
Test.prototype.details = function () {
    return `x:${this.x},y:${this.y}`
}
```

Note that modifying a prototype will apply not only to objects instanced after the update, but all existing objects. This for example is valid:

```javascript
function Test (x, y) {
    this.x = x;
    this.y = y;
}

let test = new Test(1,2);

Test.prototype.details = function () {
    return `x:${this.x},y:${this.y}`
}
console.log('Details:' , test.details());
// output: x:1,y:2
```





