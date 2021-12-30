const httpStatus = require('http-status')

const loginCallback = async (req, res, next) => {
  try {
    return res.status(httpStatus.OK).json({
      success: true,
      status: httpStatus.OK,
      data: req.user
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
  loginCallback,
  logout
}
