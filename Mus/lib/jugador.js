'use strict'

class Jugador {

	constructor (socket, nombre) {
		
		this.socket 		= socket;
		this.nombre			= nombre;
		this.cartas 		= new Map();
		this.cartasEnMano 	= 0;

	}

	recogerCarta (carta) {

		this.cartas.forEach( 
			
			function(cartaEnMano, i) {
				
				if(cartaEnMano == null){

					this.cartas.set(i, carta);
					this.cartasEnMano++;
					
				}

			}

		);

	}

	static compareNameTo (a, b) {

		if(a.nombre == b.nombre)
			return true;
		else
			return false;

	}


} 

module.exports = Jugador;