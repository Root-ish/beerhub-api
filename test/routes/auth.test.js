require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')

const { API_BASEURL } = process.env

chai.use(chaiHttp)

const request = chai.request(API_BASEURL)
const { expect } = chai

describe('Auth test', () => {
  it('Can register a user via API', () => {
    // request
    //   .post('/user/register')
    //   .send({
    //     username: 'testMcTest',
    //     email: 'testmctest@test.com',
    //     password: 'doesitstillwork?'
    //   })
    //   .then(res => {
    //     expect(res).to.have.status(200)
    //   })
    //   .catch(err => {
    //     throw err
    //   })
  })

  it('Can login via API', () => {

  })

  it('Throws error when email exists', () => {

  })
})
