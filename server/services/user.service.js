const User = require('../models/user')
const Favorite = require('../models/favorite')

const getUserFromPassportProfile = async (profile) => {
  const currentUser = await User.findOne({ id: profile.id })
  if (!currentUser) {
    const newUser = await new User({
      id: profile.id,
      provider: profile.provider,
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
    return new Favorite({ user_id: userId, artist_id: artistId }).save()
  }
}

const removeFavoriteArtist = async (userId, artistId) => {
  return Favorite.deleteOne({ user_id: userId, artist_id: artistId }).exec()
}

module.exports = {
  getUserFromPassportProfile,
  getFavoriteArtists,
  addFavoriteArtist,
  removeFavoriteArtist
}
