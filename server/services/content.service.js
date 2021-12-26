const axios = require('axios')

const Artist = require('../models/artist')

/**
 * Artist
 */

const saveNewArtist = async (artistName) => {
  const BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2/search.php'
  const payload = {
    s: artistName
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const artistDetailsList = response.data.artists
    for (const artistDetails of artistDetailsList) {
      const newArtist = new Artist({
        idArtist: artistDetails.idArtist,
        strArtist: artistDetails.strArtist,
        idLabel: artistDetails.idLabel,
        intFormedYear: artistDetails.intFormedYear,
        intBornYear: artistDetails.intBornYear,
        strStyle: artistDetails.strStyle,
        strGenre: artistDetails.strGenre,
        strMood: artistDetails.strMood,
        strWebsite: artistDetails.strWebsite,
        strFacebook: artistDetails.strFacebook,
        strTwitter: artistDetails.strTwitter,
        strBiographyEN: artistDetails.strBiographyEN,
        strCountry: artistDetails.strCountry,
        strArtistThumb: artistDetails.strArtistThumb
      })
      await newArtist.save()
    }
  } catch (err) {
    console.error(err)
  }
}

const getAllArtists = async () => {
  return Artist.find({}).select({ idArtist: 1, strArtist: 1, strArtistThumb: 1 }).exec()
}

const getArtistDetails = async (idArtist) => {
  return Artist.findOne({ idArtist: idArtist }).exec()
}

module.exports = { saveNewArtist, getAllArtists, getArtistDetails }
