var ActionQueue = function () {
   this._queue = [];
};

var defaultComparator = function (a, b) {
   return a.speed - b.speed;
};

ActionQueue.prototype = {
   size: function () {
      return this._queue.length;
   },
   queue: function (action) {
      this._queue.push(action);

      this._queue.sort(defaultComparator);
   },
   dequeue: function () {
      return this._queue.shift();
   },
   peek: function () {
      return this._queue[0];
   },
   contains: function (action) {
      return this._queue.indexOf(action) >= 0;
   },
   forEach: function (callback) {
      this._queue.forEach(callback);
   },
   prioritize: function () {
      this._queue.sort(defaultComparator);
   }
};

module.exports = ActionQueue;

return ActionQueue;
