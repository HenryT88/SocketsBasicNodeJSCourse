var express = require('express');
var PORT = process.env.PORT || 3000;
var app = express();
var http = require('http').Server(app);

app.use(express.static(__dirname + '/public'));

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
