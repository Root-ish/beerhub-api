const chai = require('chai')

describe('First test', () => {
  it('Should pass', () => {
    chai.assert.equal(1, 1)
  })

  it('Should fail', () => {
    chai.assert.equal('Hello', 'Not hello')
  })
})
