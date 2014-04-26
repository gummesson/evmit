# Evmit

[![Build Status](https://travis-ci.org/gummesson/evmit.svg?branch=master)](https://travis-ci.org/gummesson/evmit)

A tiny, modern, bare bones event emitter for Node.js and the browser. For the latter it supports Internet Explorer 9+ and works with [Browserify](http://browserify.org/) or as a standalone library.

## Installation

### npm

~~~ text
npm install evmit --save
~~~

### Bower

~~~ text
bower install evmit --save
~~~

## Usage

### Initialization

#### Node.js and Browserify

~~~ javascript
var Evmit   = require('evmit');
var emitter = new Evmit();
~~~

#### Standalone

~~~ javascript
var emitter = new Evmit();
~~~

### Evmit.on(name, fn)

Subscribe to an event.

- `name` is the name of the event.
- `fn` is the function that gets called when the event is emitted.

~~~ javascript
emitter.on('foo', function() {
  // ...
});

emitter.on('foo', function(/* ... */) {
  // ...
});
~~~

### Evmit.once(name, fn)

Subscribe to an event only once.

- `name` is the name of the event.
- `fn` is the function that gets called when the event is emitted.

~~~ javascript
emitter.once('foo', function() {
  // ...
});

emitter.once('foo', function(/* ... */) {
  // ...
});
~~~

### Evmit.emit(name[, ...])

Trigger an event.

- `name` is the name of the event.
- `...` is the arguments that gets passed to the event.

~~~ javascript
emitter.emit('foo', { bar: 'baz' });

emitter.emit('foo', 'bar', 'baz');
~~~

### Evmit.off([name, fn])

Unsubscribe from an event or all events.

- `name` is the name of the event.
- `fn` is a specific function that's bound to the event.

If `name` is not provided it'll unsubscribe from all events.

~~~ javascript
emitter.off();

emitter.off('foo');

emitter.off('bar', function(/* ... */) {
  // ...
};
~~~

### Evmit.listeners([name])

Return all events or a single event.

- `name` is the name of the event.

~~~ javascript
emitter.listeners();
// => { foo: [...], bar: [...] }

emitter.listeners('foo');
// => [...]
~~~

## Tests

[PhantomJS](http://phantomjs.org/) is required for the browser tests.

~~~ text
npm install
npm test
npm run browser
~~~

## License

The MIT License (MIT)

Copyright (c) 2014 Ellen Gummesson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
