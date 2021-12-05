const passport = require('passport')
const Strategy = require('passport-twitter').Strategy

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
    new Strategy(
      {
        consumerKey: config.twitter.consumerKey,
        consumerSecret: config.twitter.consumerSecret,
        callbackURL: config.twitter.callbackURL,
        proxy: false
      },
      async (token, tokenSecret, profile, cb) => {
        const user = await userService.getUserFromProfile(profile)
        return cb(null, user)
      }
    )
  )

  passport.serializeUser((user, cb) => {
    cb(null, user)
  })

  passport.deserializeUser((obj, cb) => {
    cb(null, obj)
  })
}

module.exports = setup