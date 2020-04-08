const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const Server = http.Server(app);
const io = require('socket.io')(Server);

const PORT = process.env.PORT || 3231

// SERVING WEB CONTENT
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// app.use(cors())

Server.listen(PORT, () => console.log('Signalling server running on:', PORT))

// CONNECTING TO CLIENT

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});
