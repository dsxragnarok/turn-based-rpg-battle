var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
var expect = chai.expect;
chai.use(sinonChai);

describe('Action Queue', function () {
   var ActionQueue = require('../actionQueue');
   var Unit = require('../unit');
   var Party = require('../party');

   var actions, attack, jump, decide, defend;

   var keine, ryns, tesract, debon;
   var keineAction, rynsAction, tesractAction, debonAction;
   var allies, foes;

   beforeEach(function () {
      actions = new ActionQueue();

      keine = new Unit({
         name: 'Keine',
         health: 100,
         attack: 75,
         defense: 50,
         speed: 90
      });

      ryns = new Unit({
         name: 'Ryns',
         health: 100,
         attack: 65,
         defense: 90,
         speed: 40
      });

      tesract = new Unit({
         name: 'Tesract',
         health: 40,
         attack: 155,
         defense: 20,
         speed: 30
      });

      debon = new Unit({
         name: 'Debon',
         health: 100,
         attack: 90,
         defense: 70,
         speed: 50
      });

      allies = new Party([keine, ryns]);
      foes = new Party([tesract, debon]);

      attack = sinon.stub();
      jump = sinon.stub();
      decide = sinon.stub();
      defend = sinon.stub();

      keineAction = {
         type: 'jump',
         perform: jump,
         actor: keine,
         speed: 5,
         args: [keine, debon]
      };

      rynsAction = {
         type: 'defend',
         perform: defend,
         actor: ryns,
         speed: 30,
         args: [ryns]
      };

      tesractAction = {
         type: 'decide',
         perform: decide,
         actor: tesract,
         speed: 50,
         args: [tesract, foes, allies]
      };

      debonAction = {
         type: 'attack',
         perform: attack,
         actor: debon,
         speed: 20,
         args: [debon, ryns]
      };
   });

   afterEach(function () {
      actions = attack = defend = decide = jump = null;
      keine = ryns = tesract = debon = null;
      keineAction = rynsAction = tesractAction = debonAction = null;
      allies = foes = null;
   });

   it('should instantiate an empty queue', function () {
      expect(actions).to.be.instanceof(ActionQueue);
      expect(actions.size()).to.be.equal(0);
   });
   it('should queue an action', function () {
      actions.queue(keineAction);

      expect(actions.size()).to.be.equal(1);
   });
   it('should dequeue an action', function () {
      actions.queue(rynsAction);

      var action = actions.dequeue();

      expect(actions.size()).to.be.equal(0);
      expect(action).to.deep.equal(rynsAction);
   });
   it('should know how many actions are in the queue', function () {
      actions.queue(rynsAction);
      expect(actions.size()).to.be.equal(1);

      actions.queue(tesractAction);
      expect(actions.size()).to.be.equal(2);

      actions.queue(keineAction);
      expect(actions.size()).to.be.equal(3);

      actions.dequeue();
      expect(actions.size()).to.be.equal(2);

      actions.dequeue();
      expect(actions.size()).to.be.equal(1);
   });
   it('should be able to peek at the first action on the queue', function () {
      actions.queue(rynsAction);
      actions.queue(tesractAction);
      actions.queue(debonAction);
      actions.queue(keineAction);

      var action = actions.peek();

      expect(action).to.deep.equal(keineAction);
   });
   it('should know if it contains an action', function () {
      actions.queue(tesractAction);
      actions.queue(debonAction);
      actions.queue(keineAction);

      expect(actions.contains(debonAction)).to.be.true;
   });
   it('should be able to iterate through actions on the queue', function () {
      actions.queue(tesractAction);
      actions.queue(keineAction);
      actions.queue(rynsAction);
      actions.queue(debonAction);

      var callback = function (action, index) {
         action.perform();
      };

      actions.forEach(callback);

      expect(attack).to.be.calledOnce;
      expect(defend).to.be.calledOnce;
      expect(decide).to.be.calledOnce;
      expect(jump).to.be.calledOnce;
   });
   it('should be sorted in ascending order by speed', function () {
      actions.queue(tesractAction); // speed: 50
      actions.queue(debonAction);   // speed: 20
      actions.queue(keineAction);   // speed: 5
      actions.queue(rynsAction);    // speed: 30

      var expectedOrder = [keineAction, debonAction, rynsAction, tesractAction];

      actions.forEach(function (action, index) {
         expect(action).to.deep.equal(expectedOrder[index]);
      });
   });
   it('should be able to re-prioritize', function () {
      actions.queue(tesractAction); // speed: 50
      actions.queue(debonAction);   // speed: 20
      actions.queue(keineAction);   // speed: 5
      actions.queue(rynsAction);    // speed: 30

      tesractAction.speed = 2;
      keineAction.speed = 100;
      rynsAction.speed = 1;

      actions.prioritize();

      var expectedOrder = [rynsAction, tesractAction, debonAction, keineAction];
      actions.forEach(function (action, index) {
         expect(action).to.deep.equal(expectedOrder[index]);
      });
   });
});
