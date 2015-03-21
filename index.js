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
 * @param {string} name
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
