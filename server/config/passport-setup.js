const passport = require('passport')
const Strategy = require('passport-twitter').Strategy

module.exports = (config) => {
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
      (token, tokenSecret, profile, cb) => {
        return cb(null, profile)
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
