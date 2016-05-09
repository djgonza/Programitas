'use strict'

class Jugador {

	constructor (io, socket, nombre) {
		
		this.io = io;
		this.socket = socket;
		this.nombre = nombre;
		this.mesa = null;

	}


} 

module.exports = Jugador;