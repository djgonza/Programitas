import java.io.*;

public class CambiarNombre {

	public static void leerDirectorio () {
		String extension = "mp3";
		//posicion para el nombre
		int posicion = 0;
		//leemos el directorio
		File directorio = new File(".");
		//leemos los archivos del directorio
		File[] ficheros = directorio.listFiles();
		//recorremos los archivos
		for (int i=0; i<ficheros.length; i++){
			//sacamos el nombre del archivo
		  	String nombre = ficheros[i].getName();

		  	System.out.println(nombre);

	  		//comprobamos la extension
		  	if(nombre.endsWith(extension)){

		  		//definimos la posicion que tomara
		  		posicion++;

		  		//renombremos el archivo
		  		String nuevoNombre = renombrar(nombre, posicion, extension);
		  		
		  		//variable para saber si existe el fichero
		  		int existe = 0;
		  		//recorremos los archivos del directorio
		  		for (int j=0; j<ficheros.length; j++){
		  			//si existe sumamos
		  			if(ficheros[j].getName() == nuevoNombre)
		  				existe++;
		  		}

				//comprobamos que no exista un archivo con el nuevo nombre
			  	if(existe==0){
			  		//renombramos el archivo
			  		boolean success = ficheros[i].renameTo(new File(nuevoNombre));
	            	if (!success)
	                	System.out.println("Error intentando cambiar el nombre de fichero");
			  	}else{
			  		System.out.println("El archivo ya existe");
			  	}
		  	}	
		  	
		}

	}

	public static String renombrar (String nombre, int posicion, String extension) {
		
		String nuevoNombre = "";
		//nuevoNombre = nombre.replace(".", "");
		nuevoNombre = nombre.replaceAll("mp3", ".mp3");
		System.out.println(nuevoNombre);
		return nuevoNombre;
	}

	public static void main(String[] args) {
		//System.out.print("Funciona!!!");

		leerDirectorio();
	}

}
