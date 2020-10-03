const router = require('express').Router()

const authG = require('./guards/auth.guard')
const chatController = require('../controllers/chat.controller')

router.get('/:id', authG.isAuth, chatController.getChat)

module.exports = router