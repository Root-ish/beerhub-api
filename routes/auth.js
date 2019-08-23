const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcrypt')
require('dotenv').config()

const { API_SECRET } = process.env
const User = require('../models/User')
const router = Router()

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const emailExists = Boolean(await User.findOne({ email }))

  if (emailExists) {
    res.status(400).json({
      message: 'A user with that email already exists'
    })
  }

  const newUser = new User({
    username,
    email,
    password: hashString(password),
  })

  User.save(newUser)

  const token = jwt.sign({ username }, `${API_SECRET}`)

  res.status(200).json({
    message: `Sucessfully registered user: ${username}`,
    user: {
      username,
      email,
    },
    token
  })
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const { username, _id } = user

  if (user && verifyHash(password, user.password)) {
    const token = jwt.sign({ username }, `${API_SECRET}`)

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id,
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

module.exports = router

function hashString(string) {
  return hash(string, 10)
    .then(hash => {
      return hash
    })
    .catch(error => [
      console.log(`Error while hashing password: ${error}`)
    ])
}

function verifyHash(string, hash) {
  return compare(string, hash)
    .then(res => res)
    .catch(error => {
      console.log(`Error while comparing password: ${error}`)
    })
}
