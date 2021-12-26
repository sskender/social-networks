const express = require('express')
const contentController = require('../../controllers/content.controller')

const router = express.Router()

router.route('/artist').get(contentController.getAllArtists)
router.route('/artist/:idArtist').get(contentController.getArtistDetails)

module.exports = router
