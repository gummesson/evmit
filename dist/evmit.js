(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Evmit = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Initialize `Evmit`.
 *
 * @api public
 */

function Evmit() {}

/**
 * Get an event or all events.
 *
 * @param {string} name
 * @return {object|fn}
 *
 * @api public
 */

Evmit.prototype.listeners = function(name) {
  var events = this.events || (this.events = {})
  return name ? events[name] : events
}

/**
 * Subscribe to an event.
 *
 * @param  {string}   name
 * @param  {function} fn
 * @return {this}
 *
 * @api public
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
 * @param  {string}   name
 * @param  {function} fn
 * @return {this}
 *
 * @api public
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
 * @param  {string}   name
 * @param  {function} fn
 * @return {this}
 *
 * @api public
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
 * @param  {string} name
 * @return {this}
 *
 * @api public
 */

Evmit.prototype.emit = function(name) {
  var events = this.listeners()
  var params = [].slice.call(arguments, 1)
  if (events[name]) {
    events[name].forEach(function(fn) {
      fn.apply(this, params)
    })
  }
  return this
}

/**
 * Exports
 */

module.exports = Evmit

},{}]},{},[1])(1)
});