'use strict';

var socket = io();

$(function () {

	var seccionInicio = new Inicio($('#main'));

	/* sockets */
	socket.on('validarNombre', function (validacion) {

		console.log(validacion);

		if(validacion){
			alert("Wellcome");
		}else{
			nombreIncorrecto ();
		}

	});

});