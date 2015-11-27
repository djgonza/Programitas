$(document).ready(function(){

var listaPeliculas = [];

    //recogemos los datos del JSON
    $.getJSON("lib_dvd_importados.json", function(data) {

        var numeroPeliculas = 10; //data.Data.length;

        /* Recorremos todas las peliculas*/
        for(i=0; i<=numeroPeliculas; i++){
            /* Creamos el objeto auxiliar */
            var objetoInsertar = {};
            /* Definimos los valores del objeto*/ 
            for(j=1; j<=data.Data[i].length; j++){
                /* Asignamos los valores al objeto */
                objetoInsertar[data.Fields[j]] = data.Data[i][j];
            }
            /* Creamos el objeto backbone */
            listaPeliculas[i] = new Pelicula(objetoInsertar);
        }

        console.log(listaPeliculas);
        
    });

});