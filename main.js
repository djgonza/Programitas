$(document).ready(function(){

    Array.prototype.orderByString=function(property,sortOrder,ignoreCase){
        if (sortOrder!=-1 && sortOrder!=1) sortOrder=1;
        this.sort(function(a,b){
        var stringA=a[property],stringB=b[property];
        // Si un valor es null o undefined, se convierte a cadena vacía.
        if (stringA==null) stringA = '';
        if (stringB==null) stringB = '';
        // Si ignoreCase es true, se convierten ambas variables a minúsculas.
        if (ignoreCase==true){stringA=stringA.toLowerCase();stringB=stringB.toLowerCase()}
        var res = 0;
        if (stringA<stringB) res = -1;
        else if (stringA>stringB) res = 1;
        return res*sortOrder;
        })
    }

    //recogemos los datos del JSON
    $.getJSON( "datos.json", function(data) {

        //ordenamos los datos alfabeticamente
        var registros = data.datos;
        registros.orderByString('nombre')

        //creamos el html
        var items = [];
        $.each(registros,function(key, val) {
            items.push(
                "<div>"+
                    "<span style='color: "+val.color+"'><b>"+
                        val.nombre+
                        ": "+
                    "</b></span>"+
                    val.descripcion+
                "<p /><br /></div>"
            );
        });

        //mostramos el html
        $( "<div/>", {
        "class": "lista",
        html: items.join("")
        }).appendTo( "body");
    });

});
