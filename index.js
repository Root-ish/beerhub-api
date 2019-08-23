const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const port = 5454
const app = express()

const authRoute = require('./routes/auth')

// Process environment uri and connect to database
const uri = process.env.MONGODB_URI

mongoose.connect(uri, {'useNewUrlParser': true})
  .catch(handleConnectionError)
mongoose.connection.on('error', logError)


// Routes
app.use('/api/user', authRoute)

app.listen(port, () => {
  console.log(`Development server available on http://localhost:${port}`)
})

function handleConnectionError(error) {
  console.log('Could not connect to database with error: ', error)
}

function logError(error) {
  console.log('Database connection failed with error: ', error)
}
