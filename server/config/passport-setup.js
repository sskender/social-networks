const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const userService = require('../services/user.service.js')

const setup = (config) => {
  // Configure the Twitter strategy for use by Passport.
  //
  // OAuth 1.0-based strategies require a `verify` function which receives the
  // credentials (`token` and `tokenSecret`) for accessing the Twitter API on the
  // user's behalf, along with the user's profile.  The function must invoke `cb`
  // with a user object, which will be set at `req.user` in route handlers after
  // authentication.
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
        proxy: false
      },
      async (token, tokenSecret, profile, cb) => {
        try {
          const user = await userService.getUserFromPassportProfile(profile)
          return cb(null, user)
        } catch (err) {
          return cb(err, null)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: config.facebook.appId,
        clientSecret: config.facebook.appSecret,
        callbackURL: config.facebook.callbackURL,
        profileFields: ['displayName', 'email']
      },
      async (accessToken, refreshToken, profile, cb) => {
        try {
          const user = await userService.getUserFromPassportProfile(profile)
          return cb(null, user)
        } catch (err) {
          return cb(err, null)
        }
      }
    ))

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })
}

module.exports = setup
