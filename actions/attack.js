var Unit = require('../unit');

/*
 * Calculates the damage and applies it to the target.
 * damage = actor's attack - target's defense. Minimum damage = 1
 * @param {Unit} actor
 * @param {Unit} target
 * @return {number} the damage amount
 */
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
