const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  id: {
    type: Number,
    default: '',
    index: true
  },
  email: {
    type: String,
    default: ''
  },
  display_name: {
    type: String,
    default: ''
  },
  provider: {
    type: String,
    default: ''
  }
},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
