window.onload= init;   // hace que se ejecute el método init al cargarse la ventana

let cm; // cm es una variable global

function init() { 
	// Crear la instancia de contact manager
	cm = new ContactManager();
	
  	cm.addTestData();
  	cm.printContactsToConsole();

	// Mostrar contacts en una tabla
	// Pasar el id del elemento html que contendrá la tabla
	cm.displayContactsAsATable("contacts");
}

function validar() {
	// Cargar los elementos desde el input field
	let name = document.querySelector("#nombres");
	let apellido = document.querySelector("#apellido");
	let edad = document.querySelector("#age");
	let cI = document.querySelector("#ci");
	let nivel = document.querySelector("#nivel");
	let clase = document.querySelector("#clase");
	let newContact = new Contact(name.value, apellido.value, edad.value, cI.value, nivel.value, clase.value);
	if(!cm.verifyIfIdExists(cI.value)){
		cm.add(newContact);
	}
	else{
		alert("El Ci ingresado ya existe!")
	}
	

	// Limpiar input fields
	name.value = "";
	apellido.value = "";
	edad.value = "";
	cI.value = "";
	nivel.value = "";
	clase.value = "";
	
	// actualizar la tabla
	cm.displayContactsAsATable("contacts");
	
	// evitar el HTTP
	return false;

	//validar el CI para que se ingrese nuevo estudiante
	for(let j = 1; j < cm.ContactManager.length; j++){
		var i = this.ContactManager[j];
		if(i.contact == cI){
			alert("El estudiante ya existe");
		}
		else{
			cm.add(newContact);
		}
	} 
}

function emptyList() {
	cm.empty();
  	cm.displayContactsAsATable("contacts");
}

function loadList() {
	cm.load();
  	cm.displayContactsAsATable("contacts");
}

class Contact {
	constructor(name, apellido, edad, cI, nivel, clase) {
		this.name = name;
		this.apellido = apellido;
		this.edad = edad;
		this.cI = cI;
		this.nivel = nivel;
		this.clase = clase;
	}
}



class ContactManager {
	constructor() {
		
		this.listOfContacts = [];
	}
	
	addTestData() {    // este metodo para añadir los datos
		let c1 = new Contact("Carther", "Gomez", "15", "769021", "libre", "Inicial");
  		let c2 = new Contact("Maylen", "Rivera", "20", "396570", "mariposa", "Clup");
  		let c3 = new Contact("Cristian", "Mora", "12", "418953", "espalda", "Inicial");
  		let c4 = new Contact("Vaiolet", "Salazar", "10", "106673", "mariposa", "Sesión");
		
		this.add(c1);
		this.add(c2);
		this.add(c3);
		this.add(c4);
		
		// Llamamos al método ordenar
		this.sort();
	}

	

	
	empty() {
		this.listOfContacts = [];
	}
	
	add(contact) {
		this.listOfContacts.push(contact);
	}
	
	verifyIfIdExists(newId) {
		this.listOfContacts.forEach(oldId => {
			if (oldId.cI == newId){
				return true;
			}
			else{
				return false;
			}
		
		})
	}
	/*remove(contact){
		var band = 1;
		for(var i = 0; i < this.ContactManager.length; i++){
			var e = this.ContactManager[i];
			if(e.estudiantess == contact){
				this.ContactManager.splice(i,i);
				cm.Contact();
				band = 0;
			}
		}
		if(band == 1){
			alert("Con el Nombre ingresado no existe ningun estudiante registrado");
		}
	}*/
	
	sort() {
		
		this.listOfContacts.sort(ContactManager.compareByName);
	}
	
	
	static compareByName(c1, c2) {
		
		if (c1.name < c2.name)
     		return -1;
		
    	if (c1.name > c2.name)
     		return 1;
  
    	return 0;
	}
	
	printContactsToConsole() {
		this.listOfContacts.forEach(function(c) {
			console.log(c.name);
		});
	}
	
	load() {
		if(localStorage.contacts !== undefined) {
			
			this.listOfContacts = JSON.parse(localStorage.contacts);
		}
	}
	
	save() {
		
		localStorage.contacts = JSON.stringify(this.listOfContacts);
	} 
	
  	displayContactsAsATable(idOfContainer) {
		
    	let container = document.querySelector("#" + idOfContainer);
    	container.innerHTML = "";

		
		if(this.listOfContacts.length === 0) {
			container.innerHTML = "<p>No hay estudiantes en la lista!</p>";
			
			return;
		}  
  
    	// Crear la tabla con usuarios
    	let table = document.createElement("table");
          
    	// Ciclo para cada usuario
    	this.listOfContacts.forEach(function(currentContact) {
        	// creates a row
        	let row = table.insertRow();
        
			row.innerHTML = "<td>" + currentContact.name + "</td>"
							+ "<td>" + currentContact.apellido + "</td>"
							+ "<td>" + currentContact.edad + "</td>"
							+ "<td>" + currentContact.cI + "</td>"
							+ "<td>" + currentContact.nivel + "</td>"
							+ "<td>" + currentContact.clase + "</td>"
     	});
  
     	// Agregar la tabla al div
     	container.appendChild(table);
	}
}

/*function borrar(){
	let estudiantess = document.getElementById("#nombres");
	if(estudiantess.value != ''){
		cm.remove(estudiantess.value);
	}
	else{
		alert("El campo NOMBRE no tiene que estar vacio!!");
	}
}*/