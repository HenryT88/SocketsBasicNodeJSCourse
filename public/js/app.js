
var now = moment();
var socket = io();	

var name = getQueryVariable('name') || 'Unknown Person';
var room = getQueryVariable('room');

console.log(name + ' wants to join ' + room);			

socket.on('connect', function(){
	console.log('connected to Socket.IO server!!');
	
	socket.emit('joinRoom', {
		name: name,
		room: room
	});
	
});

socket.on('message', function(message){
	
	var momentTimeStamp = moment.utc(message.timestamp);
	var $message = jQuery('.messages');
	jQuery('#roomName').text(room);
	
	console.log('New Message:');
	console.log(message.text);
	
	
	
	//Displaying Sent Messages
	$message.append('<p><strong>' + message.name + ' ' + momentTimeStamp.local().format('h:mm:ss a') +'</strong></p>');
	$message.append('<p> &nbsp;&nbsp;&nbsp;' + message.text + '</p>');
});

// Process FORM Message-Form -- Handles submitting of new message
var $form = jQuery('#message-form');


//User Pressed the Button...
$form.on('submit', function(event){
	event.preventDefault();
	
	socket.emit('message', {
		name: name,
		text:  $form.find('input[name=message]').val()
	});
	
	$form.find('input[name=message]').val('');
	
});
