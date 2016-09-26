'use strict';

var Jugador = require('./jugador');
var Baraja = require('./baraja');
var Puntuacion = require('./puntuacion');

class Mesa {

	constructor (io, room, tipo) {
		
		this.io 		= io;
		this.room 		= room;
		this.jugadores 	= new Map ();
		this.mano 		= null;
		console.log(Baraja);
		this.baraja 	= new Baraja (tipo);
		this.puntuacion = new Puntuacion ();
		this.idTimeout  = null;
		this.esperando  = null; // null -> sin iniciar
								// 0 -> todos han hablado
								// 1 - 4 -> jugador al que esperamos

		this.estado 	= 0; 	// 0 -> esperando jugadores
								// 1 -> mus
								// 2 -> descarte
								// 3 -> grande
								// 4 -> pequeña
								// 5 -> pares
								// 6 -> juego
								// 7 -> punto
								// 8 -> contarPuntos
	}

	getJugadores () {
		return 1;
	}

	/* actualiza la mano al siguiente jugador */
	setMano () {

		if(this.mano == null){
			this.mano = 0;
		}else if(this.mano == 3){
			this.mano = 0;
		}else{
			this.mano++;
		}
	}

	/* devuelve el siguiente jugador en hablar */
	setJugadorSiguiente () {
		
		if(this.esperando == null){
			this.esperando = this.mano;
		}else if(this.esperando == 0){
			this.esperando = null;
		}else if(this.esperando == this.mano){
			this.esperando = 0;
		}else if(this.esperando == 3){
			this.esperando = 1;
		}else{
			this.esperando++;
		}

	}

	setSiguienteEstado () {

		if(this.estado == 8){
			this.estado = 1;
		}else{
			this.estado++;
		}

		// reseteamos el haHablado de los jugadores
		this.jugadore.forEach (
			function (jugador) {
				jugador.haHablado = false;
			}
		);

	}

	/* añade un jugador a la mesa
	 * si esta no esta completa 
	 * param: obj jugador, posicion en la mesa
	 */
	addJugador (jugador, posicion) {

		if(posicion < 0 > 4)
			return false;

		if(!this.jugadores.has(posicion)){

			this.jugadores.set(posicion, jugador);
			//jugador.addMesa(this);

			/* si se llena la sala iniciamos el juego */
			if(this.jugadores.size == 4){
				this.iniciarJuego();
			}

			return true;

		}

		return false;

	}

	/* saca a un jugador de la mesa */
	leaveJugador (nombre) {

		// actualizamos al jugador
		this.jugadores.setMesa(null);
		this.sendEventAll('leaveJugador', {
			mesa: this.room,
			nombre: nombre
		});

	}

	/* envia el evento a todos los jugadores */
	sendEventAll (event, msg) {
		this.io.emit(event, msg);
	}

	/* envia el evento a los jugadores de la mesa */
	sendEventRoom (event, msg) {
		this.io.to(this.room).emit(event, msg);
	}

	/* reparte las cartas que necesita a los jugadores */
	repartirCartas () {
		
		//contabilizamos cuantas cartas hay que repartir
		var cartasARepartir = 0;
		this.jugadores.forEach( 
			function(jugador, i) {
				cartasARepartir += jugador.getCartasNecesita();
			}
		);

		// repartimos las cartas
		var i = 0;
		while(i < cartasARepartir){

			this.jugadores.forEach( 
				
				function(jugador) {
					
					var carta = this.cartas.getSiguienteCarta ();
					jugador.setCarta (carta.getId());

				}

			);

		}

	}

	/* loop principal del juego */
	jugada () {

		switch(this.estado) {

			// mus
			case 1:
				
			break;
			// descarte
			case 2:
				
			break;
			// grande
			case 3:
				
			break;
			// pequeña
			case 4:
				
			break;
			// pares
			case 5:
				
			break;
			// juego
			case 6:
				
			break;
			// punto
			case 7:
				
			break;
			// contar Puntos
			case 8:

			break;

		}

		// timer a 1 minuto
		this.idTimeout = setTimeout(this.jugada(), 60000);

	}

	/* pide mus a los jugadores */
	getMus () {

		// si todos han costestado
		if(this.esperando == 0){
			// pedimos a todos que se descarten
			this.sendEventRoom('descarte', null);
		}else{
			// definimos el siguiete jugador
			this.setJugadorSiguiente ();
			// preguntamos si este quiere mus
			this.jugadores.get(this.esperando).sendEvent('¿quieres Mus?', null);
		}

	}

	/* recibe la validacion del jugador para el mus */
	setMus (validacion) {
		
		// si quiere mus
		if(validacion){
			// pedimos mus al siguiente jugador
			this.pedirMus ();
		// si no quiere mus
		}else{
			// cortamos el mus actualizando el estado de la mesa
			this.setSiguienteEstado ();
		}

	}

	/* pide que quiere hacer en la grande el jugador */
	setGrande (jugador) {



	}

	/* recibe la respuesta del jugador 
	 * respuesta = {
		msg: no quiero | quiero | apuesto,
		puntos: valor
	 }
	 * 
	*/
	getGrande (jugador, respuesta) {

		// si apuesta habla el siguiente jugador
		if(respuesta.msg == 'apuesto'){
			// se suma la apuesta al bote de grande
			this.puntuacion.sumarGrande(respuesta);
			// avisamos a todos que han apostado a grande
			this.sendEventRoom ('apuesta grande', {
				jugador: this.jugadores.get(jugador).nombre,
				puntos: respuesta.puntos
			});
			// habla el siguiente jugador
			this.setJugadorSiguiente ();
		// si se acepta la apuesta
		}else {
			// si quiere la apuesta
			if(respuesta.msg == 'quiero'){
				// actualizamos el estado al siguiente
				this.setSiguienteEstado ();
			}
			// si no quiere
			if(respuesta.msg == 'no quiero'){
				// actualizamos el estado de hablado del jugador
				this.jugadores.get(jugador).hablado = true;
				// comprovamos que el compañero a hablado
				if(this.getCompañero(jugador).hablado){
					// actualizamos el estado al siguiente
					this.setSiguienteEstado ();
				}else{
					// preguntamos al compañero que quiere hacer
					
				}
			}

		}

	}

}

module.exports = Mesa;