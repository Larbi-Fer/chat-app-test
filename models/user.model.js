const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/chat-app"

const Chat = require('./chat.model').Chat

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: "default-user-image.jpg" },
    isOnline: { type: Boolean, default: false },
    friends: {
        type: [{ name: String, image: String, id: String, chatId: String }],
        default: []
    },
    friendRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    sendRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    chatsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }]
});

const User = mongoose.model("user", userSchema);
exports.User = User

exports.getUserById = id => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findById(id)
        }).then(data => {
            mongoose.disconnect()
            resolve(data)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

// إرسال طلب صداقة
exports.sendFriendRequest = async(data) => {
    // add my data to friend freindReqursts
    // add friend data to my sendRequests
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({ _id: data.friendId }, {
            $push: { friendRequests: { name: data.myName, id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $push: { sendRequests: { name: data.friendName, id: data.friendId } }
        })
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.canselFriendRequest = async(data) => {
    // removed me from friend friendRequests
    // removed friend from my sendRequests
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({ _id: data.friendId }, {
            $pull: { friendRequests: { id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $pull: { sendRequests: { id: data.friendId } }
        })
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.acceptFriendRequest = async(data) => {
    // add my and friend data to friends
    // add friend data to my sendRequests
    // removed me from friend friendRequests
    // removed friend from my sendRequests
    try {
        await mongoose.connect(DB_URL)
            // الإضافة
        let newChat = new Chat({
            users: [data.myId, data.friendId]
        })
        let chatDoc = await newChat.save()
        await User.updateOne({ _id: data.friendId }, {
            $push: {
                friends: {
                    name: data.myName,
                    image: data.myImage,
                    id: data.myId,
                    chatId: chatDoc._id
                }
            }
        })

        await User.updateOne({ _id: data.myId }, {
                $push: {
                    friends: {
                        name: data.friendName,
                        image: data.friendImage,
                        id: data.friendId,
                        chatId: chatDoc._id
                    }
                }
            })
            // الحذف
        await User.updateOne({ _id: data.friendId }, {
            $pull: { sendRequests: { id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $pull: { friendRequests: { id: data.friendId } }
        })
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.rejectFriendRequest = async(data) => {
    // removed me from friend friendRequests
    // removed friend from my sendRequests
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({ _id: data.friendId }, {
            $pull: { sendRequests: { id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $pull: { friendRequests: { id: data.friendId } }
        })
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.deleteFriend = async(data) => {
    // removed me from friend friendRequests
    // removed friend from my sendRequests
    try {
        await mongoose.connect(DB_URL)
        await User.updateOne({ _id: data.friendId }, {
            $pull: { friends: { id: data.myId } }
        })
        await User.updateOne({ _id: data.myId }, {
            $pull: { friends: { id: data.friendId } }
        })
        mongoose.disconnect()
        return
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getFriendRequests = async id => {
    try {
        await mongoose.connect(DB_URL)
        const data = await User.findById(id, { friendRequests: true })
        mongoose.disconnect()
        return data.friendRequests
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.getFriends = async id => {
    try {
        await mongoose.connect(DB_URL)
        const data = await User.findById(id, { friends: true })
        mongoose.disconnect()
        return data.friends
    } catch (error) {
        mongoose.disconnect()
        throw new Error(error)
    }
}

exports.AddGroupChat = async(userId, chatId) => {
    console.log("chatId: ", chatId);

    try {
        await mongoose.connect(DB_URL)
        let data
        await User.updateOne({ _id: userId }, {
            $push: {
                chatsId: chatId
            }
        }).then(res => {
            data = res
            console.log("\nres: ", res, "\n");
        }).catch(err => {
            mongoose.disconnect()
            console.log("error: ", err);
        })
        mongoose.disconnect()
        return data.chats
    } catch (error) {
        mongoose.disconnect()
        throw new Error("error : " + error)
    }
}