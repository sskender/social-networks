const Artist = require('../models/artist')

const getAllArtists = async () => {
  return Artist.find({}).select({ idArtist: 1, strArtist: 1, strArtistThumb: 1 }).exec()
}

const getArtistDetails = async (idArtist) => {
  return Artist.findOne({ idArtist: idArtist }).exec()
}

module.exports = {
  getAllArtists,
  getArtistDetails
}
