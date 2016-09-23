var Unit = require('./unit');

var Party = function () {
   this._members = [];

   if (arguments.length > 0 &&
      Array.isArray(arguments[0])) {

      this._members = arguments[0];
   }
};

Party.prototype = {
   size: function () {
      return this._members.length;
   },
   add: function (unit) {
      this._members.push(unit);
   },
   remove: function (name) {
      var index = this.findByName(name);
      var unit = null;

      if (index >= 0) {
         unit = this._members.splice(index, 1)[0];
      }

      return unit;
   },
   contains: function (unit) {
      if (unit instanceof Unit) {
         return this._members.indexOf(unit) >= 0;
      } else if (typeof unit === 'string') {
         return this.findByName(unit) >= 0;
      }

      return false;
   },
   findByName: function (name) {
      var i = 0, len = this._members.length;

      for (i; i < len; i += 1) {
         if (this._members[i].name === name) {
            return i;
         }
      }

      return -1;
   },
   getMembers: function () {
      return this._members;
   },
   forEach: function (callback) {
      this._members.forEach(callback);
   }
};

module.exports = Party;
