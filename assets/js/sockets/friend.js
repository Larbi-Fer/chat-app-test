const addBtn = document.getElementById('addBtn');

const myId1 = document.getElementById('myId').value
const myName = document.getElementById('myName').value
const myImage = document.getElementById('myImage').value
const friendId = document.getElementById('friendId').value
const friendName = document.getElementById('friendName').value
const friendImage = document.getElementById('friendImage').value

addBtn.onclick = (e) => {
    e.preventDefault()
    socket.emit('sendFriendRequest', {
        myId: myId1,
        myImage,
        myName,
        friendId,
        friendName,
        friendImage
    })
}

socket.on('requestSend', () => {
    addBtn.remove()
    document.getElementById('friends-form').innerHTML += '<button type="submit" class="btn btn-pr btn-dg" formaction="/friend/cancel">Cancel Request</button>'
})