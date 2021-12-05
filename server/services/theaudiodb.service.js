const axios = require('axios')

/**
 * theaudiodb.com
 */

const BASE_URL = 'https://www.theaudiodb.com/api/v1/json/2/search.php'

const getArtistDetails = async (artist) => {
  const EXPECTED_STATUS_CODE = 200

  const payload = {
    s: artist
  }

  try {
    const response = await axios.get(BASE_URL, { params: payload })
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

module.exports = { getArtistDetails }
