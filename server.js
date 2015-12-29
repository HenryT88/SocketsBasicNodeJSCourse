var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

console.log('Running');

io.on('connection', function(socket){
	console.log('User Connected via Socket.IO');
	
	socket.on('message', function(message){
		console.log('Message RCVD!!: ' + message.text);
		
		//socket.broadcast.emit('message', message); //BROADCAST TO ALL BUT SELF
		
		//this is the Individual Message from the Sender/users
		io.emit('message', message); //BROADCAST TO ALL INCLUDING SELF
	});
	
	
	
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the Chat App!',
		timestamp: moment().valueOf()
	});
	
});

http.listen(PORT, function(){
	console.log('Server Started');
})


