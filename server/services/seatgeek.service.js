const dotenv = require('dotenv')
const path = require('path')
const axios = require('axios')

/**
 * seatgeek.com
 */

dotenv.config({ path: path.join(__dirname, './../.env') })

const BASE_URL = 'https://api.seatgeek.com/2/events'

const CLIENT_ID = process.env.SEATGEEK_CLIENT_ID
const CLIENT_SECRET = process.env.SEATGEEK_CLIENT_SECRET

const getListOfEventsByGeolocation = async (lat, lon, range) => {
  const EXPECTED_STATUS_CODE = 200
  const PER_PAGE = 50

  const URL = `${BASE_URL}`
  const payload = {
    lat: lat,
    lon: lon,
    range: `${range}km`,
    per_page: PER_PAGE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  }

  try {
    const response = await axios.get(URL, { params: payload })
    if (response.status === EXPECTED_STATUS_CODE) {
      return response.data
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

const getEventById = async (eventId) => {
  const EXPECTED_STATUS_CODE = 200

  const URL = `${BASE_URL}/${eventId}`
  const payload = {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  }

  try {
    const response = await axios.get(URL, { params: payload })
    if (response.status === EXPECTED_STATUS_CODE) {
      return response.data
    } else {
      return null
    }
  } catch (err) {
    console.error(err)
    return null
  }
}

module.exports = {
  getListOfEventsByGeolocation,
  getEventById
}
