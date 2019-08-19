const mongoose = require("mongoose")
const {ObjectId, Schema} = mongoose

const userSchema = new Schema({
    _id: ObjectId,
    email: String,
    password: String,
    beers: Array
})

module.exports = mongoose.model("User", userSchema)
