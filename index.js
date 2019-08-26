const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()

const authRoute = require('./routes/auth.js')

const { MONGODB_URI, PORT } = process.env

const app = express()

mongoose
  .connect(MONGODB_URI, {'useNewUrlParser': true})
  .catch(handleConnectionError)

mongoose.connection.on('error', logError)

app
  .use(bodyParser.json())
  .use('/api/user', authRoute)

app.listen(PORT, () => {
  console.log(`Development server available on http://localhost:${PORT}`)
})

function handleConnectionError(error) {
  console.log('Could not connect to database with error: ', error)
}

function logError(error) {
  console.log('Database connection failed with error: ', error)
}
