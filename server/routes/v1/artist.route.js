const express = require('express')
const artistController = require('../../controllers/artist.controller')

const router = express.Router()

router.route('/').get(artistController.getAllArtists)

router.route('/top').get(artistController.getTopArtistsGeo)

router.route('/genre/:strGenre').get(artistController.getArtistsByGenre)

router.route('/:idArtist').get(artistController.getArtistDetails)
router.route('/:idArtist/similar').get(artistController.getSimilarArtists)

module.exports = router
