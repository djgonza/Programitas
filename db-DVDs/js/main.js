window.Peliculas;

$(document).ready(function(){

    //recogemos los datos del JSON
    $.getJSON("lib_dvd_importados.json").success(function (data) {

        var listaPeliculas = [];
        var numeroPeliculas = 10; //data.Data.length;

        /* Recorremos todas las peliculas*/
        for(i=0; i<numeroPeliculas; i++){
            /* Creamos el objeto auxiliar */
            var objetoInsertar = {};
            /* Definimos los valores del objeto*/ 
            for(j=1; j<=data.Data[i].length; j++){
                /* Asignamos los valores al objeto */
                objetoInsertar[data.Fields[j]] = data.Data[i][j];
            }
            /* Creamos el objeto backbone */
            listaPeliculas[i] = new Pelicula(objetoInsertar);
            /* Creamos su vista */
            var view = new PeliculaView({
                model: listaPeliculas[i]
            });
        }

        /* Creamos la coleccion */
        Peliculas = new Libreria (listaPeliculas);

        /* Renderiza */
        Peliculas.models[1].set("generoGnField", "cine");

        //console.log(Peliculas);

    });

    

});