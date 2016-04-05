var websocket = new WebSocket('ws://bekk-chat.herokuapp.com');

document.querySelector('#nameform').addEventListener('submit', function (event) {
    event.preventDefault();

    var name = document.querySelector('#name').value;

    if (name !== '') {
        var data = {
            type: 'name',
            name: name
        };
        var dataString = JSON.stringify(data);
        websocket.send(dataString);

        document.querySelector('#sendbutton').disabled = false;
    }
});

websocket.onmessage = function(event) {
    var data = JSON.parse(event.data);
    console.log(data);

    if (data.type === 'messages') {
        var messages = data.messages;
        for (var i = 0; i < messages.length; i++) {
            var singleMessage = messages[i];
            renderMessage(singleMessage);
        }
    } else if (data.type === 'message') {
        renderMessage(data);
    } else if (data.type === 'users') {
        renderActiveUsers(data.users);
        showConnectionMessage(data);
    }
};

function renderMessage(message) {

    var time = new Date(message.time);
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    var messageElement = document.querySelector('#messages');

    var messageHtml = `
        <div class="message">
            <span class="name">${message.name}</span>
            <span class="time">${hour}:${minutes}:${seconds}</span>
            <span class="text">${message.message}</span>
        </div>
    `;

    messageElement.innerHTML = messageHtml + messageElement.innerHTML;
}

document.querySelector('#sendform').addEventListener('submit', function (event) {
    event.preventDefault();

    var sendmessageInput = document.querySelector("#sendmessage");
    var message = sendmessageInput.value;
    sendmessageInput.value = ''; // reset

    websocket.send(JSON.stringify({
        type: 'message',
        message: message
    }));
});

function renderActiveUsers(activeUsers) {
    var usersElement = document.querySelector('#users');

    var html = '';

    for (var i = 0; i < activeUsers.length; i++) {
        var name = activeUsers[i];
        html += `
            <span class="name">${name}</span>
        `;
    }

    usersElement.innerHTML = html;
}

function showConnectionMessage(data) {
    var message;

    if (data.action === 'joined') {
        message = `${data.name} has joined`;
    } else if (data.action === 'left') {
        message = `${data.name} has left`;
    } else if (data.action === 'renamed') {
        message = `${data.oldname} has changed name to ${data.name}`;
    }

    var html = `<div class="connection">${message}</div>`;

    var messageElement = document.querySelector('#messages');
    messageElement.innerHTML = html + messageElement.innerHTML;
}