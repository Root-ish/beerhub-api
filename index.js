const express = require('express')
const mongoose = require("mongoose")
require("dotenv").config()

const port = 5454
const app = express()

const authRoute = require('./routes/auth')

// Process environment uri and connect to database
const uri = process.env.MONGODB_URI
mongoose.set("useNewUrlParser", true)
mongoose.connect(uri)

// Routes
app.use('/api/user', authRoute)

app.listen(port, () => {
  console.log(`Development server available on http://localhost:${port}`)
})
