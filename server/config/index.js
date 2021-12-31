const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.join(__dirname, './../.env') })

module.exports = {
  port: process.env.PORT || 3000,
  mongoose: {
    connectionString: process.env.DB_CONNECTION,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  sessionOptions: {
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxage: 24 * 60 * 60 * 1000 }
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  },
  facebook: {
    appId: process.env.FACEBOOK_APP_ID,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN
  }
}
