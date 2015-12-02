import java.io.*;
import java.util.Scanner;

public class CambiarNombre {

	private Scanner teclado;
	private String cadena;
	private String sustituto;
	private String extension;
	private File directorio;
	private File[] ficheros;
	private String salir;


	public CambiarNombre () {
		//inicializamos las variables
		cadena = "";
		sustituto = "";
		extension = "";
		salir = "";

		//inicializamos el teclado
		teclado = new Scanner (System.in);

		//pedimos los datos y cambiamos los archivos
		do {

			//leemos el directorio
			directorio = new File(".");

			//leemos los archivos de directorio
			ficheros = directorio.listFiles();

			//pedimos los datos
			pedirDatos();

			//aplicamos los cambios
			aplicarCambios();

			//comprovamos si desea continuar
			System.out.println("¿Desea continuar? (si/no)");
			this.salir = teclado.nextLine();

		}
		while(salir.equals("si"));
		
	}

	public void pedirDatos () {

		System.out.println("Introduce el tipo de archivo ");
		this.extension = teclado.nextLine();

		System.out.println(extension);

		System.out.println("Introduce la cadena que deseas buscar");
		this.cadena = teclado.nextLine();

		System.out.println(cadena.length());

		System.out.println("Introduce la cadena que deseas reemplazar");
		this.sustituto = teclado.nextLine();

		System.out.println(sustituto.length());

	}

	public void aplicarCambios () {
		
		//recorremos los archivos
		for (int i=0; i<ficheros.length; i++){
			
			//sacamos el nombre del archivo
		  	String nombre = ficheros[i].getName();

	  		//comprobamos la extension
		  	if(nombre.endsWith(extension)){

		  		//renombramos el archivo
			  	boolean success = ficheros[i].renameTo(new File(renombrar(nombre)));
	            if (!success)
	                System.out.println("Error intentando cambiar el nombre de fichero");
			  	
		  	}	
		  	
		}

	}

	public String renombrar (String nombre) {

		String nuevoNombre = "";

		if(this.cadena.length() > 1){

			if(this.sustituto.length() == 0) {
				nuevoNombre = nombre.replace(this.cadena, "");
			}else{
				nuevoNombre = nombre.replace(this.cadena, this.sustituto);
			}

		}else{
			if(this.sustituto.length() == 0) {
				nuevoNombre = nombre.replaceAll(this.cadena, "");
			}else{
				nuevoNombre = nombre.replaceAll(this.cadena, this.sustituto);
			}
		}

		System.out.println(nuevoNombre);

		return nuevoNombre;
	}

	public static void main(String[] args) {
		CambiarNombre app = new CambiarNombre();
	}

}
