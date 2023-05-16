const express = require('express')

const router = express.Router()

const ToughtController = require('../constollers/ToughtController')

router.get('/', ToughtController.showTough)

module.exports = router