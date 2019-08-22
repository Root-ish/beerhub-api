const mongoose = require('mongoose')
const {ObjectId, Schema} = mongoose

const userSchema = new Schema({
    _id: ObjectId,
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    beers: Array
})

module.exports = mongoose.model('User', userSchema)
