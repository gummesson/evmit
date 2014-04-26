/* Modules */

var Evmit = require('../');
var test  = require('tape');

/* Tests */

// Evmit.on(name, fn)

test('Evmit.on()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function() {});
  assert.ok(emitter.events.test, 'subscribes to an event');
  assert.end();
});

test('Evmit.on()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function() {});
  emitter.on('test', function() {});
  assert.equal(emitter.events.test.length, 2, 'adds multiple callbacks to an event');
  assert.end();
});

// Evmit.emit(name[, ...])

test('Evmit.emit()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function() {
    assert.ok(true, 'triggers an event');
    assert.end();
  });
  emitter.emit('test');
});

test('Evmit.emit()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function(data) {
    assert.deepEqual(data, { foo: 'bar' }, 'sends data to an event');
    assert.end();
  });
  emitter.emit('test', { foo: 'bar' });
});

test('Evmit.emit()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function(foo, bar, baz) {
    assert.deepEqual([foo, bar, baz], [1, 2, 3], 'sends arguments to an event');
  });
  emitter.emit('test', 1, 2, 3);
  assert.end();
});

test('Evmit.emit()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function(data) {
    assert.deepEqual(data, { foo: 'bar' }, 'sends data to a callback of an event');
  });
  emitter.on('test', function(data) {
    assert.equal(data.foo, 'bar', 'sends data to another callback of an event');
  });
  emitter.emit('test', { foo: 'bar' });
  assert.end();
});

// Evmit.off(name[, fn])

test('Evmit.off()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function() {
    assert.ok(false, 'shouldn\'t be triggered');
  });
  emitter.off('test');
  emitter.emit('test');
  assert.notOk(emitter.events.test, 'unsubcribes from an event');
  assert.end();
});

test('Evmit.off()', function(assert) {
  var emitter = new Evmit();
  function one() {}
  function two() {}
  emitter.on('test', one);
  emitter.on('test', two);
  emitter.off('test', one);
  assert.equal(emitter.events.test.length, 1, 'removes a callback from an event');
  assert.end();
});

test('Evmit.off()', function(assert) {
  var emitter = new Evmit();
  function one() {}
  function two() {}
  emitter.on('foo', one);
  emitter.on('bar', two);
  emitter.off();
  assert.notOk(emitter.events, 'unsubscribes from all events');
  assert.end();
});

// Evmit.once(name, fn)

test('Evmit.once()', function(assert) {
  var emitter = new Evmit();
  emitter.once('test', function() {});
  emitter.emit('test');
  assert.notOk(emitter.events.test, 'removes a callback and unsubcribes from an event once it\'s been triggered');
  assert.end();
});

test('Evmit.once()', function(assert) {
  var emitter = new Evmit();
  emitter.on('test', function() {});
  emitter.once('test', function() {});
  emitter.emit('test');
  assert.equal(emitter.events.test.length, 1, 'removes a callback from an event once it\'s been triggered');
  assert.end();
});

// Evmit.listeners([name])

test('Evmit.listeners()', function(assert) {
  var emitter = new Evmit();
  assert.deepEqual(emitter.listeners(), {}, 'returns an empty object when there\'s no events');
  assert.end();
});

test('Evmit.listeners()', function(assert) {
  var emitter = new Evmit();
  function fn() {}
  emitter.on('foo', fn);
  emitter.on('bar', fn);
  assert.deepEqual(emitter.listeners(), { foo: [fn], bar: [fn] }, 'returns an object with all of the events');
  assert.end();
});

test('Evmit.listeners()', function(assert) {
  var emitter = new Evmit();
  function fn() {}
  emitter.on('test', fn);
  emitter.on('test', fn);
  assert.deepEqual(emitter.listeners('test'), [fn, fn], 'returns an object of a specific event');
  assert.end();
});
