const express = require('express')
const router = express.Router()
const log_controller = require('../controllers/log')

router.get('/list', log_controller.list)

module.exports = router