var PriorityQueue = require('fastpriorityqueue');

var Unit = require('../unit')
var Party = require('../party');
var Attack = require('../actions/attack');

var Keine = new Unit({
   name: 'Keine',
   health: 70,
   attack: 65,
   defense: 50,
   speed: 90
});
var Ares = new Unit({
   name: 'Ares',
   health: 100,
   attack: 95,
   defense: 75,
   speed: 50
});

var actionQueue = new PriorityQueue(function (a, b) { return a.speed > b.speed; });

// The action object should have a label or type field with a string for the action name
// the perform field is the action function itself. The rest should be an
// array of paramters to be passed onto the action function.
// { type: 'attack', perform: Attack, args: [Keine, Ares], speed: Keine.speed }

actionQueue.add({type: 'attack', perform: Attack, speed: Keine.speed, args: [Keine, Ares]});
actionQueue.add({type: 'attack', perform: Attack, speed: Ares.speed, args: [Ares, Keine]});

console.log('[actionQueue] [size]', actionQueue.size);
while (!actionQueue.isEmpty()) {
   var action = actionQueue.poll();
   var dmg = action.perform.apply(action.perform, action.args);
}
console.log('[actionQueue] [size]', actionQueue.size);

// --- DEPRECATED --- [2016-09-19 :: 8:58 PM]
// actionQueue.add({perform: Attack, actor: Keine, target: Ares, speed: Keine.speed});
// actionQueue.add({perform: Attack, actor: Ares, target: Keine, speed: Ares.speed});
//
// while (!actionQueue.isEmpty()) {
//    var action = actionQueue.poll();
//    var dmg = action.perform(action.actor, action.target);
//
//    console.log(action.actor.name + ' attacks ' + action.target.name + ' for ' + dmg + ' damage!');
//    console.log(action.target.name + ' has ' + action.target.health + ' health remaining.');
// }
