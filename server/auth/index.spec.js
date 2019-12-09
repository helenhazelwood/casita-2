const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const User = db.model('user')
const app = require('../index')

describe('Auth routes', () => {
  describe('/auth/signup', () => {
    const testEmail = 'email@email.com'
    const testPassword = 'test'
    afterEach(async () => {
      const testUser = await User.findOne({where: {
        email: testEmail
      }})
      await testUser.destroy()
    })
    it('signup post creates a new user instance', async () => {
      const res = await request(app).post('/auth/signup').send({email: testEmail, password: testPassword})
      console.log(res.body)
      expect(res.body.email).to.be.equal(testEmail)
    })
    it('rejects when a user with the req email already exists', async () => {
      const res = await request(app).post('/auth/signup').send({email: 'alfie@email.com', })
    })
  })
  describe('/auth/login', () => {
    const alfiePassword = '123'
    const alfieEmail = 'alfie@email.com'
    xit('login route lets a correct email and password login', async () => {
      const res = await request(app)
      .post('/auth/login').send({email: alfieEmail, password: '123'})

      console.log(res.body)
    })
  })
})
