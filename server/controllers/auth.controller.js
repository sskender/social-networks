const httpStatus = require('http-status')

const twitterCallback = async (req, res, next) => {
  try {
    const userData = {
      provider: req.user.provider,
      id: req.user.id,
      username: req.user.username,
      display_name: req.user.display_name
    }

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: userData
    })
  } catch (err) {
    return next(err)
  }
}

const logout = async (req, res, next) => {
  try {
    req.logout()

    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: null
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  twitterCallback,
  logout
}
