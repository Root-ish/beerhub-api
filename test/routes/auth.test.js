const chai = require('chai')
const chaiHttp = require('chai-http')
const randomString = require('randomstring')
const User = require('../../models/User')

const { expect } = chai
chai.use(chaiHttp)

const app = require('../../index')
const request = chai.request(app)

const username = randomString.generate(8)
const email = `${username}@test.com`
const password = randomString.generate()

describe('Auth test', () => {
  it('Can register a user via API', () => {
    request
      .post('/api/user/register')
      .send({ username, email, password })
      .then(res => {
        expect(res).to.have.status(200)
      })
      .catch(err => {
        throw err
      })
  })

  it('Can login via API', () => {
    request
      .post('/api/user/login')
      .send({ email: 'test@test.nl', password: '1234' })
      .then(res => {
        expect(res).to.have.status(200)
      })
      .catch(err => {
        throw err
      })
  })

  it('Throws error when email exists', () => {
    request
      .post('/api/user/register')
      .send({
        username: 'test',
        email: 'test@test.nl',
        password: '123',
      })
      .then(res => {
        expect(res).to.have.status(400)
      })
      .catch(err => {
        throw err
      })
  })

  it('Throws error when password is incorrect', () => {
    request
      .post('/api/user/login')
      .send({
        email: 'test@test.nl',
        password: 'testtest'
      })
      .then(res => {
        expect(res).to.have.status(400)
      })
  })
})
