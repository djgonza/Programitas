'use strict';

var Mesa = require('./mesa');

class Sala {

	constructor (numeroMesas) {

		this.mesas = new Set();

		for(var i = 0; i < numeroMesas; i++){

			this.mesas.add (new Mesa());

		}

	}

}

module.exports = Sala;