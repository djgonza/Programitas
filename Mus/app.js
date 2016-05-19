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

	// eventos
	socket.on('acceder', function(nombre){

		// si esta libre
		if(!jugadores.has(nombre)){

			// guardamos el nombre en el socket
			socket.nombre = nombre;

			// guardamos el jugador
			jugadores.set(nombre, new Jugador(io, socket, nombre));

			// avisamos de nombre correcto
			io.to(socket.id).emit('acceder', true);

			console.log('Usuario Conectado -> ' + jugadores.size);

		// si esta ocupado
		}else{

			//avisamos de nombre incorrecto
			io.to(socket.id).emit('acceder', false);

		}

	});

	socket.on('disconnect', function(){

		if(!jugadores.has(socket.nombre))
			return;

		/* borramos el jugador de la mesa*/
		var mesa = jugadores.get (socket.nombre).mesa;
		
		if(mesa != null){

			mesa.deleteJugador (socket.nombre);

		}

		/* borramos el jugador de la lista */
		jugadores.delete(socket.nombre);

		console.log('Usuario Desconectado -> ' + jugadores.size);

	});

	socket.on('getMesas', function () {

		mesas.forEach( 

			function(mesa, i) {

				io.to(socket.id).emit('setMesa', {

					id : i,
					tipo : mesa.tipo,
					jugadores : mesa.getJugadores ()

				});

			}

		);

	});

	socket.on('setAsiento', function (mesa) {

		/* 
			mesa: {
				id,
				posicion
			}
		*/

		/* si añadimos el jugador */
		if(mesas.get(mesa.id).addJugador (jugadores.get(socket.nombre), mesa.posicion)){

			/* avisamos a todos que el asiento a sido ocupado */
			io.emit('setAsiento', {
				id: mesa.id,
				posicion: mesa.posicion,
				jugador: jugadores.get(socket.nombre).nombre
			});

		}

	});

});

http.listen(3000, function(){

	for (var i = 0; i < 10; i++) {

		mesas.set(i, new Mesa(io, 0));

	}

	console.log('listening on *:3000');

});





