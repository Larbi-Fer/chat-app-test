const chatModel = require('../models/chat.model')
const messageModel = require('../models/message.model')
const userModel = require('../models/user.model')

exports.getChat = (req, res, next) => {
    let chatId = req.params.id
    messageModel.getMessages(chatId).then(messages => {
        if (messages.length === 0) {
            chatModel.getChat(chatId).then(chat => {

                let friendData = chat.users.find(
                    user => user._id != req.session.userId
                )
                renderChat(res, req, friendData, messages, chatId)
            })
        } else {
            let friendData = messages[0].chat.users.find(
                user => user._id != req.session.userId
            )
            renderChat(res, req, friendData, messages, chatId)
        }
    }).catch(err => {
        console.log("err: ", err);
        next(err)
    })
}

exports.getGroupChat = (req, res, next) => {
    let chatId = req.params.id

    messageModel.getMessages(chatId).then(messages => {

        if (messages.length === 0) {
            chatModel.getChat(chatId).then(chat => {

                /*let friendData = chat.users.find(
                    user => user._id != req.session.userId
                )*/

                res.render('chat', {
                    myName: chat.name + " - chat",
                    pageTitle: chat.name,
                    isUser: req.session.userId,
                    friendRequests: req.friendRequests,
                    type: 'group',
                    messages: messages,
                    friendData: chat,
                    chatId: chatId
                })
            })
        } else {
            /*let friendData = messages[0].chat.users.find(
                user => user._id != req.session.userId
            )*/
            console.log("msg: ", messages, "\,-------------------------");
            res.render('chat', {
                myName: messages[0].chat.name + " - chat",
                pageTitle: messages[0].chat.name,
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                messages: messages,
                type: 'group',
                friendData: messages[0].chat,
                chatId: chatId
            })
        }
    }).catch(err => {
        console.log("err: ", err);
        next(err)
    })
}

exports.getChatsByChatsId = (req, res, next) => {
    userModel.getUserById(req.session.userId).then(user => {
        //console.log("chatController 27\nuser: ", user);

        chatModel.getChatsByChatsId(user.chatsId).then(chats => {
            //console.log("chatController 30\nchats: ", chats);
            res.render('groups', {
                myName: req.session.name,
                pageTitle: "Groups",
                isUser: req.session.userId,
                friendRequests: req.friendRequests,
                chats: chats
            })
        }).catch(err => {
            console.log(err);
            next(err)
        })
    })
}

exports.addGroup = (req, res, next) => {
    chatModel.addGroup({
        name: req.body.name,
        users: [req.session.userId],
        isPrivet: false
    }).then(() => {
        //userModel.AddGroupChat(req.session.userId, )
        res.redirect('/group')
    }).catch(err => {
        console.log(err);
        next(err)
    })
}

function renderChat(res, req, friendData, messages, chatId) {
    res.render('chat', {
        myName: friendData.username + " - chat",
        pageTitle: friendData.username,
        isUser: req.session.userId,
        friendRequests: req.friendRequests,
        messages: messages,
        type: "privete",
        friendData: friendData,
        chatId: chatId
    })
}