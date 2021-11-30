const express = require('express')
const passport = require('passport')

const authController = require('../../controllers/auth.controller')

const router = express.Router()

router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback', passport.authenticate('twitter'), authController.twitterCallback)
// TODO logout
// TODO read passport docs

module.exports = router
