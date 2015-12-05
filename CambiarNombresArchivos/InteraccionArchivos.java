import java.io.*;

public class InteraccionArchivos {

	private File directorio;
	private File[] ficheros;
	private File[] antiguosFicheros;
	private String path;

	public InteraccionArchivos (String path){

		this.path = path;
		leerArchivos ();

	}

	public void leerArchivos  () {

		//leemos el directorio
		this.directorio = new File(path);

		//leemos todos los ficheros del directorio
		this.ficheros = this.directorio.listFiles();

		//guardamos los ficheros antiguos para deshacer
		this.antiguosFicheros = this.directorio.listFiles();

	}

	/*************************************************************************/

	//getters

	public File getDirectorio () {
		return directorio;
	}

	public File[] getFicheros () {
		return ficheros;
	}

	public File[] getAntiguosFicheros () {
		return antiguosFicheros;
	}

	//setters

	public void setDirectorio (File directorio) {
		this.directorio = directorio;
	}

	public void setFicheros (File[] ficheros) {
		this.ficheros = ficheros;
	}

	public void setAntiguosFicheros (File[] antiguosFicheros) {
		this.antiguosFicheros = antiguosFicheros;
	}

	/*************************************************************************/

	//renombra el fichero especificado mediante la posicion
	public void renombrar (int posicion, String cadena) {

		ficheros[posicion].renameTo(new File(path+"/"+cadena));

	}

	/*************************************************************************/

	public static void main(String[] args) {
		
		InteraccionArchivos demo = new InteraccionArchivos(".");

	}

}