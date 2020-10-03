const userModel = require('../models/user.model')

exports.getHomt = (req, res, next) => {
    res.render('index', {
        pageTitle: 'Home',
        isUser: req.session.userId,
        friendRequests: req.friendRequests,
        myName: req.session.name,
    })
}