const express = require('express')

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const artistRoute = require('./artist.route')

const router = express.Router()

const verifyUserMiddleware = async (req, res, next) => {
  if (!req.user) {
    const err = new Error('User not logged in')
    err.statusCode = 401
    return next(err)
  } else {
    next()
  }
}

router.use('/auth', authRoute)
router.use(verifyUserMiddleware)
router.use('/user', userRoute)
router.use('/artist', artistRoute)

module.exports = router
