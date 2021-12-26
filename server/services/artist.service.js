const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')

const Artist = require('../models/artist')

dotenv.config({ path: path.join(__dirname, './../.env') })

const getArtistByStrArtist = async (strArtist) => {
  return Artist.find({ strArtist: { $regex: '.*' + strArtist + '.*', $options: 'i' } }).exec()
}

const getAllArtists = async () => {
  return Artist.find({}).exec()
}

const getArtistDetails = async (idArtist) => {
  return Artist.findOne({ idArtist: idArtist }).exec()
}

const getArtistsFromArray = async (strArtists) => {
  return Artist.find({ strArtist: { $in: strArtists } }).exec()
}

const getArtistByStrGenre = async (strGenre) => {
  return Artist.find({ strGenre: { $regex: '.*' + strGenre + '.*', $options: 'i' } }).exec()
}

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
    const data = response.data.similarartists.artist
    const strArtists = data.map(artist => artist.name)
    return strArtists
  } catch (err) {
    console.error(err)
  }
}

const fetchArtistTopAlbums = async (strArtist) => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'artist.gettopalbums',
    artist: strArtist,
    limit: 250
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data.topalbums.album
    const albums = []
    data.forEach(album => {
      albums.push({
        strAlbum: album.name,
        intPlaycount: album.playcount,
        strAlbumArt: album.image[2]['#text']
      })
    })
    return albums
  } catch (err) {
    console.error(err)
  }
}

const fetchArtistTopTracks = async (strArtist) => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'artist.gettoptracks',
    artist: strArtist,
    limit: 250
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data.toptracks.track
    const tracks = []
    data.forEach(track => {
      tracks.push({
        strTrack: track.name,
        intPlaycount: track.playcount,
        intListeners: track.listeners,
        strTrackArt: track.image[2]['#text']
      })
    })
    return tracks
  } catch (err) {
    console.error(err)
  }
}

const fetchTopArtistsGeo = async () => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'geo.gettopartists',
    country: 'croatia',
    limit: 250
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data.topartists.artist
    const artists = data.map(artist => ({ strArtist: artist.name, intListeners: artist.listeners }))
    return artists
  } catch (err) {
    console.error(err)
  }
}

const fetchTopTracksGeo = async () => {
  const BASE_URL = 'http://ws.audioscrobbler.com/2.0'
  const LAST_FM_KEY = process.env.LAST_FM_KEY
  const payload = {
    api_key: LAST_FM_KEY,
    format: 'json',
    method: 'geo.gettoptracks',
    country: 'croatia',
    limit: 250
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
    const data = response.data.tracks.track
    const tracks = data.map(track => ({ strTrack: track.name, strArtist: track.artist.name, intListeners: track.listeners }))
    return tracks
  } catch (err) {
    console.error(err)
  }
}

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
  getArtistByStrArtist,
  getAllArtists,
  getArtistDetails,
  getArtistsFromArray,
  getArtistByStrGenre,
  storeNewArtist,
  fetchArtistInfo,
  fetchSimilarArtists,
  fetchArtistTopAlbums,
  fetchArtistTopTracks,
  fetchTopArtistsGeo,
  fetchTopTracksGeo
}
