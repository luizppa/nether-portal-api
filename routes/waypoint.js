const express = require('express')
const router = express.Router()
const waypoint_controller = require('../controllers/waypoint')

router.post('/create', waypoint_controller.create)
router.get('/:id', waypoint_controller.get)
router.get('/', waypoint_controller.list)
router.put('/update/:id', waypoint_controller.update)
router.delete('/:id', waypoint_controller.delete)

module.exports = router