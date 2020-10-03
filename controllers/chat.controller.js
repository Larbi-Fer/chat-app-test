const chatModel = require('../models/chat.model')
const messageModel = require('../models/message.model')

exports.getChat = (req, res, next) => {
    let chatId = req.params.id
    messageModel.getMessages(chatId).then(messages => {
        res.send(messages)
    })
}