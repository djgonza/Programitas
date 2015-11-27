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