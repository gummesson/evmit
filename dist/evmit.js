(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Evmit = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
 * Dependencies
 */

var slice = require('sliced')

/*!
 * Exports
 */

module.exports = Evmit

/**
 * Initialize `Evmit`.
 *
 * @constructor
 */

function Evmit() {}

/**
 * Get an event or all events.
 *
 * @param  {String} name
 * @return {Array|Object}
 */

Evmit.prototype.listeners = function(name) {
  var events = this.events || (this.events = {})
  return name ? events[name] : events
}

/**
 * Subscribe to an event.
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {this}
 */

Evmit.prototype.on = function(name, fn) {
  var events = this.listeners()
  if (!events[name]) events[name] = []
  events[name].push(fn)
  return this
}

/**
 * Unsubscribe from an event or all events.
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {this}
 */

Evmit.prototype.off = function(name, fn) {
  var events = this.listeners()
  if (!name) delete this.events
  if (events[name] && fn) {
    events[name].splice(events[name].indexOf(fn), 1)
    if (events[name].length === 0) delete events[name]
    return this
  }
  if (events[name]) delete events[name]
  return this
}

/**
 * Subscribe to an event only once.
 *
 * @param  {String}   name
 * @param  {Function} fn
 * @return {this}
 */

Evmit.prototype.once = function(name, fn) {
  this.on(name, function done() {
    this.off(name, done)
    fn.apply(arguments)
  }.bind(this))
  return this
}

/**
 * Trigger an event.
 *
 * @param  {String} name
 * @return {this}
 */

Evmit.prototype.emit = function(name) {
  var events = this.listeners()
  var params = slice(arguments, 1)
  if (events[name]) {
    events[name].forEach(function(fn) {
      fn.apply(fn, params)
    })
  }
  return this
}

},{"sliced":2}],2:[function(require,module,exports){

/**
 * An Array.prototype.slice.call(arguments) alternative
 *
 * @param {Object} args something with a length
 * @param {Number} slice
 * @param {Number} sliceEnd
 * @api public
 */

module.exports = function (args, slice, sliceEnd) {
  var ret = [];
  var len = args.length;

  if (0 === len) return ret;

  var start = slice < 0
    ? Math.max(0, slice + len)
    : slice || 0;

  if (sliceEnd !== undefined) {
    len = sliceEnd < 0
      ? sliceEnd + len
      : sliceEnd
  }

  while (len-- > start) {
    ret[len - start] = args[len];
  }

  return ret;
}


},{}]},{},[1])(1)
});