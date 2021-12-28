const mongoose = require('mongoose')

const config = require('../config')
const artistService = require('../services/artist.service')

const artistsList = []

const timer = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

mongoose
  .connect(config.mongoose.connectionString, config.mongoose.options)
  .then(async () => {
    console.log('Connected to MongoDB')

    for (const artist of artistsList) {
      await artistService.storeNewArtist(artist)
      console.log(`Saved: ${artist}`)
      await timer(2000)
    }
  })
