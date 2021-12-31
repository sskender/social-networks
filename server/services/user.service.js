const FB = require('fb')

const artistService = require('./artist.service')
const config = require('../config')
const User = require('../models/user')
const Favorite = require('../models/favorite')

/**
 * facebook.com
 */

const getLikedArtists = async (user) => {
  const fb = new FB.Facebook(config.facebook)
  fb.setAccessToken(config.facebook.accessToken)

  const facebookId = user.id
  const response = await fb.api(`/${facebookId}/music`)
  const artistNames = response.data.map(item => item.name)

  const likedArtists = []
  for (const artist of artistNames) {
    const foundArtist = await artistService.getArtistByStrArtist(artist)
    for (const item of foundArtist) {
      likedArtists.push(item)
    }
  }

  return likedArtists
}

const getUserFromPassportProfile = async (profile) => {
  const currentUser = await User.findOne({ id: profile.id })
  if (!currentUser) {
    return new User({
      id: profile.id,
      provider: profile.provider,
      display_name: profile.displayName,
      email: profile.emails[0].value
    }).save()
  }
  return currentUser
}

const getFavoriteArtists = async (userId) => {
  const favorites = await Favorite.find({ user_id: userId }).populate('artist_id').select({ artist_id: 1, _id: 0 }).exec()
  const artists = favorites.map(artist => artist.artist_id)
  return artists
}

const addFavoriteArtist = async (userId, artistId) => {
  const favorite = await Favorite.findOne({ user_id: userId, artist_id: artistId }).exec()
  if (favorite === null) {
    return new Favorite({ user_id: userId, artist_id: artistId }).save()
  }
}

const removeFavoriteArtist = async (userId, artistId) => {
  return Favorite.deleteOne({ user_id: userId, artist_id: artistId }).exec()
}

const getRecommendedArtistsLocal = async (user) => {
  const likedArtists = await getFavoriteArtists(user._id)
  const recommendedItems = []
  for (const artist of likedArtists) {
    const recommendedItem = {}
    const recommendedArtists = new Set()
    const similarArtists = await artistService.getSimilarArtists(artist.idArtist)
    for (const similarArtist of similarArtists) {
      recommendedArtists.add(similarArtist)
    }
    recommendedItem.artist = artist
    recommendedItem.similar = [...recommendedArtists]
    recommendedItems.push(recommendedItem)
  }
  return recommendedItems
}

const getRecommendedArtistsExternal = async (user) => {
  const likedArtists = await getLikedArtists(user)
  const recommendedItems = []
  for (const artist of likedArtists) {
    const recommendedItem = {}
    const recommendedArtists = new Set()
    const similarArtists = await artistService.getSimilarArtists(artist.idArtist)
    for (const similarArtist of similarArtists) {
      recommendedArtists.add(similarArtist)
    }
    recommendedItem.artist = artist
    recommendedItem.similar = [...recommendedArtists]
    recommendedItems.push(recommendedItem)
  }
  return recommendedItems
}

module.exports = {
  getLikedArtists,
  getUserFromPassportProfile,
  getFavoriteArtists,
  addFavoriteArtist,
  removeFavoriteArtist,
  getRecommendedArtistsLocal,
  getRecommendedArtistsExternal
}
