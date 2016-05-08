'use strict';

var socket = io();
var mesas = new Map();
var nombreJugador = "";
var mesaJuego = null;

$(function () {

	/* events */
	$("#buttonSetName").click(function () {

		var nombre = $("#inputSetName").val();

		if(validarNombre(nombre)){
			nombreJugador = nombre;
			socket.emit('validarNombre', nombre);
			$('#validarNombrePreload').removeClass('hide');
			$('#buttonSetName').addClass('hide');
		}

	});

	$("#inputSetName").on('change', function() {
		
		if(validarNombre($(this).val())){
			$('#buttonSetName').removeClass('red');
			$('#buttonSetName').addClass('green');
		}else{
			$('#buttonSetName').removeClass('green');
			$('#buttonSetName').addClass('red');
		}

	});


	/* sockets */
	socket.on('validarNombre', function (validacion) {

		if(validacion){
			$('#inicio').addClass('hide');
			$('#mesas').removeClass('hide');
			socket.emit('getMesas');
		}else{
			$('#validarNombrePreload').addClass('hide');
			$('#buttonSetName').removeClass('hide');
			$('#buttonSetName').removeClass('green');
			$('#buttonSetName').addClass('red');
		}

	});

	socket.on('setMesa', function (mesa) {

		mesas.set(mesa.id, new Mesa(mesa.id, mesa.tipo, $('#mesas'), this));

		mesa.jugadores.forEach( 
			
			function(jugador, i) {
			
				if(jugador){
					mesas.get(mesa.id).addJugador(jugador, i);
				}

			}

		);

	});

	socket.on('setAsiento', function (mesa) {

		if(mesa.jugador == nombreJugador){

			$('#mesas').addClass('hide');
			$('#mesaJuego').removeClass('hide');

			mesaJuego = new MesaJuego(document.getElementById('mesaJuego'), mesa.id, mesa.posicion);

		}else{

			mesas.get(mesa.id).addJugador (mesa.jugador, mesa.posicion);
		
		}

	});

	socket.on('unsetAsiento', function (mesa) {

		mesas.get(mesa.id).removeJugador (mesa.posicion);

	});

});

function validarNombre (nombre) {

	var re = new RegExp(/^(\d|\D|[0-9]){3,7}$/);

	if(re.test(nombre))
		return true;
	else
		return false;

}