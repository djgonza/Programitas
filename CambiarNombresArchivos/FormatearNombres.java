public class FormatearNombres {

	private String cadena;
	private String cadenaBuscar;
	private String cadenaReemplazar;

	public FormatearNombres (){
		
	}

	public FormatearNombres (String cadena){
		this.cadena = cadena;
	}

	public FormatearNombres (String cadena, String cadenaBuscar, String cadenaReemplazar) {
		this.cadena = cadena;
		this.cadenaBuscar = cadenaBuscar;
		this.cadenaReemplazar = cadenaReemplazar;
	}

	/*************************************************************************/

	//getters

	public String getCadena () {
		return this.cadena;
	}

	public String getCadenaBuscar () {
		return this.cadenaBuscar;
	}

	public String getCadenaReemplazar () {
		return this.cadenaReemplazar;
	}

	//setters

	public void setCadena (String cadena) {
		this.cadena = cadena;
	}

	public void setCadenaBuscar (String cadenaBuscar) {
		this.cadenaBuscar = cadenaBuscar;
	}

	public void setCadenaReemplazar (String cadenaReemplazar) {
		this.cadenaReemplazar = cadenaReemplazar;
	}

	/*************************************************************************/

	//reemplaza la primera cadena por la segunda en la posicion asignada
	public void reemplazarPorPosicion (int posicion) {

		if(posicion>=0)
			cadena = cadena.substring(0, posicion) + 
					cadenaReemplazar +
					cadena.substring(posicion+cadenaBuscar.length(), cadena.length());

	}

	//reemplaza la primera cadena por la segunda todas las coincidencias
	public void reemplazarTodasCadenas () {

		for (int i = -1; (i = cadena.indexOf(cadenaBuscar, i+1)) != -1;) {
			reemplazarPorPosicion (i);
		}
	}

	/*************************************************************************/

	//elimina el primer caracter en la posicion asignada
	public void eliminarPorPosicionCaracter (int posicion) {

		if(posicion>=0)
			cadena = cadena.substring (0, posicion) + 
					 cadena.substring (
						posicion+cadenaBuscar.length(), 
						cadena.length()
					 );

	}

	//busca todos los caracteres de una cadena y los elimina
	public void eliminarTodosCaracteres () {
		for (int i = -1; (i = cadena.indexOf(cadenaBuscar, i+1)) != -1;) { 
			eliminarPorPosicionCaracter(i);
		}
	}

	/*************************************************************************/

	//pone la primera letra de una cadena en mayusculas
	public void ponerMayusculas (String terminaEn) {

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
			if(!a.isLetter(a) && !a.equals('.')){

				//comprovamos si el actual es letra
				if(c.isLetter(c)){

					//ponemos el caracter en mayusculas
					cadena = cadena.substring(0, i) + 
						c.toString().toUpperCase() + 
						cadena.substring(i+1, cadena.length()
						);

				}

			}

		}

	}

	/*************************************************************************/

	//recive un numero y lo pone al principio de la cadena
	public void numerarCadena (int numero) {

		cadena = String.format("%02d %s", numero, cadena);

	}

	/*************************************************************************/

	public static void main(String[] args) {

		String cadena = "esto [ES UNA] [cadena}.{con}.MUCHOS (caracteres).mp3";

		FormatearNombres demo = new FormatearNombres(cadena);

		//demo.eliminarCaracteresConflictivos();
		//System.out.println(demo.cadena);

		//demo.ponerMayusculas(".mp3");
		//System.out.println(demo.cadena);

		//demo.setCadenaBuscar("[ES UNA]");
		//demo.setCadenaReemplazar("es una");
		//demo.eliminarPorPosicionCaracter ();


		//demo.setCadenaBuscar("[ES UNA]");
		//demo.setCadenaReemplazar("es una");
		//demo.reemplazarTodasCadenas();
		//System.out.println(demo.cadena);

		//demo.numerarCadena(100);
		//System.out.println(demo.cadena);

	}

}