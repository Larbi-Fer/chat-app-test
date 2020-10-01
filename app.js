const express = require('express')
const path = require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash') // install

const authRouter = require('./routes/auth.router')


const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://localhost:27017/chat-app',
    collection: 'sessions'
})

app.use(session({
    secret: 'this is my secret secreat to hash express sessions .......',
    saveUninitialized: false,
    store: STORE
}))

app.set('view engine', 'ejs')
app.set('views', 'views')


app.use('/', authRouter)


app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "error"
    })
})


app.use((error, req, res, next) => {
    //res.redirect('/error')
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        pageTitle: "error",
        err: error
    })
})

app.use((req, res, next) => {
    res.send("page Not Found")
})

app.listen(port, (err) => {
    console.log("error : ", err)
    console.log(`Example app listening on port : `, port)
})