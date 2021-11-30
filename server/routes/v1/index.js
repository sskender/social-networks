const express = require('express')
const helloWorldRoute = require('./helloworld.route')

const router = express.Router()

router.use('/', helloWorldRoute)

module.exports = router
