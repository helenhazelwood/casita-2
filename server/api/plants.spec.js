const { expect } = require('chai');
const Plant = require('../db/models/plant');
const db = require('../db');
const UserPlant = db.model('UserPlant');
const request = require('supertest');
const app = require('../index');

describe('Plant routes', () => {
  describe('post routes', () => {
    let testPlant = {
      name: 'Tiger Lily',
      description: `Test description text have to make sure it's at least a couple sentences long. That way I'll know that the route can handle a longer string in this field.`,
      sunlight: 'medium-bright',
      size: 'medium',
      petFriendly: false,
    };
    afterEach(async () => {
      await Plant.destroy({ where: { description: testPlant.description } });
    });

    it('creates a new plant', async () => {
      const res = await request(app)
        .post('/api/plants')
        .send({ plant: testPlant, userId: 2 })
        .expect(201);
      const plantSearch = await Plant.findOne({
        where: { name: testPlant.name },
      });

      expect(plantSearch.description).to.be.equal(testPlant.description);
      expect(res.body.name).to.be.equal(testPlant.name);
    });
    // it('/:plantId/:userId route creates a new join instance', async() => {
    //   const res = await request(app).post('/api/plants/2/3').expect(201)

    //   const joinSearch = await UserPlant.findOne({where: {
    //     userId: 3, plantId: 2
    //   }})
    //   expect(joinSearch.userId).to.be.equal(3)
    // })
  });//end describe post route
  describe('put routes', () => {
    let testPlant = {
      name: 'Tiger Lily',
      description: `Test description text have to make sure it's at least a couple sentences long. That way I'll know that the route can handle a longer string in this field.`,
      sunlight: 'medium-bright',
      size: 'medium',
      petFriendly: false,
    };
    afterEach(async () => {
      await Plant.destroy({ where: { description: testPlant.description } });
    });
    it('updates an existing plant instance', async () => {
      const newPlant = await Plant.create(testPlant)
      const res = await request(app).put(`/api/plants/${newPlant.id}`).send({name: 'Cactus'}).expect(201)
      const plantSearch = await Plant.findByPk(newPlant.id)

      expect(plantSearch.name).to.be.equal('Cactus')
      expect(res.text).to.be.equal('Plant updated')
    })
  })//end describe put routes
});
