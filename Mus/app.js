'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

var salas = new Map();

function Sala() {
	this.jugadores = new Array();
	this.lleno = false;
	
}

function crearSalas () {
	
	for (var i = 0; i < 20; i++) {
		salas.set(i, new Sala());
	}

	console.log(salas);

}

class Carta {
	
	constructor(palo, numero) {
		this.palo = palo;
		this.numero = numero;
	}

	equals (carta){
		if(this.numero == carta.numero)
			return true;
		else
			return false;
	}

	static compare (a, b){

		if(a.numero > b.numero)
			return 1;
		if(a.numero < b.numero)
			return -1;
		else
			return 0;

	}

	compareTo (carta) {

		if(this.numero > carta.numero)
			return 1;
		if(this.numero < carta.numero)
			return -1;
		else
			return 0;

	}

}

io.on('connection', function(socket){
  
	console.log('a user connected');

	socket.on('chat message', function(msg){
		console.log('message: ' + msg);
		io.emit('msg', "El mensaje");
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});

});

http.listen(3000, function(){
	console.log('listening on *:3000');
	//crearSalas();

	var a = new Carta('c', 5);
	var b = new Carta('e', 5);

	console.log(a.compareTo(b));
	a.numero = 3;
	console.log(a.compareTo(b));

});





