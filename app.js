const express = require('express')
const path = require('path')

const session = require('express-session')
const SessionStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash') // install
const socketIo = require('socket.io')


const authRouter = require('./routes/auth.router')
const profileRouter = require('./routes/profile.router')
const freindRouter = require('./routes/friend.router')
const homeRouter = require('./routes/home.router')
const chatRouter = require('./routes/chat.router')

const getFriendRequest = require('./models/user.model').getFriendRequests


const app = express()
const server = require('http').createServer(app)
const port = 3000
const io = socketIo(server)

io.onlineUsers = {}

require('./sockets/friend.socket')(io)
require('./sockets/init.socket')(io)
require('./sockets/chat.socket')(io)


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

app.use((req, res, next) => {
    if (req.session.userId) {
        getFriendRequest(req.session.userId).then(requests => {
            req.friendRequests = requests
            next()
        }).catch(err => next(err))
    } else {
        next()
    }
})

app.use('/', homeRouter)
app.use('/', authRouter)
app.use('/profile', profileRouter)
app.use('/friend', freindRouter)
app.use('/chat', chatRouter)


app.get('/error', (req, res, next) => {
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        friendRequests: req.friendRequests,
        myName: req.session.name,
        pageTitle: "error"
    })
})


app.use((error, req, res, next) => {
    //res.redirect('/error')
    res.status(500)
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        friendRequests: req.friendRequests,
        myName: req.session.name,
        pageTitle: "error",
        err: error
    })
})

app.use((req, res, next) => {
    res.status(404)
    res.render('error.ejs', {
        isUser: req.session.userId,
        isAdmin: req.session.isAdmin,
        friendRequests: req.friendRequests,
        pageTitle: "Not Found",
        myName: req.session.name,
        err: "Page Not Found"
    })
})

server.listen(port, (err) => {
    console.log("error : ", err)
    console.log(`Example app listening on port : `, port)
})