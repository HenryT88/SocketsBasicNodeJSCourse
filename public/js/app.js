var socket = io();				

socket.on('connect', function(){
	console.log('connected to Socket.IO server!!');
});

socket.on('message', function(message){
	console.log('New Message:');
	console.log(message.text);
	
	jQuery('.messages').append('<p>'+ message.text + '</p>');
});

// Process FORM Message-Form -- Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
	event.preventDefault();
	socket.emit('message', {
		text: $form.find('input[name=message]').val()
	});
	
	$form.find('input[name=message]').val('');
	
});
