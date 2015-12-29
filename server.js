var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

console.log('Running');

io.on('connection', function(socket){
	console.log('User Connected via Socket.IO');
	
	socket.on('message', function(message){
		console.log('Message RCVD!!: ' + message.text);
		
		//socket.broadcast.emit('message', message); //BROADCAST TO ALL BUT SELF
		io.emit('message', message); //BROADCAST TO ALL INCLUDING SELF
	});
	
	socket.emit('message', {
		text: 'Welcome to the Chat App!'
	});
	
});

http.listen(PORT, function(){
	console.log('Server Started');
})


