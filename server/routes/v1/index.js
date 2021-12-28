const express = require('express')
const mongoose = require('mongoose')

const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const artistRoute = require('./artist.route')

const router = express.Router()

const tempMiddleware = async (req, res, next) => {
  const user = { _id: mongoose.Types.ObjectId('61a80404e2095f77339a0119') }
  req.user = user
  next()
}

router.use('/auth', authRoute)
router.use(tempMiddleware)
router.use('/user', userRoute)
router.use('/artist', artistRoute)

module.exports = router
