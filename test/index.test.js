const { assert } = require('chai')

describe('First test', () => {
  it('Should pass', () => {
    assert.equal(1, 1)
  })

  it('Should fail', () => {
    assert.equal('Hello', 'Not hello')
  })
})
