const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const DB_URL = "mongodb://localhost:27017/chat-app"

const User = require('./user.model').User

exports.createNewUser = (username, email, password) => {

    // check if email exists
    // yes → → error
    // no → → create new acount

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({ email: email })
        }).then(user => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            } else {
                // install bcrypt
                return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username: username,
                email: email,
                password: hashedPassword,
                isAdmin: false
            })
            return user.save()
        }).then(() => {
            resolve('user Created')
            mongoose.disconnect()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })

}


exports.login = (email, password) => {

    // check for email                    ← 1
    // no → → error                     ← 1.1
    // yes → → check for password       ← 2.1
    //   no → → error                 ← 1.2.1
    //   yes → → set session          ← 2.2.1

    return new Promise((resolve, reject) => { //  ↓ ↓  1
        mongoose.connect(DB_URL).then(() => User.findOne({ email: email })).then(user => {
            if (!user) { //                     ↓ ↓ 1.1
                mongoose.disconnect()
                reject('there is no user mathes this email')
            } else { //                         ↓ ↓ 2.1                
                bcrypt.compare(password, user.password).then(same => {
                    if (!same) { //                   ↓ ↓  1.2.1
                        mongoose.disconnect()
                        reject('password is incorrect')
                    } else { //                       ↓ ↓  2.2.1
                        // install express-session  &  connect-mongodb-session
                        mongoose.disconnect()
                        resolve({
                            id: user._id,
                            isAdmin: user.isAdmin
                        })
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.user = User