const Router = require('express')
const router = new Router()
const InputController = require('../controller/input.controller')

router.post('/input', InputController.postString)
router.post('/input-check', InputController.checkLetters)

module.exports = router