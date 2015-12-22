$(document).ready(function() {

	seccion = "";

	function mostrarTituloSeccion (texto) {
		$("#tituloSeccion").css("animation", "mostrarTituloSeccion 3s forwards");
		$("#tituloSeccion").html("<span>"+texto+"</span>");

	}

	function ocultarTituloSeccion () {
		$("#tituloSeccion").css("animation", "ocultarTituloSeccion 3s forwards");
	}

	function ocultarFondoSection () {
		$("#content").css("animation", "ocultarFondoSection 1s forwards");
	}

	function mostrarFondoSection () {
		$("#content").css("animation", "mostrarFondoSection 1s forwards");
	}

	function clickIcono (nombreSeccion) {
		if (seccion == "") {

			navIconos ();
			mostrarTituloSeccion (nombreSeccion);
			mostrarFondoSection ();

		}else if (seccion != nombreSeccion){

			ocultarTituloSeccion(nombreSeccion);
			window.setTimeout(function () {
				mostrarTituloSeccion (nombreSeccion);
			}, 2000);

			ocultarFondoSection ();
			window.setTimeout(function () {
				mostrarFondoSection ();
			}, 3000);

		}
		seccion = nombreSeccion;
	}


	//inicia la animacion de la barra de navegacion
	function navIconos () {
		$("#iconoComics").css("animation", "navIconoComic 2s forwards");
		$("#iconoContacto").css("animation", "navIconoContacto 2s forwards");
		$("#iconoPeliculas").css("animation", "navIconoPeliculas 2s forwards");
		$("#iconoGaleria").css("animation", "navIconoGaleria 2s forwards");
		$("#iconoHistoria").css("animation", "navIconoHistoria 2s forwards");

		$("#navegacion").css("animation", "navegacion 3s forwards");

	}

	$("#iconoComics").click(function() {
		clickIcono ("Comics");
	});
	$("#iconoContacto").click(function() {
		clickIcono ("Contacto");
	});
	$("#iconoPeliculas").click(function() {
		clickIcono ("Peliculas");
		$("#peliculas>iframe").css("animation: trailer 5s forwards");
	});
	$("#iconoGaleria").click(function() {
		clickIcono ("Galeria");
	});
	$("#iconoHistoria").click(function() {
		clickIcono ("Historia");
	});


});