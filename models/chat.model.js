const mongoose = require('mongoose')
const userModel = require('./user.model')

const DB_URL = 'mongodb://localhost:27017/chat-app'

const chatSchema = mongoose.Schema({
    name: String,
    image: { type: String, default: "default-group-image.jpg" },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    isPrivet: { type: Boolean, default: true }
})

const Chat = mongoose.model('chat', chatSchema)
exports.Chat = Chat

exports.getChat = async chatId => {
    try {
        await mongoose.connect(DB_URL)
        let chat = await Chat.findById(chatId).populate('users')
        mongoose.disconnect()
        return chat
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getChatsByChatsId = async idChats => {
    try {
        await mongoose.connect(DB_URL)
        let chats = await Chat.find({
            _id: {
                $in: idChats
            }
        })
        mongoose.disconnect()
        return chats
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.addGroup = async data => {
    try {
        /*userModel.AddGroupChat('5f80221b9a23e5134436742f', '5f802665e14b1020447c84a7').then(chats => {
                console.log("chatModel 47\nchats : ", chats);
            })*/
        await mongoose.connect(DB_URL)
        let newchat = new Chat(data)
        await newchat.save()
        console.log(data.users, data.users.length);
        for (let i = 0; i < data.users.length; i++) {
            //console.log("i: ", data.users[i], newchat._id);
            userModel.User.updateOne({ _id: data.users[i] }, {
                $push: {
                    chatsId: newchat._id
                }
            })
        }
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}