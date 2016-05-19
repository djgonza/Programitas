'use strict';

var express 		= require('express');
var app 			= express();
var http 			= require('http').Server(app);
var io 				= require('socket.io')(http);
var GestorJugadores = require('./lib/gestorJugadores/GestorJugadores');
var GestorMesas		= require('./lib/gestorMesas/GestorMesas');

var gj = new GestorJugadores(io);
var gm = new GestorMesas(io);

/* cliente */
app.use(express.static('client'));
app.get('/', function(req, res){
	res.sendfile('./client/index.html');
});

http.listen(3000, function(){
	console.log("Server corriendo el el puerto 3000");
});