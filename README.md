# Evmit

[![NPM version][npm-img]][npm-url]
[![License][license-img]][license-url]
[![Build status][travis-img]][travis-url]

A tiny, modern, bare bones event emitter for Node.js and the browser. For the
latter it supports Internet Explorer 9+ and works with
[Browserify](http://browserify.org/) or as a standalone library.

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
var Evmit   = require('evmit')
var emitter = new Evmit()
~~~

#### Standalone

~~~ javascript
var emitter = new Evmit()
~~~

### Evmit.on(name, fn)

Subscribe to an event.

- `name` is the name of the event.
- `fn` is the function that gets called when the event is emitted.

~~~ javascript
emitter.on('foo', function() {
  // ...
})

emitter.on('foo', function(/* ... */) {
  // ...
})
~~~

### Evmit.once(name, fn)

Subscribe to an event only once.

- `name` is the name of the event.
- `fn` is the function that gets called when the event is emitted.

~~~ javascript
emitter.once('foo', function() {
  // ...
})

emitter.once('foo', function(/* ... */) {
  // ...
})
~~~

### Evmit.emit(name[, ...])

Trigger an event.

- `name` is the name of the event.
- `...` is the arguments that gets passed to the event.

~~~ javascript
emitter.emit('foo', { bar: 'baz' })

emitter.emit('foo', 'bar', 'baz')
~~~

### Evmit.off([name, fn])

Unsubscribe from an event or all events.

- `name` is the name of the event.
- `fn` is a specific function that's bound to the event.

If `name` is not provided it'll unsubscribe from all events.

~~~ javascript
emitter.off()

emitter.off('foo')

emitter.off('bar', function(/* ... */) {
  // ...
})
~~~

### Evmit.listeners([name])

Return all events or a single event.

- `name` is the name of the event.

~~~ javascript
emitter.listeners()
// => { foo: [...], bar: [...] }

emitter.listeners('foo')
// => [...]
~~~

[npm-img]: https://img.shields.io/npm/v/evmit.svg?style=flat-square
[npm-url]: https://npmjs.org/package/evmit
[license-img]: http://img.shields.io/npm/l/evmit.svg?style=flat-square
[license-url]: LICENSE
[travis-img]: https://img.shields.io/travis/gummesson/evmit.svg?style=flat-square
[travis-url]: https://travis-ci.org/gummesson/evmit
