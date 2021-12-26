const httpStatus = require('http-status')
const contentService = require('../services/content.service')

const getAllArtists = async (req, res, next) => {
  try {
    const result = await contentService.getAllArtists()

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
    const result = await contentService.getArtistDetails(idArtist)

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
  getArtistDetails
}
