const cors = require('cors')
const express = require('express')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const mongoose = require('mongoose')
const morgan = require('morgan')
const passport = require('passport')
const path = require('path')
const session = require('express-session')
const xss = require('xss-clean')

const config = require('./config')
const routes = require('./routes/v1')
const { clientErrorHandler, errorHandler } = require('./routes/errors')

const passportSetup = require('./config/passport-setup.js')
passportSetup(config)

mongoose.connect(config.mongoose.connectionString, config.mongoose.options).then(() => {
  console.log('Connected to MongoDB')
})

const app = express()

app.use(morgan('common'))
app.use(helmet({
  contentSecurityPolicy: false
}))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(xss())
app.use(mongoSanitize())

app.use(session(config.sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/api/v1', routes)
app.use(clientErrorHandler)
app.use(errorHandler)

app.listen(config.port, () =>
  console.log(`App listening on port ${config.port}!`)
)
