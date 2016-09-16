var chai = require('chai');
var expect = chai.expect;

var Unit = require('../unit');

describe('Unit class', function () {
   var unitAttributes = null;
   var unit = null;

   beforeEach(function () {
      unitAttributes = {
         name: 'Keine',
         health: 100,
         attack: 75,
         defense: 50,
         speed: 90
      };
      unit = new Unit(unitAttributes);
   });

   afterEach(function () {
      unit = null;
   });

   it('should instantiate a unit', function () {
      expect(unit).to.be.instanceof(Unit);
   });

   it('should throw error with no configuration passed to constructor', function () {
      expect(Unit.bind(Unit)).to.throw('Unit must be instantiated with some parameters');
   });

   it('should have a name', function () {
      expect(unit.name).to.equal(unitAttributes.name);
   });
   it('should have health', function () {
      expect(unit.health).to.equal(unitAttributes.health);
   });
   it('should have attack', function () {
      expect(unit.attack).to.equal(unitAttributes.attack);
   });
   it('should have defense', function () {
      expect(unit.defense).to.equal(unitAttributes.defense);
   });
   it('should have speed', function () {
      expect(unit.speed).to.equal(unitAttributes.speed);
   });
});
