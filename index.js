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
