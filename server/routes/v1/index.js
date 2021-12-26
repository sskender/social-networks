const express = require('express')

const authRoute = require('./auth.route')
const artistRoute = require('./artist.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/artist', artistRoute)

module.exports = router
