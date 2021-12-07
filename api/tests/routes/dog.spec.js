// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Dog, conn } = require('../../src/db.js');

// const agent = session(app);
// const dog = {
//   name: 'Pug',
// };

// describe('Dog routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));
//   beforeEach(() => Dog.sync({ force: true })
//     .then(() => Dog.create(dog)));
//   describe('GET /dogs', () => {
//     it('should get 200', () =>
//       agent.get('/dogs').expect(200)
//     );
//   });
// });

/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  id: '0ec49ee9-fa25-4ea0-b702-5d2426a0a45b', 
  name:"Lulu",
  height_min: '43',
  height_max: '48',
  weight_min: '16',
  weight_max: '26',
  life_span: '12 -15 years',
  temperament: "Stubborn, Friendly, Affectionate, Loyal, Playful, Active",
  image: '"https://cdn2.thedogapi.com/images/BJ1gnx5Vm.jpg"' 

};

describe('Dogs routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Dog.sync({ force: true })
    .then(() => Dog.create(dog)));

  describe('GET /api/dogs', () => {
    it('should get 200', () =>
      agent.get('/dogs').expect(200)
    );
  });


describe("Se obtiene un Dog por id", () => {
  describe("GET/dogs/:id", () => {
    it("Se espera una respuesta 200 si se pasa un id", () =>
      agent.get("/dogs/0ec49ee9-fa25-4ea0-b702-5d2426a0a45b").expect(200));
  });
  })
})
