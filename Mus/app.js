'use strict';

var express = require('express');
var app 	= express();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

/* init */
var Mesa 	= require('./lib/mesa');
var Jugador = require('./lib/jugador');
var mesas = new Map();
var jugadores = new Map();

// contenido estatico
app.use(express.static('client'));

app.get('/', function(req, res){
  res.sendfile('./client/index.html');
});


/* sockets */
io.on('connection', function(socket){
  
	console.log('Usuario Conectado');

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
			jugadores.set(socket.id, new Jugador(socket.id, nombre));
			//console.log(jugadores);

			// avisamos de nombre correcto
			io.to(socket.id).emit('validarNombre', true);

		// si esta ocupado
		}else{

			//avisamos de nombre incorrecto
			io.to(socket.id).emit('validarNombre', false);

		}

	});

	socket.on('getMesas', function () {

		mesas.forEach( 

			function(mesa, i) {

				io.to(socket.id).emit('setMesa', {

					id : i,
					tipo : mesa.tipo,
					jugadores : mesa.jugadores

				});

			}

		);

	});

	socket.on('setAsiento', function (mesa) {

		/* si añadimos el jugador notificamos a todos */
		if(mesas.get(mesa.id).addJugador (jugadores.get(socket.id).nombre, mesa.posicion)){

			io.emit('setAsiento', {
				id: mesa.id,
				posicion: mesa.posicion,
				jugador: jugadores.get(socket.id).nombre
			});

		}

	});

	socket.on('disconnect', function(){

		if(!jugadores.get(socket.id))
			return;

		var nombre = jugadores.get(socket.id).nombre;

		/* buscamos el jugador para eliminarlo de la mesa en la que estaba */
		mesas.forEach( 

			function(mesa, i) {
			
				mesa.jugadores.forEach( 
					
					function(jugador, j) {

						if(jugador == nombre){
							mesa.removeJugador(j);
							io.emit('unsetAsiento', {
								id: i,
								posicion: j
							});

						}

					}

				);

			}

		);

		/* borramos el jugador de la lista */
		jugadores.delete(socket.id);


		console.log('Usuario Desconectado');

	});


});

http.listen(3000, function(){

	for (var i = 0; i < 10; i++) {

		mesas.set(i, new Mesa(0));

	}

	console.log('listening on *:3000');

});





