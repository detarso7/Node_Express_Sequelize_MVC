const express = require('express')

const router = express.Router()

const AuthController = require('../constollers/AuthController')

router.get('/login', AuthController.login)
router.get('/register', AuthController.register)
router.post('/register', AuthController.registerPost)
router.get('/logout', AuthController.logout)

module.exports = router