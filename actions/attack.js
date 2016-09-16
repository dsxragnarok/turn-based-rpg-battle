var Unit = require('../unit');

var Attack = function (actor, target) {
   if (!actor || !(actor instanceof Unit)) {
      throw new Error('The first argument must be instance of Unit as the actor');
   }

   if (!target || !(target instanceof Unit)) {
      throw new Error('The second argument must be instance of Unit as the target');
   }

   var damage = Math.max(1, actor.attack - target.defense);

   target.health -= damage;

   return damage;
};

// This should be overridden
Attack.initialize = function () {};

module.exports = Attack;
