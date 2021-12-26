const express = require('express')

const authRoute = require('./auth.route')
const contentRoute = require('./content.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/content', contentRoute)

module.exports = router
