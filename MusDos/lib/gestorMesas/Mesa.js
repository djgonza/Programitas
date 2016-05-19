"use strict";

var Baraja 		= require("./baraja/Baraja");
var Puntuacion 	= require("./Puntuacion");

class Mesa {

	constructor () {

		this.baraja 	= new Baraja();
		this.puntuacion = new Puntuacion();

	}

}


module.exports = Mesa;