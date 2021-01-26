const chatId = document.getElementById('chatId').value
const msg = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')
const msgContainer = document.getElementById('messages-container')
    //const callBtn = document.getElementById('callBtn')

socket.emit('joinChat', chatId)

sendBtn.onclick = () => {
    let content = msg.value
    console.log("test");
    socket.emit('sendMessage', {
        chat: chatId,
        content: content,
        sender: myId
    }, () => {
        msg.value = ""
    })
}

socket.on('newMessage', msg => {
    let html = "";
    let msg_type;
    if (msg.sender == myId) msg_type = "my-msg"
    else msg_type = "friend-msg"

    html += '<div class="msg ' + msg_type + '">\n'
    html += '    <div class="msg-text">\n'
    html += '        <span>' + msg.content + '</span>\n'
    html += '    </div>\n'
    html += '<div>\n'

    msgContainer.innerHTML += html
})

let peer = new Peer()
let peerId = null
peer.on('open', id => {
    console.log('my id', id)
    peerId = id
})

/* callBtn.onclick = () => {
    socket.emit('requestPeerId', chatId)
} */

socket.on('getPeerId', () => {
    socket.emit('sendPeerId', {
        chatId: chatId,
        peerId: peerId
    })
})

socket.on('recievePeerId', id => {
    console.log(id);
})