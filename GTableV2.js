(function( $ ){
    var   variablesDefecto = {
      header: null,
      indice: "Indice",
      filtro: null,
      dobleClick: null, 
      datos: null,
      idTabla: null
        };
  
    var methods = {
      
        inicializar : function(options) {
        	//Se aplican o las variables por defecto o las especificadas
          this.variables = $.extend( {}, variablesDefecto, options); 
         
          var idTabla= this.variables.idTabla;
          
          var primerDiv = '<div class="GTable-Table-div"></div>';
          var segundoDiv = '<div class="GTable-Table-Scroll"></div>';
          var tablaDiv = '<table class="GTable-Table" id="' + idTabla + '" cellspacing="0"><thead></thead><tbody></tbody></table>';
          // $("#idTabla thead")

          var tablas = $(primerDiv).append($(segundoDiv).append(tablaDiv));
          this.html(tablas);
          
          //Añadir que la cabecera de la tabla baje con el scroll
          $(".GTable-Table-Scroll").scroll(function() {
             var pixels = $(".GTable-Table-Scroll").scrollTop();
                $("#"+idTabla+" > thead > tr th").each(function() {
                   $(this).css("transform", "translateY(" + pixels + "px)");
               });
            });
          
          //Añadir cabecera a la tabla
          var header=this.variables.header;  
          if(header !=null){          
        	  methods.addHeaderAsoc.apply(this);
              }
          return this;
        },
        emptyTable : function( ) { 
            this.find('thead').html("");
            this.find('tbody').html("");
            return this;        	
        },
        refreshTable : function(datos) {
            this.find('tbody').html("");  
            this.variables.datos=datos;
            methods.addDataAsoc.apply(this);
            return this;
        },
        addDataAsoc : function(datos) {
            var fila;
            var indiceTabla=this.variables.indice;
            var filtro= this.variables.filtro;
            var cabecera= this.variables.header;
            var evento= this.variables.dobleClick;
            if(this.variables.datos !=null) datos=this.variables.datos;
            if(filtro != null || filtro != undefined){            
             datos = datos.filter(filtro);     
             if(datos.length <= 0)
                return this;
             }
             var max = datos.length;
            for (i = 0; i < max; i++) {
              fila = $('<tr data-id='+datos[i][indiceTabla]+' data-id-en-tabla='+i+'></tr>').appendTo(this.find('tbody'));              
              for (var j in cabecera) {        
                fila.append('<td>' + datos[i][j] + '</td>');        
              }
              if(evento != null)
              fila.dblclick(evento);
            }
           return this;       	       	       	
        },
        addHeaderAsoc: function(cabecera){ 
           if(this.variables.header != null)
               cabecera =this.variables.header;
            var fila = $('<tr></tr>').appendTo(this.find('thead'));
            for (var i in cabecera) {
              fila.append('<th>' + cabecera[i] + '</th>');              
            }
            return this;
        },
        
        setIndex: function(str){
        	this.variables.indice=str;        	
        },
    };
  
    $.fn.GTable = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.inicializar.apply( this, arguments );
        } else {
            $.error( 'El Metodo ' +  methodOrOptions + ' no existe en jQuery.GTable' );
        }    
    };


})( jQuery );
