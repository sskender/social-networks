const User = require('../models/user')
const Favorite = require('../models/favorite')

const getUserFromProfile = async (profile) => {
  const currentUser = await User.findOne({ id: profile.id })
  if (!currentUser) {
    const newUser = await new User({
      id: profile.id,
      provider: profile.provider,
      username: profile.username,
      display_name: profile.displayName
    }).save()
    return newUser
  }
  return currentUser
}

const getFavoriteArtists = async (userId) => {
  return Favorite.find({ user_id: userId }).populate('artist_id').select({ artist_id: 1, _id: 0 }).exec()
}

const addFavoriteArtist = async (userId, artistId) => {
  const favorite = await Favorite.findOne({ user_id: userId, artist_id: artistId }).exec()
  if (favorite === null) {
    const newFavorite = new Favorite({ user_id: userId, artist_id: artistId })
    return newFavorite.save()
  }
}

const removeFavoriteArtist = async (userId, artistId) => {
  return Favorite.deleteOne({ user_id: userId, artist_id: artistId }).exec()
}

module.exports = {
  getUserFromProfile,
  getFavoriteArtists,
  addFavoriteArtist,
  removeFavoriteArtist
}
