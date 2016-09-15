var Unit = module.exports = function (parameters) {
   if (!parameters) {
      throw new Error('Unit must be instantiated with some parameters');
   }
   if (!parameters.name) {
      throw new Error('Unit must have a name');
   }

   var name = parameters.name;
   var health = parameters.health || 0;
   var attack = parameters.attack || 0;
   var defense = parameters.defense || 0;
   var speed = parameters.speed || 0;

   return {
      name: name,
      health: health,
      attack: attack,
      defense: defense,
      speed: speed
   };
}; // end Unit class
