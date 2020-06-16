const express = require('express')
const user_controller = require('../controllers/user')

const router = express.Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' })
})

router.post('/login', user_controller.login)

module.exports = router
