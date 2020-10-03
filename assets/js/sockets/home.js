socket.emit('getOnlineFriends', myId)

socket.on('onlineFriends', friends => {
    let div = document.getElementById('onlineFriends')
    if (friends.length === 0) {
        div.innerHTML = "<p class'aleart aleart-dg'>no Online Friends</p>"
    } else {
        let html = "<div>\n"
        for (let friend of friends) {
            html += "  <tr>\n"
            html += '  <img src="/' + friend.image + '">\n'
            html += '  <div>\n    <a href="/profile/' + friend.id + '">\n      <h3>' + friend.name + '</h3>\n    </a>\n'
            html += '    <span>chat</span>\n'
            html += '  </div>\n  </tr>\n'
        }
        html += '</div>'
        console.log(html);
        div.innerHTML = html
    }
})