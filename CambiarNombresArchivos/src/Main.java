import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.io.*;

public class Main {

	private JFrame frame;
	private JTextField cadenaBuscar;
	private JTextField cadenaReemplazar;
	private JTextField formato;
	private File directorio;
	private File[] ficheros;
	private File[] deshacer;

	/**
	 * Launch the application.
	 */
	public static void main(String[] args) {
		EventQueue.invokeLater(new Runnable() {
			public void run() {
				try {
					Main window = new Main();
					window.frame.setVisible(true);
					
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		});
	}

	/**
	 * Create the application.
	 */
	public Main() {
		initialize();
	}
	
	public void leerArchivos () {
		
		//leemos el directorio
		this.directorio = new File(".");

		//leemos los archivos de directorio
		this.ficheros = directorio.listFiles();
		
	}
	
	public void deshacerCambios() {
		
		leerArchivos ();
		
		//recorremos los archivos nuevos
		for (int j=0; j<this.ficheros.length; j++){
			
			//comprobamos la extension
		  	if(this.ficheros[j].getName().endsWith(this.formato.getText())){
		  		
		  		//recorremos los archivos viejos
		  		for (int i=0; i<this.deshacer.length; i++){
		  			
		  			//aplicamos el cambio de nombre al fichero antiguo
					String nombre = renombrar(this.deshacer[i].getName());
					
					//si es el archivo anterior lo renombramos con el antiguo nombre
					if(nombre.equals(this.ficheros[j].getName())){
						this.ficheros[j].renameTo(new File(this.deshacer[i].getName()));
					}
		  		}
		  	}
		
		}
		
	}
	
	public void ejecutarCambios() {
		
		//deshacer cambios
		this.deshacer = directorio.listFiles();
		
		//comprovamos que hay foramto
		if(!this.formato.getText().equals("")){
			
			//recorremos los archivos
			for (int i=0; i<this.ficheros.length; i++){
				
				//sacamos el nombre del archivo
			  	String nombre = this.ficheros[i].getName();
	
		  		//comprobamos la extension
			  	if(nombre.endsWith(this.formato.getText())){
			  		
			  		//renombramos el archivo
				  	this.ficheros[i].renameTo(new File(renombrar(nombre)));
			  	}
			}
		}
	}
	
	public String renombrar (String nombre) {

		String nuevoNombre = "";

		if(this.cadenaBuscar.getText().length() > 1){

			if(this.cadenaReemplazar.getText().length() == 0) {
				nuevoNombre = nombre.replace(this.cadenaBuscar.getText(), "");
			}else{
				nuevoNombre = nombre.replace(this.cadenaBuscar.getText(), this.cadenaReemplazar.getText());
			}

		}else{
			if(this.cadenaReemplazar.getText().length() == 0) {
				nuevoNombre = nombre.replaceAll(this.cadenaBuscar.getText(), "");
			}else{
				nuevoNombre = nombre.replaceAll(this.cadenaBuscar.getText(), this.cadenaReemplazar.getText());
			}
		}

		return nuevoNombre;
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {
		frame = new JFrame();
		frame.setBounds(100, 100, 450, 300);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		JButton btnCambiar = new JButton("Cambiar");
		btnCambiar.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				
				leerArchivos ();
				ejecutarCambios();
				
			}
		});
		btnCambiar.setBounds(168, 202, 117, 29);
		frame.getContentPane().add(btnCambiar);
		
		cadenaBuscar = new JTextField();
		cadenaBuscar.setBounds(60, 151, 134, 28);
		frame.getContentPane().add(cadenaBuscar);
		cadenaBuscar.setColumns(10);
		
		cadenaReemplazar = new JTextField();
		cadenaReemplazar.setBounds(255, 151, 134, 28);
		frame.getContentPane().add(cadenaReemplazar);
		cadenaReemplazar.setColumns(10);
		
		formato = new JTextField();
		formato.setBounds(151, 65, 134, 28);
		frame.getContentPane().add(formato);
		formato.setColumns(10);
		
		JLabel lblCadenaABuscar = new JLabel("Cadena a Buscar");
		lblCadenaABuscar.setHorizontalAlignment(SwingConstants.CENTER);
		lblCadenaABuscar.setBounds(60, 127, 134, 16);
		frame.getContentPane().add(lblCadenaABuscar);
		
		JLabel lblCadenaAReemplazar = new JLabel("Cadena a Reemplazar");
		lblCadenaAReemplazar.setBounds(255, 123, 134, 16);
		frame.getContentPane().add(lblCadenaAReemplazar);
		
		JLabel lblFormato = new JLabel("Formato");
		lblFormato.setHorizontalAlignment(SwingConstants.CENTER);
		lblFormato.setBounds(187, 42, 61, 16);
		frame.getContentPane().add(lblFormato);
		
		JButton btnDeshacer = new JButton("Deshacer");
		btnDeshacer.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				deshacerCambios();
			}
		});
		btnDeshacer.setBounds(168, 243, 117, 29);
		frame.getContentPane().add(btnDeshacer);
	}
}
