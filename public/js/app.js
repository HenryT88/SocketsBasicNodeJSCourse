
var now = moment();
var socket = io();				

socket.on('connect', function(){
	console.log('connected to Socket.IO server!!');
});

socket.on('message', function(message){
	
	var momentTimeStamp = moment.utc(message.timestamp);
	console.log('New Message:');
	console.log(message.text);
	
	//Displaying Sent Messages
	jQuery('.messages').append('<p><strong>'+ momentTimeStamp.local().format('h:mm:ss a') +'</strong> &nbsp;&nbsp;&nbsp;'+ message.text + '</p>');
});

// Process FORM Message-Form -- Handles submitting of new message
var $form = jQuery('#message-form');


//User Pressed the Button...
$form.on('submit', function(event){
	event.preventDefault();
	
	socket.emit('message', {
		text:  $form.find('input[name=message]').val()
	});
	
	$form.find('input[name=message]').val('');
	
});
