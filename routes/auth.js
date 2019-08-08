const router = require('express').Router()

router.post('/register', (req, res) => {
  res.send('Registered')
})

router.post('/login', (req, res) => {
  res.send('Logged in')
})

module.exports = router
