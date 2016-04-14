(function($) {

  var HEADER;
  var TABLA;
  public = {};

  public.addHeaderAsoc = function(cabecera) {
    header = cabecera;
    var fila = $('<tr></tr>').appendTo($(TABLA).find('thead'));
    for (var i in cabecera) {
      fila.append('<th>' + cabecera[i] + '</th>');
    }

  };

  public.addDatosAsoc = function(datos) {
    var max = datos.length;

    for (i = 0; i < max; i++) {
      var fila = $('<tr></tr>').appendTo($(TABLA).find('tbody'));
      for (var j in datos[i]) {
        fila.append('<td>' + datos[i][j] + '</td>');
      }
    }

  };
  $.fn.GTable = function(idTabla) {
    var primerDiv = '<div class="GTable-Table-div"></div>';
    var segundoDiv = '<div class="divScroll"></div>';
    var tablaDiv = '<table class="GTable-Table" id="' + idTabla + '" cellspacing="0"><thead></thead><tbody></tbody></table>';
    //$("#idTabla thead")  

    var tablas = $(primerDiv).append($(segundoDiv).append(tablaDiv));
    this.html(tablas);
    TABLA = this;
    return public;
  }
}(jQuery));
