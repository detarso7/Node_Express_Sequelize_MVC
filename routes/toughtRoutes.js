const express = require('express')
const router = express.Router()

const checkAuth = require('../helpers/auth').checkAuth

const ToughtController = require('../constollers/ToughtController')

router.get('/add', checkAuth, ToughtController.createTought)
router.post('/add', checkAuth, ToughtController.createToughtPost)
router.post('/delete', checkAuth, ToughtController.toughtDelete)
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/', ToughtController.showTough)

module.exports = router