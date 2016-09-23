var PriorityQueue = require('fastpriorityqueue');
var Unit = require('./unit');
var Party = require('./party');
var Attack = require('./actions/attack');

var gameDataJSON = {
   allies: [{
      name: 'Silvilia',
      health: Math.random() * 100 + 50,
      attack: Math.random() * 50 + 25,
      defense: Math.random() * 75 + 25,
      speed: Math.random() * 10 + 5
   }, {
      name: 'Lafihna',
      health: Math.random() * 100 + 25,
      attack: Math.random() * 50 + 50,
      defense: Math.random() * 75 + 15,
      speed: Math.random() * 50 + 15
   }, {
      name: 'Adahlia',
      health: Math.random() * 50 + 15,
      attack: Math.random() * 75 + 50,
      defense: Math.random() * 30 + 15,
      speed: Math.random() * 75 + 25
   }, {
      name: 'Verna',
      health: Math.random() * 25 + 25,
      attack: Math.random() * 100 + 50,
      defense: Math.random() * 25 + 10,
      speed: Math.random() * 25 + 5
   }, {
      name: 'Eternaldao',
      health: Math.random() * 30 + 20,
      attack: Math.random() * 25 + 15,
      defense: Math.random() * 50 + 25,
      speed: Math.random() * 30 + 25
   }, {
      name: 'Etoxaika',
      health: Math.random() * 50 + 25,
      attack: Math.random() * 75 + 75,
      defense: Math.random() * 25 + 25,
      speed: Math.random() * 75 + 50
   }],
   foes: [{
      name: 'Orc Shaman',
      health: Math.random() * 100 + 50,
      attack: Math.random() * 50 + 25,
      defense: Math.random() * 75 + 25,
      speed: Math.random() * 10 + 5
   }, {
      name: 'Orc Grunt',
      health: Math.random() * 100 + 25,
      attack: Math.random() * 50 + 50,
      defense: Math.random() * 75 + 15,
      speed: Math.random() * 50 + 15
   }, {
      name: 'Troll Headhunter',
      health: Math.random() * 50 + 15,
      attack: Math.random() * 75 + 50,
      defense: Math.random() * 30 + 15,
      speed: Math.random() * 75 + 25
   }, {
      name: 'Troll Witch Doctor',
      health: Math.random() * 25 + 25,
      attack: Math.random() * 100 + 50,
      defense: Math.random() * 25 + 10,
      speed: Math.random() * 25 + 5
   }, {
      name: 'Tauren Spirit Walker',
      health: Math.random() * 30 + 20,
      attack: Math.random() * 25 + 15,
      defense: Math.random() * 50 + 25,
      speed: Math.random() * 30 + 25
   }, {
      name: 'Troll Berserker',
      health: Math.random() * 50 + 25,
      attack: Math.random() * 75 + 75,
      defense: Math.random() * 25 + 25,
      speed: Math.random() * 75 + 50
   }]
}

var Game = function () {
   this.end = false;
   this.startedTime = null;
   this.lastUpdateTime = 0;

   this.timer = null;

   this.actionQueue = new PriorityQueue(function (a, b) { return a.speed < b.speed; });
   this.allies = new Party();
   this.foes = new Party();
};

Game.prototype = {
   initialize: function (data) {
      data.allies.forEach(this.createAlly.bind(this));
      data.foes.forEach(this.createFoe.bind(this));
   },
   createAlly: function (data) {
      this.allies.add(new Unit(data));
   },
   createFoe: function (data) {
      this.foes.add(new Unit(data));
   },
   start: function () {
      this.startedTime = this.lastUpdateTime = new Date().getTime();

      // get action for each entity
      var allyDecide = function (unit, index) {
         this.actionQueue.add({
            type: 'decide',
            perform: this.AIDecide,
            speed: 1 - (unit.speed / 255),
            actor: unit,
            args: [unit, this.allies, this.foes]
         });
      };
      var foeDecide = function (unit, index) {
         this.actionQueue.add({
            type: 'decide',
            perform: this.AIDecide,
            speed: (unit.speed / 255),
            args: [unit, this.foes, this.allies]
         })
      };

      this.allies.forEach(allyDecide.bind(this));
      this.foes.forEach(foeDecide.bind(this));

      var scope = this;
      this.timer = setInterval(function () {
         var now = new Date().getTime();
         var deltaTime = now - scope.lastUpdateTime;

         this.lastUpdateTime = now;

         scope.update.call(scope, deltaTime);

         if (scope.end) {
            clearTimeout(scope.timer);
         }
      }, 1);

   },
   update: function (elapsed) {
      var action, dead;
      console.log(' [update] ', elapsed);

      if (this.actionQueue.size > 0) {
         // perform action
         action = this.actionQueue.poll();

         // make sure the unit is still alive

         if (action.actor !== null && action.actor !== undefined) {
            action.perform.apply(this, action.args);
         }

         // resolve action
         // --- action.perform should probably return an object for resolution
         // ----> or emit an event to which we can subscribe to for handling
         //       the resolution
         if (action.type === 'attack' && action.args[1].health <= 0) {
            dead = action.args[1];

            console.log(dead.name + ' dies!');

            this.foes.remove(dead.name);
            this.allies.remove(dead.name);
         }
         // return to queue
         if (action.type !== 'decide') {
            // kludge --- if the aciton type was not a decision action
            // then we know a real action was just concluded, so we now
            // put the unit decision back into queue
            this.actionQueue.add({
               type: 'decide',
               perform: this.AIDecide,
               speed: 1 - (action.actor.speed / 255) + 1,
               actor: action.actor,
               args: [action.actor,
                  this.allies.contains(action.actor) ? this.allies : this.foes,
                  this.allies.contains(action.actor) ? this.foes : this.allies
               ]
            });
         }
      } else {
         this.end = true;
      }

      if (this.allies.size() === 0) {
         console.log('!~Your party was defeated~!')
         this.end = true;
      }

      if (this.foes.size() === 0) {
         console.log('!~Your party was victorious~!');
         this.end = true;
      }

      // console.log(' ----------------------- ');
      // console.log(this.actionQueue);
      // console.log(' ----------------------- ');
   },
   AIDecide: function (unit, party, enemies) {
      var index = Math.floor(Math.random() * enemies.size());
      var target = enemies.getMembers()[index];
      var speed = 0;

      var action = {
         type: 'attack',
         perform: Attack,
         speed: speed,
         actor: unit,
         args: [unit, target]
      };

      console.log(unit.name + ' decides to ' + action.type + ' ' + target.name);

      this.actionQueue.add(action);
   }
};

var main = new Game();

main.initialize(gameDataJSON);
main.start();
