const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')

const Artist = require('../models/artist')

dotenv.config({ path: path.join(__dirname, './../.env') })

/**
 * lastfm.com
 */

const fetchArtistInfo = async (strArtist) => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'artist.getinfo',
    artist: strArtist
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data.artist
    return {
      listeners: data.stats.listeners,
      playcount: data.stats.playcount,
      ontour: data.ontour
    }
  } catch (err) {
    console.error(err)
  }
}

const fetchSimilarArtists = async (strArtist) => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'artist.getsimilar',
    artist: strArtist,
    limit: 250
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data
    return data.similarartists.artist
  } catch (err) {
    console.error(err)
  }
}

const fetchArtistTopAlbums = async () => {}

/**
 * theaudiodb.com
 */

const storeNewArtist = async (artistName) => {
  const BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2/search.php'
  const payload = {
    s: artistName
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const artistDetailsList = response.data.artists

    for (const artistDetails of artistDetailsList) {
      // fetch additional info
      const additionalInfo = await fetchArtistInfo(artistDetails.strArtist)

      // save to database
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
        strArtistThumb: artistDetails.strArtistThumb,
        intListeners: additionalInfo.listeners,
        intPlaycount: additionalInfo.playcount
      })
      await newArtist.save()
    }
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  storeNewArtist,
  fetchArtistInfo,
  fetchSimilarArtists,
  fetchArtistTopAlbums
}
