const mongoose = require('mongoose')
const config = require('../config')

const seatgeekService = require('../services/seatgeek.service')
const Event = require('../models/event')

mongoose
  .connect(config.mongoose.connectionString, config.mongoose.options)
  .then(() => {
    console.log('Connected to MongoDB')

    const locationsList = [
      // { lat: 45.814632, lon: 15.978783, range: 500 },
      // { lat: 48.864716, lon: 2.349014, range: 300 },
      { lat: 40.73061, lon: -73.935242, range: 100 }
    ]

    for (const location of locationsList) {
      seatgeekService
        .getListOfEventsByGeolocation(location)
        .then((eventsDetailsList) => {
          for (const eventsDetails of eventsDetailsList.events) {
            new Event(eventsDetails)
              .save()
              .then((result) => {
                console.log(result)
              })
          }
        })
    }
  })
