const socket = io()

socket.on('connect', () => {
    let id = document.getElementById('userId').value
    socket.emit('joinNotificationsRoom', id)
})

const btn = document.getElementById('friendReqestsDropdown')

socket.on('newFriendRequest', data => {
    const friendRequests = document.getElementById('friendRequests')
    const span = document.querySelector('.no-friend')
    if (span) span.remove()
    friendRequests.innerHTML += '<tr>'
    friendRequests.innerHTML += '<td><a href="/profile/' + data.id + '">' + data.name + '</a></td>'
    friendRequests.innerHTML += '</tr>'

    btn.classList.remove('btn-pr')
    btn.classList.add('btn-dg')
})

/*btn.onclick = () => {
    btn.classList.add('btn-pr')
    btn.classList.remove('btn-dg')
}*/