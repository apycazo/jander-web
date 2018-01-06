### Implementation

The way to define and use a class is quite straightforward. They can be implemented through declarations, or expressions:

**Declaration**

```javascript
class Point {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    getX() { return this.x }
    getY() { return this.y }
}

let a = new Point(10,20);
let b = new Point(12,8);
```

**Expression**

```javascript
const simplePoint = class Point {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
    getX() { return this.x }
    getY() { return this.y }
    }

let a = new simplePoint(5,6);
```

### Extending classes

To extend a class we just need to use the `extends`keyword, like in this example:

```javascript
class VerbosePoint extends Point {

    details () { return `[${this.x},${this.y}]`}
}
```

This class uses the same constructor as the inherited class, but if we want to modify the constructor, we can use the keyword *super* to invoke the parent class:

```javascript
// this class forces a point coordinates to have a max value
class PointInRange extends Point {
    constructor (x, y, max) {
        // super MUST be called before this
        super(x,y)
        if (this.x > max) this.x = max;
        if (this.y > max) this.y = max;
    }
}
let a = new PointInRange(100, 60, 80);
console.log(`Point [${a.getX()}, ${a.getY()}]`);
// output: Point [80, 60]
```

### Method override

To override a parent class method, we only need to reimplement them using the same signature, and using the keywork *super* to access parent method if we want. A complete example:

```javascript
// --- base class
class Point {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    getX() { return this.x }
    getY() { return this.y }
    details() { return `[${this.x},${this.y}]`}
}

// --- extended class
class PointInRange extends Point {
    constructor (x, y, max) {
        // super MUST be called before this
        super(x,y)
        if (this.x > max) this.x = max;
        if (this.y > max) this.y = max;
    }
    // overriden function
    details() { return `Location x,y = ${super.details()}`}
}
let a = new PointInRange(100, 60, 80);
console.log(a.details());
// output: Location x,y = [80, 60]
```

### Statics

Classes support static methods using the keyword *static*. Note that these methods do not have access to anything using `this.` expressions. Note that the static functions are usually available ONLY to the classes, and not the instances, if we want to access a class static from an instance we need to use the method 'constructor.{staticFunctionName}', like in the example below, but it is not recommended.

```javascript
class Point {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    static version () { return 1.1; }
    getX() { return this.x }
    getY() { return this.y }
}

let a = new Point(0,10);

console.log(`Class version: ${Point.version}`);
console.log(`Class version: ${a.constructor.version}`);
```

Using expressions like `myObject.constructor.` we can also access other values, like the class name: `a.constructor.name` would return the string 'Point' in the example above.