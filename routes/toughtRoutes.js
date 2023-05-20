const express = require('express')

const router = express.Router()

const ToughtController = require('../constollers/ToughtController')

router.get('/dashboard', ToughtController.dashboard)
router.get('/', ToughtController.showTough)

module.exports = router