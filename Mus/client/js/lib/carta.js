'use strict';

class Carta {

	constructor (id, valor, img) {

		this.id 	= id;
		this.valor 	= valor;
		this.img 	= img;

	}

	equals (carta) {

		if (this.id == carta.id)
			return true;
		else
			return false;

	}

	static compare (a, b) {

		if(a.id == b.id)
			return 0;

		if(a.valor == b.valor)
			return 0;
		else if(a.valor > b.valor)
			return 1;
		else
			return -1;

	}

}