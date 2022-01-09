const axios = require('axios')

const Artist = require('../models/artist')

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
    limit: 50
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
    limit: 50
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

/**
 * rapidapi.com shazam
 */

const fetchTopArtistsShazam = async () => {
  const BASE_URL = 'https://shazam.p.rapidapi.com/charts/track'
  const headers = {
    'x-rapidapi-host': process.env.RAPID_API_HOST,
    'x-rapidapi-key': process.env.RAPID_API_KEY
  }

  try {
    const response = await axios.get(BASE_URL, { headers: headers })
    const tracksList = response.data.tracks

    const allArtists = new Set()
    for (const track of tracksList) {
      const rawArtists = track.artists?.map(artist => artist?.alias?.replace(/-/g, ' '))
      if (rawArtists) {
        for (const rawArtist of rawArtists) {
          if (rawArtist) {
            allArtists.add(rawArtist)
          }
        }
      }
    }

    return [...allArtists]
  } catch (err) {
    console.error(err)
  }
}

/**
 * internal
 */

const getArtistByIdArtist = async (idArtist) => {
  return Artist.findOne({ idArtist: idArtist }).exec()
}

const getAllArtists = async () => {
  return Artist.find({}).exec()
}

const getArtistDetails = async (idArtist) => {
  return Artist.findOne({ idArtist: idArtist }).exec()
}

const getArtistByStrArtist = async (strArtist) => {
  return Artist.find({ strArtist: { $regex: '.*' + strArtist + '.*', $options: 'i' } }).exec()
}

const getSimilarArtists = async (idArtist) => {
  const artist = await getArtistDetails(idArtist)
  const similarStrArtists = await fetchSimilarArtists(artist.strArtist)
  return Artist.find({ strArtist: { $in: similarStrArtists } }).sort({ intListeners: -1 }).exec()
}

const getStrGenres = async () => {
  return Artist.find({}).distinct('strGenre', { strGenre: { $nin: ['', null] } }).exec()
}

const getArtistByStrGenre = async (strGenre) => {
  return Artist.find({ strGenre: { $regex: '.*' + strGenre + '.*', $options: 'i' } }).exec()
}

const getTopArtistsGeo = async () => {
  const topArtists = await fetchTopArtistsGeo()
  const strArtists = topArtists.map(artist => artist.strArtist)
  const topShazamArtists = await fetchTopArtistsShazam()
  strArtists.push(...topShazamArtists)
  const rStrArtists = strArtists.map(strArtist => new RegExp(strArtist, 'i'))
  return Artist.find({ strArtist: { $in: rStrArtists } }).sort({ intListeners: -1 }).exec()
}

module.exports = {
  getArtistByIdArtist,
  getAllArtists,
  getArtistDetails,
  getArtistByStrArtist,
  getSimilarArtists,
  getStrGenres,
  getArtistByStrGenre,
  getTopArtistsGeo,
  storeNewArtist
}
