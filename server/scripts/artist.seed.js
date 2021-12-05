const mongoose = require('mongoose')
const config = require('../config')

const theaudiodbService = require('../services/theaudiodb.service')
const Artist = require('../models/artist')

mongoose
  .connect(config.mongoose.connectionString, config.mongoose.options)
  .then(() => {
    console.log('Connected to MongoDB')

    const artistList = ['Coldplay', 'Michael Buble', 'Aerosmith', 'Doja Cat']

    for (const artist of artistList) {
      theaudiodbService.getArtistDetails(artist).then(artistDetailsList => {
        for (const artistDetails of artistDetailsList) {
          new Artist({
            idArtist: artistDetails.idArtist,
            strArtist: artistDetails.strArtist,
            data: artistDetails
          }).save().then(result => {
            console.log(result)
          })
        }
      })
    }
  })
