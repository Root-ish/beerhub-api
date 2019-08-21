const { Router } = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const { API_SECRET } = process.env
const router = Router()

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const emailExists = await User.findOne({ email })

  if (emailExists) {
    res.status(400).json({
      message: 'A user with that email already exists'
    })
  }

  const newUser = new User({
    username,
    email: hash(email),
    password: hash(password),
  })

  const token = jwt.sign({ userId: _id }, `${API_SECRET}`)

  res.status(200).json({
    message: `Sucessfully registered user: ${username}`,
    user: {
      userId: _id,
      username,
      email,
    },
    token
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  // @TODO: find solution for dehashing properties from db before checking
  // since the email property is a hash and the req.body value isn't

  const user = await User.findOne({ email: verifyHash(email) })

  const { _id } = user

  if (user && verifyHash(user.password) === password) {
    const token = jwt.sign({ userId: _id }, `${API_SECRET}`)

    res.status(200).json({
      message: 'Login successful',
      user: {
        userId: _id,
        email,
        username
      },
      token
    })
  } else {
    res.status(401).json({
      message: 'Email or password is incorrect'
    })
  }
})

// @TODO: require hashing module from npm
function hash(stringToHash) {
  return
}

function verifyHash(stringToVerify) {
  return
}

module.exports = router
