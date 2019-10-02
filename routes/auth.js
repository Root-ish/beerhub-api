const { Router } = require('express')
const { hash, compare } = require('bcrypt')
const { sign } = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const { API_SECRET } = process.env
const router = Router()

const User = require('../models/User')

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  const emailExists = Boolean(await User.findOne({ email }))

  if (emailExists) {
    res.status(400).json({
      message: 'A user with that email already exists',
    })
  }

  try {
    const hashed = await hash(password, 10)
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      username,
      email,
      password: hashed,
    })

    await newUser.save()

    const token = sign({ username }, API_SECRET)

    res.json({
      message: `Succesfully registered user: ${username}`,
      user: {
        username,
        email,
      },
      token,
    })
  } catch (error) {
    console.log('Error while registering user: ', error)

    res.status(400).json({
      message: `Something went wrong while registering user: ${username}`,
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  const userPassword = user ? user.password : ''

  const isValidPassword = await compare(password, userPassword)

  if (user && isValidPassword) {
    const { username, _id } = user
    const token = sign({ username }, API_SECRET)

    res.json({
      message: 'Login successful',
      user: {
        _id,
        email,
        username,
      },
      token,
    })
  } else {
    res.status(401).json({
      message: 'Email or password is incorrect',
    })
  }
})

module.exports = router
