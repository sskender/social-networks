const httpStatus = require('http-status')
const helloWorldService = require('../services/helloworld.service.js')

const greeting = async (req, res, next) => {
  try {
    const result = await helloWorldService.getGreeting()

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
  greeting
}
