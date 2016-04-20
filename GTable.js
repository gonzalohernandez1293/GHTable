(function($) {

  var HEADER;
  var INDICE;
  var TABLA; /* Tabla es el DIV que contiene todo */
  var IDTABLA;  
  public = {};

  public.setIndex = function(str){
    INDICE=str;  
  };
  
  /* Añadir Cabecera asociativa */
  public.addHeaderAsoc = function(cabecera) {
    HEADER = cabecera;
    var fila = $('<tr></tr>').appendTo($(TABLA).find('thead'));
    for (var i in cabecera) {
      fila.append('<th>' + cabecera[i] + '</th>');
    }

  };

  /* Añadir array de datos asociativo */
  public.addDataAsoc = function(datos,filtro,evento) {
    var fila;
    if(filtro != null || filtro != undefined){
     datos =datos.filter(filtro);     
     if(datos.length <= 0)
        return;
     }
     var max = datos.length;
    for (i = 0; i < max; i++) {
     /* if(filtro != null || filtro != undefined){
         if(!filtro(datos[i]))
          continue;         
      }*/
      fila = $('<tr data-id='+datos[i][INDICE]+' data-id-en-tabla='+i+'></tr>').appendTo($(TABLA).find('tbody'));              
      for (var j in HEADER) {        
        fila.append('<td>' + datos[i][j] + '</td>');        
      }
      fila.dblclick(evento);
    }
   return;
  };
  
  public.refreshTable= function (datos,filtro,evento){
     $(TABLA).find('tbody').html("");     
     public.addDataAsoc(datos,filtro,evento);
     
  }
  
  /*Vaciar Tabla*/
  public.emptyTable = function(){
     $(TABLA).find('thead').html("");
     $(TABLA).find('tbody').html("");
     return;
  }  
  
  /* Constructor */
  $.fn.GTable = function(idTabla) {
    var primerDiv = '<div class="GTable-Table-div"></div>';
    var segundoDiv = '<div class="GTable-Table-Scroll"></div>';
    var tablaDiv = '<table class="GTable-Table" id="' + idTabla + '" cellspacing="0"><thead></thead><tbody></tbody></table>';
    //$("#idTabla thead")  

    var tablas = $(primerDiv).append($(segundoDiv).append(tablaDiv));
    this.html(tablas);
    TABLA = this;
    $(".GTable-Table-Scroll").scroll(function() {
       var pixels = $(".GTable-Table-Scroll").scrollTop();
          $("#"+idTabla+" > thead > tr th").each(function() {
             $(this).css("transform", "translateY(" + pixels + "px)");
         });
      });
    IDTABLA=idTabla;
    return public;
  } 
  
}(jQuery));