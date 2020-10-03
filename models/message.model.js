const mongoose = require('mongoose')

const DB_URL = 'mongodb://localhost:27017/chat-app'

const messageSchema = mongoose.Schema({
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
    content: String,
    sender: String,
    timestamp: Number
})

const Message = mongoose.model('message', messageSchema)

exports.getMessages = async chatId => {
    try {
        await mongoose.connect(DB_URL)
        let messages = await Message.find({ chat: chatId }).populate({
            path: 'chat', //  field
            model: 'chat', // model
            populate: {
                path: 'users',
                model: 'user',
                select: 'username image'
            }
        })
        mongoose.disconnect()
        return messages
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}