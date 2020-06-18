var express = require('express')
const server_controller = require('../controllers/server')

var router = express.Router()

router.post('/open', server_controller.open)
router.post('/close', server_controller.close)
router.get('/reboot', server_controller.reboot)
router.get('/status', server_controller.status)

module.exports = router;
