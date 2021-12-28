const httpStatus = require('http-status')

const userService = require('../services/user.service')
const artistService = require('../services/artist.service')

const getFavoriteArtists = async (req, res, next) => {
  try {
    const userId = req.user._id
    const favorites = await userService.getFavoriteArtists(userId)
    const result = favorites.map(artist => artist.artist_id)

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

const addFavoriteArtist = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { idArtist } = req.body
    const artist = await artistService.getArtistByIdArtist(idArtist)
    await userService.addFavoriteArtist(userId, artist._id)
    next()
  } catch (err) {
    return next(err)
  }
}

const removeFavoriteArtist = async (req, res, next) => {
  try {
    const userId = req.user._id
    const { idArtist } = req.body
    const artist = await artistService.getArtistByIdArtist(idArtist)
    await userService.removeFavoriteArtist(userId, artist._id)
    next()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getFavoriteArtists,
  addFavoriteArtist,
  removeFavoriteArtist
}
