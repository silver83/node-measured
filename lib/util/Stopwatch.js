'use strict';

var inherits     = require('inherits');
var EventEmitter = require('events').EventEmitter;

function Stopwatch(options) {
  options = options || {};
  EventEmitter.call(this);

  if (options.getTime) {
    this._getTime = options.getTime;
  }
  this._start = this._getTime();
  this._ended = false;
}

inherits(Stopwatch, EventEmitter);

Stopwatch.prototype.end = function () {
  if (this._ended) {
    return;
  }

  this._ended = true;
  var elapsed   = this._getTime() - this._start;

  this.emit('end', elapsed);
  return elapsed;
};

Stopwatch.prototype._getTime = function () {
  if (!process.hrtime) {
    return Date.now();
  }

  var hrtime = process.hrtime();
  return hrtime[0] * 1000 + hrtime[1] / (1000 * 1000);
};

module.exports = Stopwatch;
