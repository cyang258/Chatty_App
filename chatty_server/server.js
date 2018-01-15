// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');


// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });
let numberOfClients = 0;
const colorList = ['#7FFF00','#FF7F50','#0000FF','#8B0000']

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  numberOfClients ++;
  wss.broadcast = function broadcast(data) {

    wss.clients.forEach(function each(client) {
      console.log(client.readyState)
      console.log(ws.OPEN)
      if (client.readyState === ws.OPEN) {
        console.log('messagePackage:',data)
        client.send(data);
      }
    });
  };
  const count = {
    type: 'clientNumber',
    clientsOnline: numberOfClients
  }

  const color = {
    type: 'color',
    colorPicked: colorList[Math.floor(Math.random()*5)]
  }

  wss.broadcast(JSON.stringify(color));
  wss.broadcast(JSON.stringify(count));

  console.log('connected')
  ws.on('message', function incoming(message) {
    let incomingMessage = JSON.parse(message);
    console.log('recieved message:', incomingMessage);
    if(incomingMessage.type === 'incomingMessage'){
      incomingMessage.id = uuidv4();
      let messagePackage = JSON.stringify(incomingMessage);
      console.log('give message id:', messagePackage);
      wss.broadcast(messagePackage);

    } else if (incomingMessage.type === 'systemNotification'){
      incomingMessage.id = uuidv4();
      wss.broadcast(JSON.stringify(incomingMessage));
    }
  });



  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    numberOfClients --;
    console.log('Client disconnected');
    const count = {
      type: 'clientNumber',
      clientsOnline: numberOfClients}
    wss.broadcast(JSON.stringify(count));
  })
});