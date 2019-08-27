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
  throw new Error('Could not connect to database with error: ', error)
}

function logError(error) {
  throw new Error('Database connection failed while running with error: ', error)
}
