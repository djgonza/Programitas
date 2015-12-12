package modelos;

import java.io.File;
import java.io.FilenameFilter;

import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

public class Archivos {
	
	private File directorio;
	private File[] ficheros;
	private ObservableList<String> nombresFicheros;
	
	public Archivos() {
		super();
		this.directorio = null;
		this.nombresFicheros = FXCollections.observableArrayList();
		this.ficheros = null;
	}
	
	/***********************************************************************/
	
	public void cargarFicheros () {
		//leemos los ficheros del directorio y los almacenamos
		setFicheros();
		//leemos los nombres de los ficheros y los almacenamos
		setNombresFicheros();
	}
	
	/***********************************************************************/
	
	public ObservableList<String> getNombresFicheros() {
		return nombresFicheros;
	}
	
	public void setNombresFicheros() {
		//limpiamos la lista
		nombresFicheros.clear();
		//cargamos los nombres de los ficheros a la Orsevable List
		for(int i=0; i<ficheros.length; i++){
			nombresFicheros.add(ficheros[i].getName());
		}
	}
	
	public File getDirectorio() {
		return directorio;
	}
	
	public void setDirectorio(File directorio) {
		this.directorio = directorio;
	}
	
	public File[] getFicheros() {
		return ficheros;
	}
	
	public void setFicheros() {
		//leemos los ficheros del directorio y los filtramos
		this.ficheros = directorio.listFiles(
						new FilenameFilter() {
							public boolean accept(File dir, String name) {
								return !name.toLowerCase().startsWith(".");
							}
						}
						);
	}	
	
	/***********************************************************************/
	
	public int buscarFichero (String cadena) {
		
		for (int i=0; i<ficheros.length; i++){
			
			if(ficheros[i].getName().equals(cadena))
				return i;
			
		}
		
		return -1;
		
	}
	
	public void renombrarFichero (int fichero, String cadena) {
		//aplicamos los cambios al fichero
		ficheros[fichero].renameTo(new File(directorio.getPath()+"/"+cadena));
	}
	
	/***********************************************************************/
	
	public String reemplazarPrimeraCoincidencia (String cadena, String cadenaBuscar, String cadenaReemplazar) {
		
		//buscamos el fichero
		int fichero = buscarFichero (cadena);
		
		//aplicamos el filtro
		cadena = cadena.substring(0, cadena.indexOf(cadenaBuscar)) + 
				cadenaReemplazar +
				cadena.substring(cadena.indexOf(cadenaBuscar)+cadenaBuscar.length(), cadena.length());
		
		//aplicamos los cambios al fichero
		renombrarFichero (fichero, cadena);
		return cadena;
		
	}
	
	public String reemplazarTodasCoincidencia (String cadena, String cadenaBuscar, String cadenaReemplazar) {
		
		//buscamos el fichero
		int fichero = buscarFichero (cadena);
		String nuevaCadena = cadena;
		//busca todas las coincidencias y reemplaza la que encuentra
		for (int i = -1; (i = cadena.indexOf(cadenaBuscar, i+1)) != -1;) {
			
			nuevaCadena = nuevaCadena.substring(0, nuevaCadena.indexOf(cadenaBuscar)) + 
					cadenaReemplazar +
					nuevaCadena.substring(nuevaCadena.indexOf(cadenaBuscar)+cadenaBuscar.length(), nuevaCadena.length());
			
		}
		//aplicamos los cambios al fichero
		renombrarFichero (fichero, nuevaCadena);
		return nuevaCadena;
		
	}
	
	/***********************************************************************/
	
	public String borrarPrimeraCoincidencia (String cadena, String cadenaBuscar) {
		
		//buscamos el fichero
		int fichero = buscarFichero (cadena);
		//aplicamos el filtro
		cadena = cadena.substring(0, cadena.indexOf(cadenaBuscar)) + 
				cadena.substring(cadena.indexOf(cadenaBuscar)+cadenaBuscar.length(), cadena.length());
		//aplicamos los cambios al fichero
		renombrarFichero (fichero, cadena);
		return cadena;
		
	}
	
	public String borrarTodasCoincidencia (String cadena, String cadenaBuscar) {
		
		//buscamos el fichero
		int fichero = buscarFichero (cadena);
		String nuevaCadena = cadena;
		//busca todas las coincidencias y borra la que encuentra
		for (int i = -1; (i = cadena.indexOf(cadenaBuscar, i+1)) != -1;) {
			nuevaCadena = nuevaCadena.substring(0, nuevaCadena.indexOf(cadenaBuscar)) + 
					nuevaCadena.substring(nuevaCadena.indexOf(cadenaBuscar)+cadenaBuscar.length(), nuevaCadena.length());
		}
		//aplicamos los cambios al fichero
		renombrarFichero (fichero, nuevaCadena);
		return nuevaCadena;
	}
	
	/***********************************************************************/
	
	public String formatearMayusculas (String cadena) {
		
		//buscamos el fichero
		int fichero = buscarFichero (cadena);
		
		//ponemos todo en minusculas
		cadena = cadena.toLowerCase();
		//ponemos la primera en mayusculas
		cadena = new Character(cadena.charAt(0)).toString().toUpperCase() + cadena.substring(1, cadena.length());

		//recorremos el string
		for (int i = 1; i < cadena.length()-1; i++){

			//creamos el caracter
			Character c = new Character(cadena.charAt(i));
			//creamos el caracter anterior
			Character a = new Character(cadena.charAt(i-1));		

			//comprovamos si el anterior no es letra
			if(!Character.isLetter(a) && !a.equals('.')){

				//comprovamos si el actual es letra
				if(Character.isLetter(c)){

					//ponemos el caracter en mayusculas
					cadena = cadena.substring(0, i) + 
						c.toString().toUpperCase() + 
						cadena.substring(i+1, cadena.length()
						);

				}

			}

		}
				
		renombrarFichero (fichero, cadena);
		return cadena;
		
	}
	
}
