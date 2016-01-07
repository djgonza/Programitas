window.Peliculas;

$(document).ready(function(){

    //recogemos los datos del JSON
    $.getJSON("lib_dvd_importados.json").success(function (data) {

        var listaPeliculas = [];
        var numeroPeliculas = 5;//data.Data.length;

        var director = '';
        var actor = '';
        var actores = [];
        var pelicula = '';
        var actorPelicula = '';

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

            //sql directores
            director += "INSERT INTO director VALUES (NULL, '"+data.Data[i][19]+"');";

            //sql peliculas
            pelicula += "INSERT INTO pelicula VALUES (NULL, '";
                //caratula
                pelicula += ""+data.Data[i][0]+",";
                //duracion
                pelicula += ""+data.Data[i][10].t+",";
                //vista
                pelicula += ""+data.Data[i][9]+",";
                //año
                pelicula += ""+data.Data[i][11]+",";
                //formato
                pelicula += ""+data.Data[i][5]+",";
                //genero
                pelicula += ""+data.Data[i][7]+",";
                //nacionalidad
                pelicula += ""+data.Data[i][8]+",";
                //puntuación
                if(data.Data[i][16]){
                    pelicula += ""+data.Data[i][16].e+",";
                }else{
                    pelicula += ""+data.Data[i][16]+",";
                }             
                //soporte
                pelicula += ""+data.Data[i][6]+",";
                //titulo
                pelicula += ""+data.Data[i][4]+",";
                //director
                pelicula += ""+i+",";

            pelicula += "');";

            //sql actores
            actores = data.Data[i][21].split(",");
            for (k=0; k<actores.length; k++){
                actor += "INSERT INTO actor VALUES (NULL, '"+actores[k]+"');";
                actorPelicula += "INSERT INTO actor_pelicula VALUES ("+k+", '"+i+"');";
            }

            //console.log(data.Data[i]);

        }

        console.log(director);
        console.log(actor);
        console.log(pelicula);
        console.log(actorPelicula);

        /* Creamos la coleccion */
        Peliculas = new Libreria (listaPeliculas);

        //console.log(Peliculas);

        /* Renderiza */
        Peliculas.models[1].set("generoGnField", "cine");

        //console.log(Peliculas);

    });

    

});