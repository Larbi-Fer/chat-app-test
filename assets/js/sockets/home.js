socket.emit('getOnlineFriends', myId)

socket.on('onlineFriends', friends => {
    let div = document.getElementById('onlineFriends')
    if (friends.length === 0) {
        div.innerHTML = "<p class'aleart aleart-err'>no Online Friends</p>"
    } else {
        let html = "<div class='container'>\n"
        for (let friend of friends) {
            html += "  <div class='cart-user'>\n"
            html += '  <a href="/profile/' + friend.id + '">'
            html += '    <img class="user-active" src="/' + friend.image + '">\n'
            html += '  </a>'
            html += '  <div class="cart-cart">\n    <a href="/profile/' + friend.id + '">\n      <h3>' + friend.name + '</h3>\n    </a>\n'
            html += '    <a class="btn btn-pr" href="/chat/' + friend.chatId + '">Chat</a>\n'
            html += '  </div>\n  </div>\n'
        }
        html += '</div>'
        div.innerHTML = html
    }
})