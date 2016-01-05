package vistas;

import lanzador.MainApp;
import modelos.Archivos;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;
import javafx.fxml.FXML;
import javafx.scene.control.ListView;
import javafx.scene.control.TextField;
import javafx.scene.control.cell.TextFieldListCell;
import javafx.scene.control.SelectionMode;
import javafx.stage.DirectoryChooser;
import javafx.scene.control.Label;

public class ControladorVistaPrincipal {
	
	private Archivos archivos;
	private DirectoryChooser directorioChooser;
	private ObservableList<String> ficherosSeleccionados;
	@FXML
	private ListView<String> listaFicheros;
	@FXML
	private Label ruta;
	@FXML
	private TextField cadenaBuscar;
	@FXML
	private TextField cadenaReemplazar;
	
	//constructor
	public ControladorVistaPrincipal () {

		//cargamos la lista en la vista
		listaFicheros = new ListView<String>();
		listaFicheros.setEditable(true);
		listaFicheros.setCellFactory(TextFieldListCell.forListView());
		//creamos el selector de directorios
		directorioChooser = new DirectoryChooser();
		//ponemos el titulo al dialogo
		directorioChooser.setTitle("Selecciona el Directorio");
		//iniciamos el modelo que guarda los ficheros
		archivos = new Archivos();
		//iniciamos la lista de ficheros seleccionados
		ficherosSeleccionados = FXCollections.observableArrayList();
		
	}
	
	@FXML
	private void leerDirectorio(){
		//modo de seleccion de la lista
		listaFicheros.getSelectionModel().setSelectionMode(SelectionMode.MULTIPLE);
		//asignamos el directorio
		archivos.setDirectorio (directorioChooser.showDialog(MainApp.escenario));
		//mostramos la ruta en la etiqueta
		ruta.setText(archivos.getDirectorio().getPath());
		//recargamos los ficheros
		cargarFicheros ();
		
	}
	
	@FXML
	private void deshacer () {
	}
	
	@FXML
	private void reemplazarPrimeraCoincidencia () {
		//borramos los ficheros seleccionados
		ficherosSeleccionados.clear();
		//recorre los archivos seleccionados y los renombra
		for (String seleccionado : getFicherosSeleccionados ()){
			String nuevoNombre = archivos.reemplazarPrimeraCoincidencia(seleccionado, cadenaBuscar.getText(), cadenaReemplazar.getText());
			//guardamos el nuevo nombre para seleccionarlo
			ficherosSeleccionados.add(nuevoNombre);
		}
		//recargamos los ficheros
		cargarFicheros ();
		//reseleccionamos los ficheros
		seleccionarFicheros ();
		
	}
	
	@FXML
	private void reemplazarTodasCoincidencias () {
		//borramos los ficheros seleccionados
		ficherosSeleccionados.clear();
		//recorre los archivos seleccionados y los renombra
		for (String seleccionado : getFicherosSeleccionados ()){
			String nuevoNombre = archivos.reemplazarTodasCoincidencia(seleccionado, cadenaBuscar.getText(), cadenaReemplazar.getText());
			//guardamos el nuevo nombre para seleccionarlo
			ficherosSeleccionados.add(nuevoNombre);
		}
		//recargamos los ficheros
		cargarFicheros ();
		//reseleccionamos los ficheros
		seleccionarFicheros ();
		
	}
	
	@FXML
	private void borrarPrimeraCoincidencia () {
		//borramos los ficheros seleccionados
		ficherosSeleccionados.clear();
		//recorre los archivos seleccionados y los renombra
		for (String seleccionado : getFicherosSeleccionados ()){
			String nuevoNombre = archivos.borrarPrimeraCoincidencia(seleccionado, cadenaBuscar.getText());
			//guardamos el nuevo nombre para seleccionarlo
			ficherosSeleccionados.add(nuevoNombre);
		}
		//recargamos los ficheros
		cargarFicheros ();
		//reseleccionamos los ficheros
		seleccionarFicheros ();
	}
	
	@FXML
	private void borrarTodasCoincidencias () {
		//borramos los ficheros seleccionados
		ficherosSeleccionados.clear();
		//recorre los archivos seleccionados y los renombra
		for (String seleccionado : getFicherosSeleccionados ()){
			String nuevoNombre = archivos.borrarTodasCoincidencia(seleccionado, cadenaBuscar.getText());
			//guardamos el nuevo nombre para seleccionarlo
			ficherosSeleccionados.add(nuevoNombre);
		}
		//recargamos los ficheros
		cargarFicheros ();
		//reseleccionamos los ficheros
		seleccionarFicheros ();
	}
	
	@FXML
	private void formatearMayusculas () {
		//borramos los ficheros seleccionados
		ficherosSeleccionados.clear();
		//recorre los archivos seleccionados y los renombra
		for (String seleccionado : getFicherosSeleccionados ()){
			String nuevoNombre = archivos.formatearMayusculas (seleccionado);
			//guardamos el nuevo nombre para seleccionarlo
			ficherosSeleccionados.add(nuevoNombre);
		}
		//recargamos los ficheros
		cargarFicheros ();
		//reseleccionamos los ficheros
		seleccionarFicheros ();
	}
	
	@FXML
	private void numerar () {
		System.out.println("click");
		
	}
	
	@FXML
	private void metadatos () {
	}
	
	public ObservableList<String> getFicherosSeleccionados () {
		return listaFicheros.getSelectionModel().getSelectedItems();
	}
	
	public void seleccionarFicheros () {
		
		//recorremos los ficheros actuales
		for (int i=0; i<archivos.getNombresFicheros().size(); i++){
			//recorremos los ficheros seleccionados
			for (int j=0; j<ficherosSeleccionados.size(); j++){
				//seleccionamos las coincidencias
				if(ficherosSeleccionados.get(j).equals(archivos.getNombresFicheros().get(i))){
					listaFicheros.getSelectionModel().select(i);
				}
				
			}
		}
		
	}
	
	public void cargarFicheros () {
		//leemos los ficheros de la nueva ruta
		archivos.cargarFicheros();
		//mostramos los nombres de los ficheros
		listaFicheros.setItems(archivos.getNombresFicheros());
	}

}