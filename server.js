var PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');


app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket){
	console.log('User Connected via Socket.IO');
	
	socket.on('disconnect', function(){
		var userData = clientInfo[socket.id];
		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message',{
				name: 'System',
				text: userData.name + ' has left!!',
				timestamp: moment().valueOf()
			});
			
			delete userData;
		}
		
	});
	
	socket.on('joinRoom', function(req){
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has Joined!',
			timestamp : moment().valueOf()
		});
	});
	
	socket.on('message', function(message){
		console.log('Message RCVD!!: ' + message.text);
		
		//socket.broadcast.emit('message', message); //BROADCAST TO ALL BUT SELF
		
		//this is the Individual Message from the Sender/users
		io.to(clientInfo[socket.id].room).emit('message', message); //BROADCAST TO ALL INCLUDING SELF
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


