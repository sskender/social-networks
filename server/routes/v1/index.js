const express = require('express')

const authRoute = require('./auth.route')
const helloWorldRoute = require('./helloworld.route')

const router = express.Router()

router.use('/auth', authRoute)
router.use('/', helloWorldRoute)

module.exports = router
