var chai = require('chai');
var expect = chai.expect;

describe('Attack action', function () {
   var Attack = require('../actions/attack');
   var Unit = require('../unit');

   var actor, target;

   beforeEach(function () {
      actor = new Unit({
         name: 'Keine',
         health: 70,
         attack: 65,
         defense: 50,
         speed: 90
      });

      target = new Unit({
         name: 'Ares',
         health: 100,
         attack: 95,
         defense: 75,
         speed: 50
      });
   });

   afterEach(function () {
      actor = target = null;
   });

   // NOTE: this possibly is unnecessary
   it('should should have an initialize method', function () {
      expect(Attack.initialize).to.be.a('function');
   });

   it('should require an actor', function () {
      expect(Attack.bind(Attack)).to.throw('The first argument must be instance of Unit as the actor');
   });

   it('should require a target', function () {
      expect(Attack.bind(Attack, actor)).to.throw('The second argument must be instance of Unit as the target');
   });

   it('should return the damage number', function () {
      expect(Attack(actor, target)).to.be.a('number');
   });

   it('should reduce target\'s health', function () {
      var targetHealthBefore = target.health;
      Attack(actor, target);

      expect(target.health).to.be.below(targetHealthBefore);
   });
});
