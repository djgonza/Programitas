package lanzador;

import java.io.IOException;
import java.security.Principal;

import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Stage;

public class MainApp extends Application {

	public static Stage escenario;
	
	@Override
	public void start(Stage primaryStage) {
		
		//leemos el escenario
		escenario = primaryStage;
		//leemos la vista principal
		FXMLLoader loader = new FXMLLoader(Principal.class.getResource("/vistas/vistaPrincipal.fxml"));
		
		try {
			
			//cargamos la vista principal
			AnchorPane panel = (AnchorPane) loader.load();
			//creamos la escena y cargamos la vista
			Scene escena = new Scene(panel);
			escena.getStylesheets().add("/vistas/style.css");
			//añadimos la escena al escenario
			escenario.setScene(escena);
			//mostramos el escenario
			escenario.show();
			
		 } catch (IOException e) {
			e.printStackTrace();
		 }
	
	}
	
	public static void main(String[] args) {
	     launch(args);
	}

}