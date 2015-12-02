import java.io.*;

public class CambiarNombre {

	public static void leerDirectorio () {
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
		 
	  		//comprobamos la extension
		  	if(nombre.endsWith(".jpg")){

		  		//definimos la posicion que tomara
		  		posicion++;

		  		//renombremos el archivo
		  		String nuevoNombre = renombrar(nombre, posicion);
		  		//System.out.println(nombre);

				//comprobamos que no exista un archivo con el nuevo nombre
			  	if(!new File(nuevoNombre).exists()){
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

	public static String renombrar (String nombre, int posicion) {
		
		String nuevoNombre = "Planeta.jpg";

		/*for(int i=0; i<nombre.length(); i++){

			//comprovamos si es un numero
			if(!nombre.substring(0, i).isNumeric())
				nuevoNombre += nombre.substring(0, i);
			
		}*/

		//System.out.println();

		//.substring(0, i);
		
		return nombre;
	}

	public static void main(String[] args) {
		//System.out.print("Funciona!!!");

		leerDirectorio();
	}

}