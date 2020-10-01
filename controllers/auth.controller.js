const authModel = require('../models/auth.model')
var error = ""
var errors = ""
const checkInp = require('../models/checkValue')
exports.getSingup = (req, res, next) => {
    //console.log(req.flash('validationError'))
    res.render('singup', {
        authError: req.flash("authError"),
        validationErrors: req.flash("validationError"),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Singup'
    });
    error = ""
    errors = ""
};


exports.postSingup = (req, res, next) => {
    var resl = checkInp.checkVal({
        notEmpty: {
            value: req.body.username,
            msg: "username is empty !"
        },
        min: {
            min: 3,
            value: req.body.username,
            msg: "usirname min is 3"
        },
        notEmpty: {
            value: req.body.email,
            msg: "email is empty !"
        },
        v: [
            req.body.password,
            {
                min: {
                    min: 6,
                    msg: "password min is 6 !"
                },
                max: {
                    max: 15,
                    msg: "password max is 15"
                },
                custum: {
                    value: req.body.confirmPassword,
                    msg: "confirm password is incorrect"
                }
            }
        ]
    })

    if (resl.length === 0) {
        authModel.createNewUser(req.body.username, req.body.email, req.body.password)
            .then(() => res.redirect('/login'))
            .catch(err => {
                req.flash("authError", err)
                res.redirect('/singup')
            })
    } else {
        req.flash('validationError', checkInp.ArrayToString(resl, "\n"))
            //errors = checkInp.ArrayToString(resl, "\n")
            //errors = resl
        res.redirect('/singup')
    }
}



exports.getLogin = (req, res, next) => {
    res.render('login', {
        authError: req.flash("authError"),
        isUser: false,
        isAdmin: false,
        pageTitle: 'Login'
    })
    error = ""
}



exports.postLogin = (req, res, next) => {
    authModel.login(req.body.email, req.body.password)
        .then(result => {
            req.session.userId = result.id
            req.session.isAdmin = result.isAdmin
            res.redirect('/')
        })
        .catch(err => {
            req.flash('authError', err)
            res.redirect('/login')
        })
}


exports.logout = (res, req, next) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}