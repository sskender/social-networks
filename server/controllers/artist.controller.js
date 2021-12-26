const httpStatus = require('http-status')
const artistService = require('../services/artist.service')

const getAllArtists = async (req, res, next) => {
  try {
    const result = await artistService.getAllArtists()

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

const getArtistDetails = async (req, res, next) => {
  try {
    const { idArtist } = req.params
    const result = await artistService.getArtistDetails(idArtist)

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

const getTopArtistsGeo = async (req, res, next) => {
  try {
    const topArtists = await artistService.fetchTopArtistsGeo()
    const strArtists = topArtists.map(artist => artist.strArtist)
    const result = await artistService.getArtistsFromArray(strArtists)

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

const getSimilarArtists = async (req, res, next) => {
  try {
    const { idArtist } = req.params
    const artist = await artistService.getArtistDetails(idArtist)
    const similarStrArtists = await artistService.fetchSimilarArtists(artist.strArtist)
    const result = await artistService.getArtistsFromArray(similarStrArtists)

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

const getArtistsByGenre = async (req, res, next) => {
  try {
    const { strGenre } = req.params
    const result = await artistService.getArtistByStrGenre(strGenre)

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: result
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getAllArtists,
  getArtistDetails,
  getTopArtistsGeo,
  getSimilarArtists,
  getArtistsByGenre
}
