
# Model.js

  A basic JavaScript model.

## Installation

    $ npm install shannonmoeller/model.js

    $ component install shannonmoeller/model.js

## API

### Model(object)

Create a new model which wraps around `object`.

```js
var Model = require('model');
var foo = Model({ foo: 'bar' });
```

### .get(key):\* <br /> .get(array):Object

  Gets one or more values.

```js
var foo = Model({ a: 1, b: 2 });

foo.get('a');             // 1
foo.get('b');             // 2
foo.get('c');             // undefined
foo.get(['a', 'b', 'c']); // { a: 1, b: 2, c: undefined }
```

### .set(key, value):this <br /> .set(object):this

  Sets one or more values.

```js
var foo = Model();

foo.toJSON(); // { }

foo.set('a', 1);
foo.toJSON(); // { a: 1 }

foo.set('b', 2);
foo.toJSON(); // { a: 1, b: 2 }

foo.set({ b: 3, c: 4 });
foo.toJSON(); // { a: 1, b: 3, c: 4 }

```

### .toJSON()

  Returns the current state of the internal data as a plain object.

```js
var foo = Model({ a: 1, b: 2, c: 3 });

foo.toJSON(); // { a: 1, b: 2, c: 3 }
```

## License

  MIT
