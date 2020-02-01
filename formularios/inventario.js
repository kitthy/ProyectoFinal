window.onload = init;
let eq;

function init(){
    eq = new InventarioLista();

    // CARGAR DATOS INICIALES
    eq.datosIniciales();
    // MOSTRAR LA LISTA DE EQUIPOS EN CONSOLA
    eq.mostrarEquipos();
}

class Inventarios{
    constructor(codigo, nombre, costo, cantidad){
        this.codigo = codigo;
        this.nombre = nombre;
        this.costo = costo;
        this.cantidad = cantidad;
    }
}

class InventarioLista{
    constructor(){
        this.listaInventarios= [];
    }

    // MÉTODO PARA VALIDAR EL CODIGO INVENTARIO
    validar(cod){
        for (var i=0; i<this.listaInventarios.length; i++){
            var e = this.listaInventarios[i];
            if (e.codigo == cod){
                var mensaje = confirm("Este codigo ya esta registrado. ¿Deseas reemplazarlo?");
                if(mensaje){
                    return 2;
                }
                else{
                    return 0;
                }
            }
        }
        return 1;
    }
    // MÉTODO PARA AÑADOR EQUIPOS EN LA LISTA
    add(equipo){
        this.listaInventarios.push(equipo);
    }

    // CARGAR DATOS INICIALES
    datosIniciales(){
    var eq1 = new Inventarios("eq1", "Salvavidas", "50", "30");
    var eq2 = new Inventarios("eq2", "Gorros", "20", "50");
    var eq3 = new Inventarios("eq3", "Flotadores", "30", "50");
        // Insertar datos del equipo en listaInventarios
    eq.add(eq1); 
    eq.add(eq2);
    eq.add(eq3);
        
    }
    
    // MÉTODO ELIMINAR DATOS
	eliminar(cod) {
        var band =1;
        for (var i=0; i<this.listaInventarios.length; i++){
            var e = this.listaInventarios[i];
            if (e.codigo == cod){
                this.listaInventarios.splice(i,1);
                eq.mostrarEquipos();
                band =0;
            }
        }
        if (band == 1){
            alert("Con el código ingresado no existe ningún producto registrado!!!");
        }
    }
    
    // MÉTODO PARA MOSTRAR O EDITAR DATOS EN LOS INPUTS
	mostrar(cod) {
        var band =1;
        for (var i=0; i<this.listaInventarios.length; i++){
            var e = this.listaInventarios[i];
            if (e.codigo == cod){
                let codigo = document.querySelector("#codigo");
                let nombre = document.querySelector("#nombre");
                let costo = document.querySelector("#costo");
                let cantidad = document.querySelector("#cantidad");

                codigo.value = e.codigo;
                nombre.value = e.nombre;
                costo.value = e.costo;
                cantidad.value = e.cantidad;
                
                band =0;
            }
        }
        if (band == 1){
            alert("Con el código ingresado no existe ningún producto registrado!!!");
        }
    }

    // METODO para modificar DATOS INVENTARIO
    modificar(cod, nom, costo, cant){
        for (var i=0; i<this.listaInventarios.length; i++){
            var e = this.listaInventarios[i];
            if (e.codigo == cod){
                e.nombre = nom;
                e.costo = costo;
                e.cantidad = cant;
            }
        }
    }

    // MÉTODO para MOSTRAR LOS EQUIPOS EN una tabla
    mostrarEquipos(){
        let contenedor = document.querySelector("#contenido");
        contenedor.innerHTML= "";

        let table1 = document.createElement("table");
        let row = table1.insertRow();
        row.innerHTML = "<td> CODIGO </td>" + "<td> NOMBRE EQUIPO</td>" + "<td> COSTO UNITARIO </td>" + "<td> CANTIDAD </td>";

    	this.listaInventarios.forEach(function(equipoActual) {
        	// creamos una fila
        	let row = table1.insertRow();
        
			row.innerHTML = "<td>" + equipoActual.codigo + "</td>"
							+ "<td>" + equipoActual.nombre + "</td>"
							+ "<td>" + equipoActual.costo + "</td>"
                            + "<td>" + equipoActual.cantidad + "</td>"
     	}); 
  
     	// Agregar la tabla al div
        contenedor.appendChild(table1); 

    }   // fin método mostrar equipos
}   // fin clase InventarioLista

function formSubmitted() {
    // Cargar los elementos desde el input field
    let codigo = document.querySelector("#codigo");
	let nombre = document.querySelector("#nombre");
    let costo = document.querySelector("#costo");
    let cantidad = document.querySelector("#cantidad")
    let band = eq.validar(codigo.value);
    if (band ==1){
        let nuevoEquipo = new Inventarios(codigo.value, nombre.value, costo.value, cantidad.value);
        eq.add(nuevoEquipo);    
    }
    if (band == 2){
        eq.modificar(codigo.value, nombre.value, costo.value, cantidad.value)
        eq.mostrarEquipos();
    }

    // Limpiar los inputs
    codigo.value ="";
	nombre.value = "";
    costo.value = "";
    cantidad.value= "";
	
	// actualizar la tabla
	eq.mostrarEquipos();
	
	// evitar el HTTP
	return false;
} 

function eliminarEquipo(){
    let codigo = document.querySelector("#codigo");
    if (codigo.value != ''){
        eq.eliminar(codigo.value);
    }
    else{
        alert("El campo CODIGO no puede estar vacio!!!");
    }
}

function modificarEquipo(){
    let codigo = document.querySelector("#codigo");
    if (codigo.value != ''){
        eq.mostrar(codigo.value);
    }
    else{
        alert("El campo CODIGO no puede estar vacio!!!");
    }
}
