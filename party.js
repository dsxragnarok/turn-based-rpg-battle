var Unit = require('./unit');

var Party = function () {
   this.members = [];

   if (arguments.length > 0 &&
      Array.isArray(arguments[0])) {

      this.members = arguments[0];
   }
};

Party.prototype = {
   size: function () {
      return this.members.length;
   },
   add: function (unit) {
      this.members.push(unit);
   },
   remove: function (name) {
      var index = this.findByName(name);
      var unit = null;

      if (index >= 0) {
         unit = this.members.splice(index, 1)[0];
      }

      return unit;
   },
   contains: function (unit) {
      if (unit instanceof Unit) {
         return this.members.indexOf(unit) >= 0;
      } else if (typeof unit === 'string') {
         return this.findByName(unit) >= 0;
      }

      return false;
   },
   findByName: function (name) {
      var i = 0, len = this.members.length;

      for (i; i < len; i += 1) {
         if (this.members[i].name === name) {
            return i;
         }
      }

      return -1;
   }
};

module.exports = Party;
