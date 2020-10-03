const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/chat-app'

const chatSchema = mongoose.Schema({
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]
})

const Chat = mongoose.model('chat', chatSchema)
exports.Chat = Chat