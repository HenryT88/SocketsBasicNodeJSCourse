var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

console.log('Running');

io.on('connection', function(){
	console.log('User Connected via Socket.IO');
});

http.listen(PORT, function(){
	console.log('Server Started');
})



/*

var bodyParser = require('body-parser');
var _ = require('underscore');
var db = require('./db.js');
var middleware = require ('./middleware.js')(db);
var bcrypt = require('bcrypt');


var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());
*/
