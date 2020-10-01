const mongoose = require('mongoose')

const DB_URL = "mongodb://localhost:27017/chat-app"

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    image: { type: String, default: "default-user-image.jpg" },
    isOnline: { type: Boolean, default: false },
    friends: {
        type: [{ name: String, image: String, id: String }],
        default: []
    },
    friendRequests: {
        type: [{ name: String, id: String }],
        default: []
    },
    sendRequests: {
        type: [{ name: String, id: String }],
        default: []
    }
});

const User = mongoose.model("user", userSchema);
exports.User = User

exports.getUserId = id => {
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

exports.acceptFriendRequest = (data) => {}

exports.rejectFriendRequest = () => {}

exports.deleteFriend = () => {}