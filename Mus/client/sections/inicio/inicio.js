'use strict';

class Inicio {
	
	constructor (padre) {

		this.padre = padre;
		this.el = $.parseHTML('./sections/inicio/inicio.html'); 

		console.log(this.el);

		padre.append(this.el);

		// cargamos el html
		/*padre.load('./sections/inicio/inicio.html', function (this) {
			
			//this.loadEvents();
			console.log(this);
		
		});*/

		//cargamos los eventos

	}

	mostrar () {
		//console.log(this.el);
		this.el.removeClass('hide');
	}

	ocultar () {
		this.el.addClass('hide');
		this.el.remove();
	}

	loadEvents () {

		$('#buttonSetName').click(function () {

			var name = $('#inputSetName').val();

			if(name.length > 3 && name.length < 15){

				socket.emit('validarNombre', name);

			}

		});

		$('#inputSetName').on('change paste keyup', function() {
			
			var name = $('#inputSetName').val();

			if(name.length > 3 && name.length < 15){
				nombreCorrecto ();
			}else{
				nombreIncorrecto ();
			}

		});

	}

}