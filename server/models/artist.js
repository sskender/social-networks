const mongoose = require('mongoose')
const { Schema } = mongoose

const artistSchema = new Schema({
  idArtist: {
    type: Number,
    required: true,
    unique: true,
    index: true
  },
  strArtist: {
    type: String,
    required: true
  },
  data: { type: Object }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
