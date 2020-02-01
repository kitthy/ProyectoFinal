window.onload = init;
let eq;

function init(){
    eq = new NivelesLista();

    // CARGAR DATOS INICIALES
    eq.datosIniciales();
    // MOSTRAR LA LISTA DE EQUIPOS EN CONSOLA
    eq.mostrarNiveles();
}

class Niveles{
    constructor(codigo, nombre, carril, turno, instructor){
        this.codigo = codigo;
        this.nombre = nombre;
        this.carril = carril;
        this.turno = turno;
        this.instructor = instructor;
    }
}

class NivelesLista{
    constructor(){
        this.listaNiveles= [];
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
        this.listaNiveles.push(equipo);
    }

    // CARGAR DATOS INICIALES
    datosIniciales(){
    var eq1 = new Niveles("n1", "crol", "carril1", "mañana", "Martin Fuentes");
    var eq2 = new Niveles("n2", "braza", "carril2", "mañana", "Martin Fuentes");
        // Insertar datos del nivel en listaNiveles
    eq.add(eq1); 
    eq.add(eq2);
        
    }
    
    // MÉTODO ELIMINAR DATOS
	eliminar(cod) {
        var band =1;
        for (var i=0; i<this.listaNiveles.length; i++){
            var e = this.listaNiveles[i];
            if (e.codigo == cod){
                this.listaNiveles.splice(i,1);
                eq.mostrarNiveles();
                band =0;
            }
        }
        if (band == 1){
            alert("No existe ningun nivel registrado con ese codigo!!!");
        }
    }
    
    // MÉTODO PARA MOSTRAR O EDITAR DATOS EN LOS INPUTS
	mostrar(cod) {
        var band =1;
        for (var i=0; i<this.listaNiveles.length; i++){
            var e = this.listaNiveles[i];
            if (e.codigo == cod){
                let codigo = document.querySelector("#codigo");
                let nombre = document.querySelector("#nombre");
                let carril = document.querySelector("#carril");
                let turno = document.querySelector("#turno");
                let instructor = document.querySelector("#instructor");

                codigo.value = e.codigo;
                nombre.value = e.nombre;
                carril.value = e.carril;
                turno.value = e.turno;
                instructor.value = e.instructor;
                
                band =0;
            }
        }
        if (band == 1){
            alert("Con el código ingresado no existe!!!");
        }
    }

    // METODO para modificar DATOS INVENTARIO
    modificar(cod, nombre, carril, turno, instructor){
        for (var i=0; i<this.listaNiveles.length; i++){
            var e = this.listaNiveles[i];
            if (e.codigo == cod){
                e.nombre = nombre;
                e.carril = carril;
                e.turno = turno;
                e.instructor = instructor;
            }
        }
    }

    // MÉTODO para MOSTRAR LOS NIVELES EN una tabla
    mostrarNiveles(){
        let contenedor = document.querySelector("#contenido");
        contenedor.innerHTML= "";

        let table1 = document.createElement("table");
        let row = table1.insertRow();
        row.innerHTML = "<td>CODIGO </td>" + "<td> NOMBRE DEL ESTILO </td>" + "<td> CARRIL</td>" + "<td> TURNO </td>" + "<td> INSTRUCTOR </td>";

    	this.listaNiveles.forEach(function(NivelActual) {
        	// creamos una fila
        	let row = table1.insertRow();
        
            row.innerHTML = "<td>" + NivelActual.codigo + "</td>"
                            +"<td>" + NivelActual.nombre + "</td>"
							+ "<td>" + NivelActual.carril + "</td>"
							+ "<td>" + NivelActual.turno + "</td>"
                            + "<td>" + NivelActual.instructor + "</td>"
     	}); 
  
     	// Agregar la tabla al div
        contenedor.appendChild(table1); 

    }   // fin método mostrar equipos
}   // fin clase InventarioLista

function formSubmitted() {
    // Cargar los elementos desde el input field
    let codigo = document.querySelector("#codigo");
    let nombre = document.querySelector("#nombre");
	let carril = document.querySelector("#carril");
    let turno = document.getElementsByName("turno");
    let instructor = document.querySelector("#instructor");

    if(turno[0].checked){
        var turno1 = "Mañana";
    }
    else{
        var turno1 = "Tarde";
    }
    let nuevoNivel = new Niveles(codigo.value, nombre.value, carril.value, turno1, instructor.value);
    eq.add(nuevoNivel);    
	// actualizar la tabla
	eq.mostrarNiveles();
	
	// evitar el HTTP
	return false;
} 

function eliminarNivel(){
    let codigo = document.querySelector("#codigo");
    if (codigo.value != ''){
        eq.eliminar(codigo.value);
    }
    else{
        alert("El campo CODIGO no puede estar vacio!!!");
    }
}

function modificarNivel(){
    let codigo = document.querySelector("#codigo");
    if (codigo.value != ''){
        eq.mostrar(codigo.value);
    }
    else{
        alert("El campo CODIGO no puede estar vacio!!!");
    }
}
