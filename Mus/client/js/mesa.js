'use strict';

class Mesa {

	constructor (id, tipo, padre, socket) {

		this.id = id;
		this.tipo = tipo;
		this.jugadores = new Array(4);
		this.asientos = new Array(4);
		this.elPadre = padre;
		this.socket = socket;
		this.el = $('<div>', {
			class: 'mesa card blue-grey darken-1'
		});

		this.crearMesa();

	}

	crearMesa () {

		/* referencia de la clase */
		var clase = this;

		/* asientos */
		for(var i = 0; i < 4; i++){

			var styles = '';

			switch(i) {
				case 1:
					styles += 'align-self: flex-start';
				break;
				case 2:
					styles += 'margin-left: auto';
				break;
			}

			var asiento = $('<button>', {
					class: 'btn-floating waves-effect waves-light btn-large red',
					style: styles,
					id: i, 
					text: 'Sentarse'
				}).appendTo(this.el);

			
			/* Eventos */
			asiento.on('click', function () {

				/* avisar al server */
				clase.socket.emit('setAsiento', {
					id: clase.id,
					posicion: this.id
				});


			});

			/* añadimos al array */
			this.asientos[i] = asiento;

		}

		/* insertamos el elemento en el html */
		this.el.appendTo(this.elPadre);

	}

	mostrarMesa () {

		this.el.removeClass('hide');

	}

	ocultarMesa () {

		this.el.addClass('hide');

	}

	addJugador (nombre, posicion) {

		if(posicion < 0 && posicion >= 4)
			return false;

		if(this.jugadores[posicion] == null){
			this.jugadores[posicion] = nombre;
			this.setAsientoLleno(this.asientos[posicion], nombre);
			return true;
		}

		return false;

	}

	removeJugador (posicion) {

		this.jugadores.splice(posicion);
		this.setAsientoVacio(this.asientos[posicion]);

	}

	setAsientoVacio (asiento) {

		asiento.prop('disabled', false);
		asiento.text('Sentarse');

	}


	setAsientoLleno (asiento, jugador) {

		asiento.prop('disabled', true);
		asiento.text(jugador);

	}

}