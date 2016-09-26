'use strict';

var Carta = require('./carta');

class Baraja {

	constructor(tipo) {

		this.cartas = new Map();
		this.tipo = tipo; // 0 -> 4 reyes, 1 -> 8 reyes

		this.crearBaraja();

	}

	/* carga las cartas para esta mesa */
	crearBaraja (){

		for(var i = 0; i < 40; i++){
			
			var valor = i % 10 + 1;
			
			this.cartas.set(new Carta(i, valor, 0));

		}

		//baraja con 8 reyes
		if(this.tipo == 1){

			this.cartas.set(1, new Carta(1, 1));
			this.cartas.set(2, new Carta(2, 10));

			this.cartas.set(11, new Carta(11, 1));
			this.cartas.set(12, new Carta(12, 10));

			this.cartas.set(21, new Carta(21, 1));
			this.cartas.set(22, new Carta(22, 10));

			this.cartas.set(31, new Carta(31, 1));
			this.cartas.set(32, new Carta(32, 10));

		}

	}

	setEsatadoCarta (idCarta, estado) {

		this.cartas.get(idCarta).setEstado (estado);

	}

	/* devuelve el numero de cartas en la baraja */
	getCartasEnBaraja () {

		var count = 0;
		this.baraja.forEach (
			function (carta, i){
				if(carta.getEstado == 0)
					count ++;
			}
		);
		return count;

	}

	/* devuelve el numero de cartas repartidas */
	getCartasRepartidas () {

		var count = 0;
		this.baraja.forEach (
			function (carta, i){
				if(carta.getEstado == 1)
					count ++;
			}
		);
		return count;

	}

	/* devuelve el numero de cartas desechadas */
	getCartasDesechadas () {

		var count = 0;
		this.baraja.forEach (
			function (carta, i){
				if(carta.getEstado == 2)
					count ++;
			}
		);
		return count;

	}

	/* reordena las cartas */
	barajar () {

		var currentIndex = this.cartas.size, temporaryValue, randomIndex;

		while (0 !== currentIndex) {

			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			temporaryValue = this.cartas.get(currentIndex);
			this.cartas.set(currentIndex, this.cartas.get(randomIndex));
			this.cartas.set(randomIndex, temporaryValue);

		}

	}

	/* pasamos las cartas desechadas a la baraja */
	recogerCartas () {
			
		// pasamos las cartas desechadas a la baraja
		this.cartas.forEach( 
				
			function(carta, i) {
				
				if(carta.estado == 2)
					carta.setEstado(0);

			}

		);

	}

	/* devuelve la siguiente carta que no este 
	 * ni repartida ni desechada  
	 */
	getSiguienteCarta () {

		// si no hay cartas para repartir
		// recogemos las cartas desechadas
		// barajamos
		if(this.getCartasEnBaraja < 1){
			this.recogerCartas();
			this.barajar();
		}


		// enviamos la carta
		this.cartas.forEach (
			function (carta, id) {
				if(carta.estado == 0){
					//ponemos esa carta en mano
					carta.setEstado (1);
					return carta;
				}

			}
		);

	}



}

module.exports = Baraja;