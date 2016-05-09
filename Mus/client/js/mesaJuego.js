'use strict';

class MesaJuego {

	constructor (canvas, mesaId, posicionJugador) {

		this.canvas = canvas;
		this.jugadores = new Array(4);
		this.cartas = new Array(4);
		this.mesaId = mesaId;
		this.posicionJugador = posicionJugador;
		this.puntuacion = {
			a: 0,
			b: 0
		}
		this.mano = 0;
		this.jugada = 0; 	// 0 -> espera
						 	// 1 -> grande
						 	// 2 -> pequeña
						 	// 3 -> pares
						 	// 4 -> juego
						 	// 5 -> punto
						 	// 6 -> mostrarCartas
						 	// 7 -> finJuego

		this.secciones = new Array(9);
		this.baraja = new Map(); 		// baraja con 8s y 9s
										// pos 50 carta boca abajo

		this.crearBaraja ();



	}

	iniciarJuego () {

		while (this.jugada != 7){

			

		}

	}

	crearBaraja () {

		var clase = this;
		var canvas = this.canvas;

		var x = 12;
		var y = 5;

		var cWidth = this.canvas.width;
		var cHeight = this.canvas.height;
		var imgBaraja = new Image();
		imgBaraja.src = "../img/baraja.png";
		var anchoCarta = 208;
		var altoCarta = 319;


		/* recortamos todas las cartas y las añadimos a la baraja */
		if (canvas && canvas.getContext) {

			var ctx = canvas.getContext("2d");
			
			if (ctx) {
				
				imgBaraja.onload = function() {

					for (var j = 0; j < y; j++) {
						for (var i = 0; i < x; i++) {
							
							var indice = i + (j * x);
							if(indice > 49)
								return clase.baraja;

							/* dibujamos la carta */
							ctx.drawImage(this, i * anchoCarta, j * altoCarta, anchoCarta, altoCarta, 0, 0, anchoCarta, altoCarta);
							/* cargamos la carta en la baraja */
							clase.baraja.set(indice, canvas.toDataURL("image/png"));

						}
					}

				}

			}
		}

	}

	removeCarta () {

	}

	ordenarCartas () {



	}

	addJugador (jugador, posicion) {

		this.jugadores[posicion] = jugador;	

	}

	setJugada () {

		switch(this.jugada) {
			case 0:
				
			break;
			case 1:
				
			break;
			case 2:
				
			break;
			case 3:
				
			break;
			case 4:
				
			break;
			case 5:
				
			break;
			case 6:
				
			break;
		}

	}


}