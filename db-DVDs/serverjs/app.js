// importar
var express = require('express');
 
// instanciar
var app = express();
 
// ruteo
app.get('/', function(req, res){
	console.log("Peticion /");
  res.sendfile(__dirname + '/public/index.html');
});

app.use(express.static(__dirname + '/public'));
 
// escuchar
app.listen(9000);
 
console.log("Servidor escuchando en el puerto 9000", app.settings.env);