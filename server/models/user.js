const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  username: {
    type: String,
    required: true
  },
  display_name: {
    type: String,
    required: false,
    default: ''
  },
  provider: {
    type: String,
    required: false,
    default: 'local'
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
