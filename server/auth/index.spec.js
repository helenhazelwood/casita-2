const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const UserPlant = db.model('UserPlant')
const User = db.model('user');
const app = require('../index');

describe('Auth routes', () => {
  describe('/auth/signup', () => {
    const testEmail = 'email@email.com';
    const testPassword = 'test';
    afterEach(async () => {
      const testUser = await User.findOne({
        where: {
          email: testEmail,
        },
      });
      if (testUser) {
        await testUser.destroy();
      }
    });
    it('signup post creates a new user instance', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({ email: testEmail, password: testPassword });
      expect(res.body.email).to.be.equal(testEmail);
    });
    it('rejects when a user with the req email already exists', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({ email: 'alfie@email.com' });
      expect(res.text).to.be.equal('User already exists');
    });
  });
  describe('/auth/login', () => {
    const alfiePassword = '123';
    const alfieEmail = 'alfie@email.com';
    afterEach(async() => {
      await UserPlant.sync({force: true})
      await request(app).post('/auth/logout')
    })
    it('login route lets a correct email and password login', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({ email: alfieEmail, password: '123' });
      expect(res.body.email).to.be.equal(alfieEmail);
    });
    it(`eagerly loads the user's saved plants`, async () => {
      await UserPlant.create({userId: 5, plantId: 3})
     const res = await request(app)
        .post('/auth/login')
        .send({ email: alfieEmail, password: '123' });
      expect(res.body.plants.length).to.be.equal(1)
    })
  });//end describe login route
});//end describe auth routes
