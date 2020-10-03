module.exports = io => {
    io.on('connection', socket => {
        socket.on('joinNotificationsRoom', id => {
            socket.join(id)
        })
        socket.on('getOnline', id => {
            io.onlineUsers[id] = true
            socket.on('disconnect', () => {
                io.onlineUsers[id] = false
            })
        })
    })

}