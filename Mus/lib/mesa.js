'use strict';

var Carta = require('./carta');
var Jugador = require('./jugador');

class Mesa {

	constructor () {
		
		this.jugadores 	= new Set();
		this.estado 	= 0; // 0,1,2,3 -> hay huecos, 4 -> llena
		this.baraja 	= this.crearBaraja(0); // 0 -> 4 reyes, 1 -> 8 reyes
		this.puntaucion = {
			grande 	: 0,
			pequeña : 0,
			pares 	: 0,
			juego 	: 0,
			equipoA : 0,
			equipoB : 0
		}

		//console.log(this.baraja);

		this.barajar();

		//console.log(this.cartasEnBaraja());
	

	}

	/* carga las cartas para esta mesa */
	crearBaraja (tipo){

		var baraja = new Map();

		for(var i = 0; i < 40; i++){
			
			var valor = i % 10 + 1;
			
			baraja.set(new Carta(i, valor));

		}

		//baraja con 8 reyes
		if(tipo == 1){

			baraja.set(1, new Carta(1, 1));
			baraja.set(2, new Carta(2, 10));

			baraja.set(11, new Carta(11, 1));
			baraja.set(12, new Carta(12, 10));

			baraja.set(21, new Carta(21, 1));
			baraja.set(22, new Carta(22, 10));

			baraja.set(31, new Carta(31, 1));
			baraja.set(32, new Carta(32, 10));

		}

		return baraja;

	}

	/* resetea la baraja */
	resetearBaraja () {
		crearBaraja ();
	}


	/* reordena las cartas */
	barajar () {

		var currentIndex = this.baraja.size, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = this.baraja.get(currentIndex);
			this.baraja.set(currentIndex, this.baraja.get(randomIndex));
			this.baraja.set(randomIndex, temporaryValue);

		}

	}

	/* reparte 16 cartas, 4 por jugador */
	repartirCartas () {

		// nos aseguramos que hay cartas para repartir
		this.recogerCartas();
		
		//contabilizamos cuantas cartas hay que repartir
		var cartasARepartir = 0;
		this.jugadores.forEach( function(jugador, i) {
			cartasARepartir += 4 - jugador.cartasEnMano;
		});

		// repartimos las cartas
		var i = 0;
		var jugador = 0;
		while(i < cartasARepartir){

			this.jugadores.forEach( 
				
				function(jugador) {
					
					if(jugador.cartasEnMano < 4){

						this.darCarta(jugador);

					}

				}

			);

		}

	}

	/* reparte una carta a un jugador y la saca de la baraja */
	darCarta (jugador) {

		this.baraja.forEach( 
			
			function(carta) {
				
				if(carta.estado == 0){

					jugador.recogerCarta(carta);
					carta.estado == 1;
				
				}

			}

		);

	}

	/* pasamos las cartas desechadas a la baraja */
	recogerCartas () {

		// si no hay cartas para todos
		if(this.cartasEnBaraja < 16){
			
			// pasamos las cartas desechadas a la baraja
			this.baraja.forEach( 
				
				function(carta, i) {
					
					if(carta.estado == 2)
						carta.setEstado(0);

				}

			);

			// volvemos a barajar
			this.barajar ();

		}

	}


	/* devuelve el numero de cartas 
	 * que aun se pueden repartir 
	 */
	cartasEnBaraja () {

		var contador = 0;

		this.baraja.forEach ( 
			
			function(carta, i) {

				if(carta.estado == 0)
					contador++;

			}

		);

		return contador;

	}

	/* */
	actualizarPuntuacion (puntos, equipo) {

	}

	/* */
	actualizarEstado () {

	}

	/* añade un jugador a la mesa 
	 * si esta no esta completa 
	 */
	addJugador (jugador, posicion) {
		
		if(this.estado < 4){

			if(posicion != null){

				this.jugadores.set(posicion, jugador);

			}else{

				for(var i = 0; i < 4; i++){

					if(this.jugadores.get(i) == undefined){

						this.jugadores.set(i, jugador);
						return;

					}

				}
			}

		}

	}

	/* */
	deleteJugador (posicion) {
		this.jugadores.delete (posicion);
	}




}

module.exports = Mesa;