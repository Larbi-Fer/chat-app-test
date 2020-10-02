module.exports = socket => {
    socket.on('joinNotificationsRoom', id => {
        socket.join(id)
    })
}