import java.awt.EventQueue;
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JTextField;
import javax.swing.JLabel;
import javax.swing.SwingConstants;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

public class Main {

	private JFrame frame;
	private JTextField cadenaBuscar;
	private JTextField cadenaReemplazar;
	private JTextField terminaEn;
	private Controlador controlador;

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

		//iniciamos el controlador
		controlador = new Controlador();
		//iniciamos la vista
		initialize();
	}

	/**
	 * Initialize the contents of the frame.
	 */
	private void initialize() {

		frame = new JFrame();
		frame.setBounds(0, 0, 350, 280);
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.getContentPane().setLayout(null);
		
		/************ labels ************/

		JLabel lblTerminaEn = new JLabel("Termina En");
		lblTerminaEn.setHorizontalAlignment(SwingConstants.CENTER);
		lblTerminaEn.setBounds(15, 15, 150, 15);
		frame.getContentPane().add(lblTerminaEn);

		JLabel lblCadenaABuscar = new JLabel("Cadena a Buscar");
		lblCadenaABuscar.setHorizontalAlignment(SwingConstants.CENTER);
		lblCadenaABuscar.setBounds(15, 85, 150, 15);
		frame.getContentPane().add(lblCadenaABuscar);
		
		JLabel lblCadenaAReemplazar = new JLabel("Cadena a Reemplazar");
		lblCadenaAReemplazar.setHorizontalAlignment(SwingConstants.CENTER);
		lblCadenaAReemplazar.setBounds(15, 150, 150, 15);
		frame.getContentPane().add(lblCadenaAReemplazar);

		/************ texts fields ************/

		terminaEn = new JTextField();
		terminaEn.setBounds(15, 35, 150, 30);
		frame.getContentPane().add(terminaEn);
		terminaEn.setColumns(10);

		cadenaBuscar = new JTextField();
		cadenaBuscar.setBounds(15, 105, 150, 30);
		frame.getContentPane().add(cadenaBuscar);
		cadenaBuscar.setColumns(10);
		
		cadenaReemplazar = new JTextField();
		cadenaReemplazar.setBounds(15, 175, 150, 30);
		frame.getContentPane().add(cadenaReemplazar);
		cadenaReemplazar.setColumns(10);
		
		/************ botones ************/

		JButton btnCambiarPrimero = new JButton("Cambiar Primero");
		btnCambiarPrimero.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				controlador.reemplazar (false, 
										cadenaBuscar.getText(), 
										cadenaReemplazar.getText(), 
										terminaEn.getText());
			}
		});
		btnCambiarPrimero.setBounds(180, 35, 150, 30);
		frame.getContentPane().add(btnCambiarPrimero);

		JButton btnCambiarTodo = new JButton("Cambiar Todo");
		btnCambiarTodo.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				
				controlador.reemplazar (true, 
										cadenaBuscar.getText(), 
										cadenaReemplazar.getText(), 
										terminaEn.getText());
				
			}
		});
		btnCambiarTodo.setBounds(180, 70, 150, 30);
		frame.getContentPane().add(btnCambiarTodo);

		JButton btnEliminarPrimero = new JButton("Eliminar Primero");
		btnEliminarPrimero.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {

				controlador.eliminar (false, 
									  cadenaBuscar.getText(), 
									  terminaEn.getText());
				
			}
		});
		btnEliminarPrimero.setBounds(180, 105, 150, 30);
		frame.getContentPane().add(btnEliminarPrimero);

		JButton btnEliminarTodos = new JButton("Eliminar Todos");
		btnEliminarTodos.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				
				controlador.eliminar (true, 
									  cadenaBuscar.getText(), 
									  terminaEn.getText());

			}
		});
		btnEliminarTodos.setBounds(180, 140, 150, 30);
		frame.getContentPane().add(btnEliminarTodos);

		JButton btnFormatearMayusculas = new JButton("For. Mayusculas");
		btnFormatearMayusculas.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				controlador.ponerEnMayusculas (terminaEn.getText());
			}
		});
		btnFormatearMayusculas.setBounds(180, 175, 150, 30);
		frame.getContentPane().add(btnFormatearMayusculas);

		JButton btnNumerar = new JButton("Numerar");
		btnNumerar.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				controlador.numerar (terminaEn.getText());
			}
		});
		btnNumerar.setBounds(180, 210, 150, 30);
		frame.getContentPane().add(btnNumerar);

		JButton btnDeshacer = new JButton("Deshacer");
		btnDeshacer.addMouseListener(new MouseAdapter() {
			@Override
			public void mouseClicked(MouseEvent e) {
				controlador.deshacer ();
			}
		});
		btnDeshacer.setBounds(15, 220, 150, 30);
		frame.getContentPane().add(btnDeshacer);
		
	}
}
