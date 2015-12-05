
public class Controlador {

	InteraccionArchivos ficheros;
	FormatearNombres nombre;

	public Controlador () {

		//inicializamos el lector de ficheros con la ruta
		ficheros = new InteraccionArchivos("./pruebas");
		nombre = new FormatearNombres ();
	}

	/*************************************************************************/

	public void reemplazar (Boolean todas, String cadenaBuscar, String cadenaReemplazar, String terminaEn) {

		//recargamos los archivos
		ficheros.leerArchivos();

		//definimos los parametros para reemplazar
		nombre.setCadenaBuscar (cadenaBuscar);
		nombre.setCadenaReemplazar (cadenaReemplazar);

		//recorremos los archivos y reemplazamos los caracteres
		for (int i=0; i<ficheros.getFicheros().length; i++) {

			//definimos el nombre del archivo
			nombre.setCadena (ficheros.getFicheros()[i].getName());

		  	//comprobamos que es el archivo que queremos
			if(nombre.getCadena().endsWith(terminaEn)){

				//reemplazar todas las cadenas o solo la primera
				if(todas){
					//aplicamos el filtro
					nombre.reemplazarTodasCadenas();
				}else{
					//aplicamos el filtro
					nombre.reemplazarPorPosicion(nombre.getCadena().indexOf(cadenaBuscar));
				}

				//renombramos el archivo
				ficheros.renombrar (i, nombre.getCadena());

			}

		}

	}

	/*************************************************************************/

	public void eliminar (Boolean todas, String cadenaBuscar, String terminaEn) {

		//recargamos los archivos
		ficheros.leerArchivos();

		//definimos los parametros para reemplazar
		nombre.setCadenaBuscar (cadenaBuscar);

		//recorremos los archivos y reemplazamos los caracteres
		for (int i=0; i<ficheros.getFicheros().length; i++) {

			//definimos el nombre del archivo
			nombre.setCadena (ficheros.getFicheros()[i].getName());

		  	//comprobamos que es el archivo que queremos
			if(nombre.getCadena().endsWith(terminaEn)){

				//reemplazar todas las cadenas o solo la primera
				if(todas){
					//aplicamos el filtro
					nombre.eliminarTodosCaracteres();
				}else{
					//aplicamos el filtro
					nombre.eliminarPorPosicionCaracter(nombre.getCadena().indexOf(cadenaBuscar));
				}

				//renombramos el archivo
				ficheros.renombrar (i, nombre.getCadena());

			}

		}

	}

	/*************************************************************************/

	public void eliminarCaracteresConflictivos (String terminaEn) {

		//recargamos los archivos
		ficheros.leerArchivos();

		//recorremos los archivos y reemplazamos los caracteres
		for (int i=0; i<ficheros.getFicheros().length; i++) {

			//definimos el nombre del archivo
			nombre.setCadena (ficheros.getFicheros()[i].getName());

		  	//comprobamos que es el archivo que queremos
			if(nombre.getCadena().endsWith(terminaEn)){

				//aplicamos el filtro
				nombre.eliminarCaracteresConflictivos();

				//renombramos el archivo
				ficheros.renombrar (i+1, nombre.getCadena());

			}

		}

	}

	/*************************************************************************/

	public void ponerEnMayusculas (String terminaEn) {

		//recargamos los archivos
		ficheros.leerArchivos();

		//recorremos los archivos y reemplazamos los caracteres
		for (int i=0; i<ficheros.getFicheros().length; i++) {

			//definimos el nombre del archivo
			nombre.setCadena (ficheros.getFicheros()[i].getName());

		  	//comprobamos que es el archivo que queremos
			if(nombre.getCadena().endsWith(terminaEn)){
				
				//aplicamos el filtro
				nombre.ponerMayusculas(terminaEn);

				//renombramos el archivo
				ficheros.renombrar (i, nombre.getCadena());

			}

		}

	}

	/*************************************************************************/

	public void numerar (String terminaEn) {

		//recargamos los archivos
		ficheros.leerArchivos();

		//contador para los numeros
		int contador = 0;

		//recorremos los archivos y reemplazamos los caracteres
		for (int i=0; i<ficheros.getFicheros().length; i++) {

			//definimos el nombre del archivo
			nombre.setCadena (ficheros.getFicheros()[i].getName());

		  	//comprobamos que es el archivo que queremos
			if(nombre.getCadena().endsWith(terminaEn)){
				
				contador++;

				//aplicamos el filtro
				nombre.numerarCadena(contador);

				System.out.println(nombre.getCadena());

				//renombramos el archivo
				ficheros.renombrar (i, nombre.getCadena());

			}

		}

	}

	/*************************************************************************/

	public static void main(String[] args) {

		Controlador demo = new Controlador();

		//demo.eliminar(true, "_", ".jpg");
		demo.reemplazar(false, "_", " ", ".jpg");
		//demo.eliminarCaracteresConflictivos(".jpg");
		//demo.ponerEnMayusculas(".jpg");
		//demo.numerar(".jpg");

	}

}