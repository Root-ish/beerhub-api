const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const authRoute = require('./routes/auth.js')

const {
  MONGODB_URI,
  MONGODB_TEST_URI,
  PORT,
  NODE_ENV
} = process.env

const app = express()

const env = NODE_ENV || 'development'
const dbToConnect = env === 'test' ? MONGODB_TEST_URI : MONGODB_URI

mongoose
  .connect(dbToConnect, {'useNewUrlParser': true})
  .catch(handleConnectionError)

mongoose.connection.on('error', logError)

app
  .use(cors())
  .use(bodyParser.json())

  .use('/api/user', authRoute)

app.listen(PORT, () => {
  console.log(`Development server available on http://localhost:${PORT}`)
})

module.exports = app

function handleConnectionError(error) {
  throw new Error('Could not connect to database with error: ', error)
}

function logError(error) {
  throw new Error('Database connection failed while running with error: ', error)
}
