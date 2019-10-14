const mongoose = require('mongoose')

const { ObjectId, Schema } = mongoose

const userSchema = new Schema({
  _id: ObjectId,
  untappdId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  firstName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  beers: {
    type: Array,
    default: [],
  },
})

module.exports = mongoose.model('User', userSchema)
