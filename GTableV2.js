(function($) {
   var variablesDefecto = {
      header: null,
      indice: "Indice",
      filtro: null,
      dobleClick: null,
      datos: null,
      idTabla: null,
	  map: null
   };

   var methods = {

      inicializar: function(options) {
         //Se aplican o las variables por defecto o las especificadas
         this.variables = $.extend({}, variablesDefecto, options);

         var idTabla = this.variables.idTabla;

         var primerDiv = '<div class="GTable-Table-div"></div>';
         var segundoDiv = '<div class="GTable-Table-Scroll"></div>';
         var tablaDiv = '<table class="GTable-Table" id="' + idTabla + '" cellspacing="0"><thead></thead><tbody></tbody></table>';
         // $("#idTabla thead")

         var tablas = $(primerDiv).append($(segundoDiv).append(tablaDiv));
         this.html(tablas);

         //Añadir que la cabecera de la tabla baje con el scroll
         $(".GTable-Table-Scroll").scroll(function() {
            var pixels = $(".GTable-Table-Scroll").scrollTop();
            $("#" + idTabla + " > thead > tr th").each(function() {
               $(this).css("transform", "translateY(" + pixels + "px)");
            });
         });

         //Añadir cabecera a la tabla
         var header = this.variables.header;
         if (header != null) {
            methods.addHeaderAsoc.apply(this);
         }
         return this;
      },
      emptyTable: function() {
         this.find('thead').html("");
         this.find('tbody').html("");
         return this;
      },
      refreshTable: function(datos,filtro) {
         this.find('tbody').html("");         
         if (filtro != null || filtro != undefined) {
            this.variables.filtro=filtro;
         }
         this.variables.datos = datos;
         methods.addDataAsoc.apply(this);
         return this;
      },
      addDataAsoc: function(datos) {
         var fila;
         var indiceTabla = this.variables.indice;
         var filtro = this.variables.filtro;
         var cabecera = this.variables.header;
         var evento = this.variables.dobleClick;
         if (this.variables.datos != null) datos = this.variables.datos;
         if (filtro != null || filtro != undefined) {
            datos = datos.filter(filtro);
            if (datos.length <= 0)
               return this;
         }
		 if(this.variables.map != null){
			 datos.map(this.variables.map);			 
		 }
         var max = datos.length;
         for (i = 0; i < max; i++) {
            fila = $('<tr data-id=' + datos[i][indiceTabla] + ' data-id-en-tabla=' + i + '></tr>').appendTo(this.find('tbody'));
            for (var j in cabecera) {
				if(datos[i][j] == true && typeof datos[i][j] == 'boolean'){
					fila.append('<td class="GTableCell'+typeof datos[i][j]+'">✔</td>');
				}else if (datos[i][j] == false && typeof datos[i][j] == 'boolean'){
					fila.append('<td class="GTableCell'+typeof datos[i][j]+'">✗</td>');
				}else{
					fila.append('<td class="GTableCell'+typeof datos[i][j]+'">' + datos[i][j] + '</td>');
				}	
            }
            if (evento != null)
               fila.dblclick(evento);
         } 
		 this.find('thead > tr > th').unbind('click.GTable').bind('click.GTable',this,function (e){ //Ordenable		    
			var tabla= e.data;
			var arrayDatos= e.data.variables.datos;
			
			arrayDatos.sort(tabla.GTable('sortTable',$(this).attr('data-name'))); //Ordenar los datos (ascendente)
			var encontradoPrimero= tabla.find('thead > tr > th > span.ui-icon-triangle-1-s');
			var encontradoSegundo= tabla.find('thead > tr > th > span.ui-icon-triangle-1-n');
			if(encontradoPrimero){
				//Ya estaba ordenado, ver si es la misma columna
				if(encontradoPrimero == $(this)){ //misma columna, cambiar orden
					$(this).find('span').removeClass('ui-icon-triangle-1-s').addClass('ui-icon-triangle-1-n');
					arrayDatos.reverse();
				}else{ //es otra columna, primer orden
					encontradoPrimero.removeClass('ui-icon-triangle-1-s');
					$(this).find('span').addClass('ui-icon-triangle-1-s');
				}
			}else if(encontradoSegundo){
				if(encontradoSegundo == $(this)){ //misma columna, cambiar orden
					$(this).find('span').removeClass('ui-icon-triangle-1-n').addClass('ui-icon-triangle-1-s');					
				}else{ //es otra columna, primer orden
					encontradoPrimero.removeClass('ui-icon-triangle-1-n');
					$(this).find('span').addClass('ui-icon-triangle-1-s');
				}
				
			}else{ //No se ha encontrado nada
				$(this).find('span').addClass('ui-icon-triangle-1-s');
			}
			
			tabla.GTable('refreshTable',arrayDatos);
			return;
			//ui-icon-triangle-1-s -> primero
			//ui-icon-triangle-1-n -> Segundo
		 });
         return this;
      },
	  sortTable: function(property){ 
		  
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	  },
	  
      addHeaderAsoc: function(cabecera) {
         if (this.variables.header != null)
            cabecera = this.variables.header;
         var fila = $('<tr></tr>').appendTo(this.find('thead'));
         for (var i in cabecera) {
            fila.append('<th data-name="'+i+'"><span>' + cabecera[i] + '</span></th>');
         }
         return this;
      },

      setIndex: function(str) {
         this.variables.indice = str;
      },
   };

   $.fn.GTable = function(methodOrOptions) {
      if (methods[methodOrOptions]) {
         return methods[methodOrOptions].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
         // Default to "init"
         return methods.inicializar.apply(this, arguments);
      } else {
         $.error('El Metodo ' + methodOrOptions + ' no existe en jQuery.GTable');
      }
   };


})(jQuery);