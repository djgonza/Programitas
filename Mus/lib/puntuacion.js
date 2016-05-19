'use strict';

class Puntuacion {

	constructor () {

		this.grande = {
			ganador: null,
			puntos: 0
		};
		this.pequeña = {
			ganador: null,
			puntos: 0
		};
		this.pares = {
			ganador: null,
			puntos: 0
		};
		this.juego = {
			ganador: null,
			puntos: 0
		};
		this.equipoA = 0;
		this.equipoB  = 0;

	}

	/* ganadores de esa jugada */
	setGanadorGrande (ganador) {
		this.grande.ganador = ganador;
	}
	setGanadorPequeña (ganador) {
		this.grande.ganador = ganador;
	}
	setGanadorPares (ganador) {
		this.grande.ganador = ganador;
	}
	setGanadorJuego (ganador) {
		this.grande.ganador = ganador;
	}
	setGanadorPunto (ganador) {
		this.grande.ganador = ganador;
	}

	/* suma la puntuacion pasada */
	sumarGrande (puntos) {
		this.grande.puntos += puntos;
	}
	sumarPequeña (puntos) {
		this.pequeña.puntos += puntos;
	}
	sumarPares (puntos) {
		this.pares.puntos += puntos;
	}
	sumarJuego (puntos) {
		this.juego.puntos += puntos;
	}
	sumarPunto (puntos) {
		this.punto.puntos += puntos;
	}

	/* devuelve los puntos de los equipos */
	getPuntosA () {
		return this.equipoA;
	}

	getPuntosB () {
		return this.equipoB;
	}


	/* 
	 * cuenta los puntos de esa jugada para el equipo a
	*/
	contarPuntos () {

		/* grande */
		if(this.grande.ganador == 0){
			this.equipoA += this.grande.puntos;
		}else if(this.grande.ganador == 1){
			this.equipoB += this.grande.puntos;
		}
		/* pequeña */
		if(this.pequeña.ganador == 0){
			this.equipoA += this.pequeña.puntos;
		}else if(this.pequeña.ganador == 1){
			this.equipoB += this.pequeña.puntos;
		}
		/* pares */
		if(this.pares.ganador == 0){
			this.equipoA += this.pares.puntos;
		}else if(this.pares.ganador == 1){
			this.equipoB += this.pares.puntos;
		}
		/* juego */
		if(this.juego.ganador == 0){
			this.equipoA += this.juego.puntos;
		}else if(this.juego.ganador == 1){
			this.equipoB += this.juego.puntos;
		}
		/* punto */
		if(this.punto.ganador == 0){
			this.equipoA += this.punto.puntos;
		}else if(this.punto.ganador == 1){
			this.equipoB += this.punto.puntos;
		}

	}

	/* pone la puntuacion de esa jugada a 0 */
	resetJugada () {
		this.grande = {
			ganador: null,
			puntos: 0
		};
		this.pequeña = {
			ganador: null,
			puntos: 0
		};
		this.pares = {
			ganador: null,
			puntos: 0
		};
		this.juego = {
			ganador: null,
			puntos: 0
		};
	}


}