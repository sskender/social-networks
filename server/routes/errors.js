const httpStatus = require('http-status')

const clientErrorHandler = (req, res, next) => {
  const error = new Error('Not found')
  error.statusCode = httpStatus.NOT_FOUND
  next(error)
}

const errorHandler = (err, req, res, next) => {
  if (!err.statusCode) {
    err.statusCode = httpStatus.INTERNAL_SERVER_ERROR
  }

  if (!err.message) {
    err.message = 'Internal server error'
  }

  return res.json({
    success: false,
    message: err.message,
    status: err.statusCode
  })
}

module.exports = { clientErrorHandler, errorHandler }
