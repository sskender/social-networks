const mongoose = require('mongoose')
const { Schema } = mongoose

const favoriteSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artist_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true
  }
})

favoriteSchema.index({ artist_id: 1, user_id: 1 }, { unique: true })

const Favorite = mongoose.model('Favorite', favoriteSchema)

module.exports = Favorite
