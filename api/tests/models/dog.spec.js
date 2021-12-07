const { Dog, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Dog model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Dog.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Dog.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Dog.create({ name: 'Pug' });
      });
    });
  
    describe("weight_min", () => {
      it("should throw an error if weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("Dog minimun weight cannot be null")))
          .catch(() => done());
  });
      it('should work when its a valid minimun weight value', () => {
        Dog.create({ weight: '8' });
  });
 });

    describe("weight_max", () => {
      it("should throw an error if weight is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("Dog maximun weight cannot be null")))
          .catch(() => done());
  });
      it('should work when its a valid maximun weight value', () => {
        Dog.create({ weight: '15' });
  });
 });

    describe("height_min", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("Dog minimun height cannot be null")))
          .catch(() => done());
  });
      it('should work when its a valid minimun height value', () => {
        Dog.create({ height: '20' });
  });
 });

    describe("height_max", () => {
      it("should throw an error if height is null", (done) => {
        Dog.create({})
          .then(() => done(new Error("Dog maximun height cannot be null")))
          .catch(() => done());
  });
      it('should work when its a valid maximun height value', () => {
        Dog.create({ height: '30' });
  });
 });

  });
});
