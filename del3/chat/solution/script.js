// oppretter en websocket-tilkobling til riktig url
var websocket = new WebSocket('ws://bekk-chat.herokuapp.com');

// henter ut form-elementet og legger til en listener på submit
document.querySelector('#nameform').addEventListener('submit', function (event) {
    // hindrer refresh av siden
    event.preventDefault();
    // henter ut inputfeltet for navn og leser ut verdien
    var name = document.querySelector('#name').value;
    console.log(name);
    if (name !== '') { // om navn ikke tomt
        // lag et objekt på riktig form og med valgt navn
        var data = {
            type: 'name',
            name: name
        };
        // gjør det om til en tekststreng
        var dataString = JSON.stringify(data);
        // send tekststrengen via websocket
        websocket.send(dataString);

        // hent ut send-knappen og sett disabled til false
        document.querySelector('#sendbutton').disabled = false;
    }
});

// Legger til en funksjon på onmessage
websocket.onmessage = function(event) {
    // Leser ut data fra eventet og konverterer det til et objekt
    var data = JSON.parse(event.data);
    // Logger det vi mottar til console
    console.log(data);

    // sjekker typen
    if (data.type === 'messages') {
        // henter meldingene fra data
        var messages = data.messages;
        // iterer over hver melding med en for-løkke og rendrer den
        for (var i = 0; i < messages.length; i++) {
            var singleMessage = messages[i];
            renderMessage(singleMessage);
        }
    } else if (data.type === 'message') {
        // om det var en enkelt melding rendrer vi den bare
        renderMessage(data);
    } else if (data.type === 'users') {
        // kaller funksjonen med de aktive brukerne
        renderActiveUsers(data.users);
        // Kall vår nye funksjon
        showConnectionMessage(data);
    }
};

function renderMessage(message) {
    // lager et dato-objekt utifra dato-teksten
    var time = new Date(message.time);
    // leser ut de forskjellige verdiene vi ønsker
    var hour = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    // siden getHours f. eks. kan returnere 7, slenger
    // vi på en 0 foran slik at det står 07
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    if (seconds < 10) {
        seconds = '0' + seconds;
    }

    // henter ut elementet
    var messageElement = document.querySelector('#messages');
    // lager HTMLen for en melding
    var messageHtml = `
        <div class="message">
            <span class="name">${message.name}</span>
            <span class="time">${hour}:${minutes}:${seconds}</span>
            <span class="text">${message.message}</span>
        </div>
    `;
    // Setter innholdet i elementet til å være meldingen pluss hva enn det var før
    messageElement.innerHTML = messageHtml + messageElement.innerHTML;
}

// legger på submit-listener på formet
document.querySelector('#sendform').addEventListener('submit', function (event) {
    // hindrer refresh
    event.preventDefault();
    // henter ut input-elementet der brukeren skriver meldingen
    var sendmessageInput = document.querySelector("#sendmessage");
    // henter ut verdien
    var message = sendmessageInput.value;
    // nullstiller feltet
    sendmessageInput.value = ''; // reset
    // lager objektet, gjør det om til JSON og sender det, alt i samme slengen
    websocket.send(JSON.stringify({
        type: 'message',
        message: message
    }));
});

function renderActiveUsers(activeUsers) {
    // henter elementet vi vil putte navnene i
    var usersElement = document.querySelector('#users');
    var html = '';
    // itererer over alle navnene og lager en stor html-string
    for (var i = 0; i < activeUsers.length; i++) {
        var name = activeUsers[i];
        html += `
            <span class="name">${name}</span>
        `;
    }
    // setter innholdet til elementet til å være html vi har laget
    usersElement.innerHTML = html;
}

function showConnectionMessage(data) {
    var message;
    // Sjekker hvilken action det var, og lager forskjellige beskjeder
    if (data.action === 'joined') {
        message = `${data.name} has joined`;
    } else if (data.action === 'left') {
        message = `${data.name} has left`;
    } else if (data.action === 'renamed') {
        message = `${data.oldname} has changed name to ${data.name}`;
    }
    // Legger beskjeden inni litt HTML for stylingens skyld
    var html = `<div class="connection">${message}</div>`;
    // Henter ut elementet og legger det nye innholdet inn i tillegg til hva enn som var der fra før
    var messageElement = document.querySelector('#messages');
    messageElement.innerHTML = html + messageElement.innerHTML;
}