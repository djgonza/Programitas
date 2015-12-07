import java.io.*;

public class InteraccionArchivos {

	private File directorio;
	private File[] ficheros;
	private String path;

	public InteraccionArchivos (String path){

		this.path = path;
		leerArchivos ();

	}

	/*************************************************************************/

	//getters

	public File getDirectorio () {
		return directorio;
	}

	public File[] getFicheros () {
		return ficheros;
	}

	//setters

	public void setDirectorio (File directorio) {
		this.directorio = directorio;
	}

	public void setFicheros (File[] ficheros) {
		this.ficheros = ficheros;
	}

	/*************************************************************************/

	//renombra el fichero especificado mediante la posicion
	public void renombrar (int posicion, String cadena) {

		//renombramos los ficheros
		ficheros[posicion].renameTo(new File(path+"/"+cadena));

	}

	/*************************************************************************/

	public void leerArchivos  () {

		//leemos el directorio
		this.directorio = new File(path);

		//leemos todos los ficheros del directorio
		this.ficheros = this.directorio.listFiles();

	}

	/*************************************************************************/

	public static void main(String[] args) {
		
		InteraccionArchivos demo = new InteraccionArchivos(".");

	}

}