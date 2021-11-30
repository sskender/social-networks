const httpStatus = require('http-status')

const twitterCallback = async (req, res, next) => {
  try {
    // TODO make nicer
    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: req.user
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  twitterCallback
}
