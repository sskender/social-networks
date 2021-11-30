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
    saveUninitialized: true
  },
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.TWITTER_CALLBACK_URL
  }
}
