const router = require('express').Router()
const bodyperser = require('body-parser')
const multer = require('multer')

const authG = require('./guards/auth.guard')
const chatController = require('../controllers/chat.controller')

router.get('/', authG.isAuth, chatController.getChatsByChatsId)

router.get('/:id', authG.isAuth, chatController.getGroupChat)

router.post('/addGroup', authG.isAuth, multer({
    storage: multer.diskStorage({
        destination: (req, file, cd) => {
            cd(null, 'images')
        },
        filename: (req, file, cd) => {
            cd(null, Date.now() + '-' + file.originalname)
        }
    })
}).single("image"), bodyperser.urlencoded({ extended: true }), chatController.addGroup)

module.exports = router