const userModel = require('../models/user.model')

exports.add = (req, res, next) => {
    userModel.sendFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.friendId)
    }).catch(err => {
        console.log(err);
        next(err)
    })
}

exports.cancel = (req, res, next) => {
    userModel.canselFriendRequest(req.body).then(() => {
        res.redirect('/profile/' + req.body.friendId)
    }).catch(err => {
        console.log(err);
        next(err)
    })
}

exports.accept = (req, res, next) => {}

exports.reject = (req, res, next) => {}

exports.delete = (req, res, next) => {}