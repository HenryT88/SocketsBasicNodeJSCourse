var socket = io();				

socket.on('connect', function(){
	console.log('connected to Socket.IO server!!');
});

socket.on('message', function(message){
	console.log('New Message:');
	console.log(message.text);
});
