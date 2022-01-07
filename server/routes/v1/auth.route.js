const express = require('express')
const passport = require('passport')

const authController = require('../../controllers/auth.controller')

const router = express.Router()

router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback', passport.authenticate('twitter'), authController.loginCallback)

router.get('/facebook', passport.authenticate('facebook', { scope: ['user_likes', 'email'] }))
router.get('/facebook/callback', passport.authenticate('facebook', {
  successRedirect: process.env.CLIENT_HOME_PAGE_URL,
  failureRedirect: process.env.CLIENT_HOME_PAGE_URL
}))

router.get('/logout', authController.logout)

module.exports = router
