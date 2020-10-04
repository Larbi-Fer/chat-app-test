const chatId = document.getElementById('chatId').value
const msg = document.getElementById('message')
const sendBtn = document.getElementById('sendBtn')
const msgContainer = document.getElementById('messages-container')

socket.emit('joinChat', chatId)

sendBtn.onclick = () => {
    let content = msg.value
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