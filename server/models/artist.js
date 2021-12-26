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
  idLabel: {
    type: Number
  },
  intFormedYear: {
    type: Number
  },
  intBornYear: {
    type: Number
  },
  strStyle: {
    type: String
  },
  strGenre: {
    type: String
  },
  strMood: {
    type: String
  },
  strWebsite: {
    type: String
  },
  strFacebook: {
    type: String
  },
  strTwitter: {
    type: String
  },
  strBiographyEN: {
    type: String
  },
  strCountry: {
    type: String
  },
  strArtistThumb: {
    type: String
  }
})

const Artist = mongoose.model('Artist', artistSchema)

module.exports = Artist
