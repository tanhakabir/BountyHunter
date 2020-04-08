const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use(cors())

module.exports = app