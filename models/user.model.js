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