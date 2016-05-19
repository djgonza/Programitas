'use strict';

class Carta {
	
	constructor(id, valor, estado) {

		this.id = id;
		this.valor = valor;
		this.estado = 0; // 0 -> en la baraja, 1 -> mano jugador, 2 -> desechada
			
	}

	setEstado (estado) {

		//limitamos los estados posibles a 0, 1 o 2
		if(estado >= 0 && estado <= 3){
			this.estado = estado;
		}
		
	}

	getEstado () {
		return this.estado;
	}

	getId () {
		return this.id;
	}
	
	equals (carta){
		if(this.id == carta.id)
			return true;
		else
			return false;
	}

	static compare (a, b){

		if(a.numero > b.numero)
			return 1;
		if(a.numero < b.numero)
			return -1;
		else
			return 0;

	}

	compareTo (carta) {

		if(this.numero > carta.numero)
			return 1;
		if(this.numero < carta.numero)
			return -1;
		else
			return 0;

	}

}

module.exports = Carta;
