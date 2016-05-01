'use strict';

var express = require('express');
var app 	= express();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

/* Clases */
var Sala 	= require('./lib/sala');
var Jugador = require('./lib/jugador');

// contenido estatico
app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendfile('./client/index.html');
});

var sala = new Sala(2);
var jugadores = new Set();

io.on('connection', function(socket){
  
	console.log('Usuario Conectado');

	// enviamos las mesas
	sala.mesas.forEach( 

		function(mesa, i) {
		
			var msg = {

				jugadores: JSON.stringify(mesa.jugadores)

			}

			io.to(socket.id).emit('mesa', msg);

		}

	);

	// eventos
	socket.on('validarNombre', function(nombre){

		// validamos que no este ocupado ese nombre
		var valido = true;

		jugadores.forEach( 

			function(jugador, i) {

				if(jugador.nombre === nombre){

					valido = false;
					return;

				}

			}

		);

		// si esta libre
		if(valido){

			// guardamos el jugador
			jugadores.add(new Jugador(socket.id, nombre));
			console.log(jugadores);

			// avisamos de nombre correcto
			io.to(socket.id).emit('validarNombre', true);

		// si esta ocupado
		}else{

			//avisamos de nombre incorrecto
			io.to(socket.id).emit('validarNombre', false);

		}

	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});

http.listen(3000, function(){
	
	console.log('listening on *:3000');

});





