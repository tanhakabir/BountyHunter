const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const Server = http.Server(app);
const io = require('socket.io')(Server);

const SERVE_PORT = process.env.PORT || 443

// SERVING WEB CONTENT
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// app.use(cors())

app.listen(SERVE_PORT);


// CONNECTING TO CLIENT
const SOCKET_PORT = 9001
Server.listen(SOCKET_PORT, () => console.log('Game server running on:', SOCKET_PORT))

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});
