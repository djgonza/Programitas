'use strict'

class Jugador {

	constructor (io, socket, nombre) {
		
		this.io = io;
		this.socket = socket;
		this.nombre = nombre;
		this.mesa = null;
		this.cartas = { // null || id de la carta
			uno: null,
			dos: null,
			tres: null,
			cuatro: null
		}

		this.haHablado = false; // true -> ya ha hablado | false -> aun no ha hablado

	}

	setMesa (mesa) {
		this.mesa = mesa;
	}

	sendEvent (event, msg){
		io.to(socket.id).emit(event, msg);
	}

	/* devuelve el numero de cartas que necesita ese jugador */
	getCartasNecesita () {
		var cont = 0;
		if(this.cartas.uno == null)
			cont++;
		if(this.cartas.dos == null)
			cont++;
		if(this.cartas.tres == null)
			cont++;
		if(this.cartas.cuatro == null)
			cont++;
		return cont;
	}

	setCarta (idCarta) {

		var recibida = false;

		if(this.cartas.uno == null){
			this.cartas.uno = idCarta;
			recibida = true;
		}
		if(this.cartas.dos == null){
			this.cartas.dos = idCarta;
			recibida = true;
		}
		if(this.cartas.tres == null){
			this.cartas.tres = idCarta;
			recibida = true;
		}
		if(this.cartas.cuatro == null){
			this.cartas.cuatro = idCarta;
			recibida = true;
		}

		if(recibida){
			this.sendEvent ('setCarta', idCarta);
		}else{
			return false;
		}

	}


} 

module.exports = Jugador;