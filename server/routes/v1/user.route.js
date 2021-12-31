const express = require('express')
const userController = require('../../controllers/user.controller')

const router = express.Router()

router.route('/favorite').get(userController.getFavoriteArtists)
router.route('/favorite').post(userController.addFavoriteArtist, userController.getFavoriteArtists)
router.route('/favorite').delete(userController.removeFavoriteArtist, userController.getFavoriteArtists)

router.route('/liked').get(userController.getLikedArtists)

router.route('/recommend/local').get(userController.getRecommendedArtistsLocal)
router.route('/recommend/external').get(userController.getRecommendedArtistsExternal)

module.exports = router
