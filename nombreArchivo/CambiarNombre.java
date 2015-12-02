import java.io.*;

public class CambiarNombre {

	public static void leerDirectorio () {
		String extension = ".jpg";
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
		if(posicion<10)
			nuevoNombre += "0";
		nuevoNombre = posicion+""+extension;

		//sacamos la extension
		/*String[] nombreSplit = nombre.split(".", 2);
		System.out.println(nombreSplit.length);
			//System.out.print(nombreSplit[0]+" "+nombreSplit[1]);
			for (int j=0; j<nombreSplit.length; j++){
				System.out.println(nombreSplit[j]);
			}*/


		//nombre.codePointAt();


		for (String retval: nombre.split(".", 2)){
	        System.out.println(retval);
	    }

		for(int i=0; i<nombre.length(); i++){

			//comprovamos si es un numero
			//if(!nombre.substring(i, i+1))
				//System.out.println(nombre.substring(i, i+1));
				//nuevoNombre += nombre.substring(0, i);
			
		}

		//System.out.println();

		//.substring(0, i);
		
		return nuevoNombre;
	}

	public static void main(String[] args) {
		//System.out.print("Funciona!!!");

		leerDirectorio();
	}

}