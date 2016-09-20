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

actionQueue.add({perform: Attack, actor: Keine, target: Ares, speed: Keine.speed});
actionQueue.add({perform: Attack, actor: Ares, target: Keine, speed: Ares.speed});

while (!actionQueue.isEmpty()) {
   var action = actionQueue.poll();
   var dmg = action.perform(action.actor, action.target);

   console.log(action.actor.name + ' attacks ' + action.target.name + ' for ' + dmg + ' damage!');
   console.log(action.target.name + ' has ' + action.target.health + ' health remaining.');
}
