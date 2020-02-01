window.onload = init;
let cm;
function init() {
    // Crear la instancia de contact manager
    cm = new ContactManager();

    cm.addTestData();
    cm.printContactsToConsole();

    // Mostrar contacts en una tabla
    // Pasar el id del elemento html que contendrá la tabla
    cm.displayContactsAsATable("contacts");
}

function formSubmitted() {
    // Cargar los elementos desde el input field
    let nombre = document.querySelector("#nombre");
    let email = document.querySelector("#email");
    let telefono = document.querySelector("#fono");
    let ci = document.querySelector("#ci");
    let edad = document.querySelector("#edad")
    let curri = document.querySelector(".comentario")
    let newContact = new Contact(nombre.value, email.value, telefono.value, ci.value, edad.value, curri.value);
    cm.add(newContact);

    // limpiamos los inputs
    nombre.value = "";
    email.value = "";
    telefono.value = "";
    ci.value = "";
    edad.value = "";
    curri.value = "";
    // actualizamos nuestra tabla
    cm.displayContactsAsATable("contacts");

    return false;
}

class Contact {
    constructor(name, email, telefono, ci, edad, curri) {
        this.name = name;
        this.email = email;
        this.telefono = telefono;
        this.ci = ci;
        this.edad = edad;
        this.curri = curri;
    }
}
class ContactManager {
    constructor() {

        this.listOfContacts = [];
    }

    addTestData() {    // este metodo para añadir los datos
        let c1 = new Contact("Oscar Valentine", "jimi@rip.com", "4556789", "78456456234", "32", "cualquier cosa");

        this.add(c1);

        // Llamamos al método ordenar
        this.sort();
    }

    add(contact) {
        this.listOfContacts.push(contact);
    }

    remove(contact) {
        for (let i = 0; i < this.listOfContacts.length; i++) {
            let c = this.listOfContacts[i];

            if (c.email === contact.email) {

                this.listOfContacts.splice(i, i);

                break;
            }
        }
    }

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
        this.listOfContacts.forEach(function (c) {
            console.log(c.name);
        });
    }

    load() {
        if (localStorage.contacts !== undefined) {

            this.listOfContacts = JSON.parse(localStorage.contacts);
        }
    }

    save() {

        localStorage.contacts = JSON.stringify(this.listOfContacts);
    }

    displayContactsAsATable(idOfContainer) {

        let container = document.querySelector("#" + idOfContainer);
        container.innerHTML = "";


        if (this.listOfContacts.length === 0) {
            container.innerHTML = "<p>No hay contactos en la lista!</p>";

            return;
        }

        let table = document.createElement("table");

        this.listOfContacts.forEach(function (currentContact) {

            let row = table.insertRow();

            row.innerHTML = "<td>" + currentContact.name + "</td>"
                + "<td>" + currentContact.email + "</td>"
                + "<td>" + currentContact.telefono + "</td>"
                + "<td>" + currentContact.ci + "</td>"
                + "<td>" + currentContact.edad + "</td>"
                + "<td>" + currentContact.curri + "</td>"
        });

        // Agregar la tabla al div
        container.appendChild(table);
    }
}