// ****** FUNCTIONS **********

const addItem = e => {
    // impedisco il comportamento del form
    e.preventDefault();
    // registro il valore dell'input
    const value = grocery.value;
    // genero un id fasullo per il nuovo elemento
    const id = new Date().toISOString();
    // imposto le condizioni per creare un nuovo elemento
    if (value && !isEdited) {
        // creo un nuovo elemento
        const element = document.createElement('article');
        // gli aggiungo una classe
        element.classList.add('grocery-item');
        // aggiungo anche un id
        const attr = document.createAttribute('data-id');
        // col valore dell'id fasullo creato sopra
        attr.value = id;
        // assegno all'element il data attribute
        element.setAttributeNode('attr');
        // creo il contenuto dell'elemento
        element.innerHTML = `<p class="title">item</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>`

    } else if (value && isEdited) {

    } else {
        // invoco la funzione per mostrare l'alert
        displayAlert('please, enter value', 'danger');
    };
};

// creo una funzione per mostrare l'alert
const displayAlert = (text, action) => {
    // imposto un messaggio per l'alert
    alert.innerText = text;
    // aggiungo una classe che colori l'alert di rosso
    alert.classList.add(`alert-${action}`);
    // imposto un tempo oltre il quale l'alert deve sparire
    setTimeout(() => {
        // svuoto il messaggio per l'alert
        alert.innerText = '';
        // rimuovo una classe che colori l'alert di rosso
        alert.classList.remove(`alert-${action}`);
    }, 5000)
};

// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');

const form = document.querySelector('.grocery-form');

const grocery = document.getElementById('grocery');

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.delete-btn');

// edit option

let editElement;
let isEdited = false;
let editId = '';

// ****** EVENT LISTENERS **********

// aggancio un ascoltatore di eventi al form
form.addEventListener('submit', addItem);

// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********
