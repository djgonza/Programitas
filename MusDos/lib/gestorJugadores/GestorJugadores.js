"use strict";

var Jugador = require("./Jugador");

class GestorJugadores {

	constructor (io) {

		this.io = io;
		this.jugadores = new Map();

		/* inicializamos los eventos */
		this.eventos ();

	}

	addJugador (nombre, socket) {
		
		if(!hasJugador(nombre)){
			this.jugadores.set(nombre, new Jugador(nombre, socket));
			return true;
		}
		return false;

	}

	getJugador (nombre) {
		return this.jugadores.get(nombre);
	}

	hasJugador (nombre) {
		return this.jugadores.has(nombre);
	}

	deleteJugador (nombre) {
		this.jugadores.delete(nombre);
	}

	eventos () {

		var clase = this;

		this.io.on("connection", function(socket){

			console.log("Nuevo Jugador");

			/* gestiona los nuevo jugadores */
			socket.on("nuevoJugador", function (nombre) {
				
				if(clase.addJugador(nombre, socket)){
					io.to(socket.id).emit("nuevoJugador", true);
					socket.nombre = nombre;
					console.log("Jugador Logueado");
				}else{
					io.to(socket.id).emit("nuevoJugador", false);
				}

			});

			/* gestiona las desconexiones */
			socket.on("disconnect", function () {
				
				if(socket.nombre){
					deleteJugador (socket.nombre);
				}

				console.log("Jugador Desconectado");

			});


		});

	}


}

module.exports = GestorJugadores;