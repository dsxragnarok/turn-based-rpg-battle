var chai = require('chai');
var expect = chai.expect;

describe('Party class', function () {
   var Party = require('../party');
   var Unit = require('../unit');

   var party;

   beforeEach(function () {
      party = new Party();
   });

   afterEach(function () {
      party = null;
   });

   it('should instantiate a party', function () {
      expect(party).to.be.instanceof(Party);
   });

   it('should instantiate with zero members by default', function () {
      expect(party.size()).to.be.equal(0);
   });

   it('should be able to instantiate with a list of units', function () {
      var Terra = new Unit({name: 'Terra'});
      var Celes = new Unit({name: 'Celes'});
      var Rydia = new Unit({name: 'Rydia'});
      var Rosa = new Unit({name: 'Rosa'});
      var Lulu = new Unit({name: 'Lulu'});

      var units = [Terra, Celes, Rydia, Rosa, Lulu];

      party = new Party(units);

      expect(party.size()).to.be.equal(units.length);

      units.forEach(function (unit) {
         expect(party.contains(unit)).to.be.true;
      });
   });

   it('should be able to add a unit', function () {
      party.add(new Unit({name: 'Kain'}));
      expect(party.size()).to.be.equal(1);

      party.add(new Unit({name: 'Cecil'}));
      expect(party.size()).to.be.equal(2);
   });

   it('should be able to find a unit it contains', function () {
      var Lafihna = new Unit({name: 'Lafihna'});
      party.add(new Unit({name: 'Danihka'}));
      party.add(new Unit({name: 'Silvilia'}));
      party.add(Lafihna);
      party.add(new Unit({name: 'Adahlia'}));

      expect(party.contains(Lafihna)).to.be.true;
   });

   it('should know how many units it has', function () {
      party.add(new Unit({name: 'Lenneth'}));
      party.add(new Unit({name: 'Hrist'}));
      party.add(new Unit({name: 'Silmeria'}));

      expect(party.size()).to.be.equal(3);
   });

   it('should be able to find a unit by name', function () {
      var Calvin = new Unit({name: 'Calvin'});
      party.add(new  Unit({name: 'Jordan'}));
      party.add(new Unit({name: 'Jerrol'}));
      party.add(Calvin);

      expect(party.contains('Jordan')).to.be.true;
   });

   it('should be able to remove a unit', function () {
      var Rydia = new Unit({name: 'Rydia'});
      party.add(new Unit({name: 'Rosa'}));
      party.add(Rydia);

      var unit = party.remove('Rydia');

      expect(party.size()).to.be.equal(1);
      expect(party.contains('Rydia')).to.be.false;
      expect(unit).to.equal(Rydia);
   });

   it('should return a list of its members', function () {
      var Terra = new Unit({name: 'Terra'});
      var Celes = new Unit({name: 'Celes'});
      var Rydia = new Unit({name: 'Rydia'});
      var Rosa = new Unit({name: 'Rosa'});
      var Lulu = new Unit({name: 'Lulu'});

      var units = [Terra, Celes, Rydia, Rosa, Lulu];

      var party = new Party(units);

      expect(party.getMembers()).to.equal(units);
   });

   it('should be able to iterate through each member', function () {
      var Terra = new Unit({name: 'Terra'});
      var Celes = new Unit({name: 'Celes'});
      var Rydia = new Unit({name: 'Rydia'});
      var Rosa = new Unit({name: 'Rosa'});
      var Lulu = new Unit({name: 'Lulu'});

      var units = [Terra, Celes, Rydia, Rosa, Lulu];
      var party = new Party(units);

      expect(party.forEach).to.be.a('function');
      party.forEach(function (unit, index) {
         expect(unit).to.equal(units[index]);
      });
   });
});
