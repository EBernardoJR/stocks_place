const express = require("express");
const router = express.Router()
const userController = require('./controllers/userController')
const stockController = require('./controllers/stockController')

router.post('/user', userController.create)

router.get('/stocks/:stock/quote', stockController.index)

module.exports = router