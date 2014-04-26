!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Evmit=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/* Evmit */

function Evmit() {}

Evmit.prototype.listeners = function(name) {
  var events = this.events || (this.events = {});
  return name ? events[name] : events;
};

Evmit.prototype.on = function(name, fn) {
  var events = this.listeners();
  if (!events[name]) { events[name] = []; }
  events[name].push(fn);
  return this;
};

Evmit.prototype.off = function(name, fn) {
  var events = this.listeners();
  if (!name) { delete this.events; }
  if (events[name] && fn) {
    events[name].splice(events[name].indexOf(fn), 1);
    if (events[name].length === 0) { delete events[name]; }
    return this;
  }
  if (events[name]) { delete events[name]; }
  return this;
};

Evmit.prototype.once = function(name, fn) {
  var self = this;
  this.on(name, function cb() {
    self.off(name, cb);
    fn.apply(arguments);
  });
  return this;
};

Evmit.prototype.emit = function(name) {
  var events = this.listeners();
  var args   = [].slice.call(arguments, 1);
  if (events[name]) {
    events[name].forEach(function(fn) {
      fn.apply(this, args);
    });
  }
  return this;
};

/* Exports */

module.exports = Evmit;

},{}]},{},[1])
(1)
});