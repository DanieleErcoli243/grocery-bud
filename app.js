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
    element.setAttributeNode(attr);
    // creo il contenuto dell'elemento
    element.innerHTML = `<p class="title">${value}</p>
          <div class="btn-container">
            <button type="button" class="edit-btn">
              <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
              <i class="fas fa-trash"></i>
            </button>
          </div>`;
    // seleziono i bottoni per la modifica e la cancellazione
    const deleteBtn = element.querySelector('.delete-btn');
    const editBtn = element.querySelector('.edit-btn');
    // aggancio un ascoltatore di eventi ai bottoni e passo delle funzioni non anonime
    deleteBtn.addEventListener('click', deleteItem);
    editBtn.addEventListener('click', editItem);

    // appendo l'elemento al genitore
    list.appendChild(element);
    // mostro l'alert
    displayAlert('item successfully added to the list', 'success');
    // mostro anche il container
    container.classList.add('show-container');
    // salvo su local storage
    addToLocalStorage(id, value);
    // ripristino il comportamento di base
    setBackToDefault();

  } else if (value && isEdited) {
    // assegno all'elemento da modificare il valore dell'input
    editElement.innerHTML = value;
    // invoco la funzione per mostrare l'alert 
    displayAlert('L\'elemento è stato modificato', 'success');
    // invoco al funzione per modificare il dato in local storage
    editLocalStorage(editId, value);
    // invoco la funzione per ripristinare lo stato iniziale
    setBackToDefault();

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

// funzione per ripristinare il comportamento di base
const setBackToDefault = () => {
  // riassegno i valori delle variabili per ripristinare lo stato iniziale
  grocery.value = '';
  isEdited = false;
  editId = '';
  submitBtn.innerText = 'Submit';
};

// funzione per svuotare la lista

const clearList = () => {

  // seleziono tutti gli elementi della lista
  const items = document.querySelectorAll('.grocery-item');
  // stabilisco le condizioni per eliminare gli elementi
  if (items.length > 0) {
    // ciclo sugli elementi per accedere a ognuno di loro
    items.forEach(item => {
      // rimuovo l'elemento
      list.removeChild(item);
    });
    // rimuovo la classe che mostra il container
    container.classList.remove('show-container');
    // mostro l'alert
    displayAlert('The list is empty', 'success');
    // ripristino lo stato iniziale
    setBackToDefault();
    // rimuovo la list da local storage
    // localStorage.removeItem(list));
  };
};

// funzioni per cancellare e per modificare gli elementi della lista
const deleteItem = (e) => {
  // uso l'evento per risalire al elemento genitore e lo salvo in una variabile
  const element = e.currentTarget.parentElement.parentElement;
  // salvo l'id dell'elemento in una variabile
  const id = element.dataset.id;
  // rimuovo l'elemento
  list.removeChild(element);
  // stabilisco le condizioni per nascondere il container
  if (list.children.length === o) {
    container.classList.remove('show-container');
  };
  // mostro l'alert
  displayAlert('the item has been deleted successfully', 'success');
  // ripristino lo stato iniziale
  setBackToDefault();
  // rimuovo l'elemento da local storage
  // removeFromLocalStorage(id);
};

const editItem = () => {
  // uso l'evento per risalire al elemento genitore e lo salvo in una variabile
  const element = e.currentTarget.parentElement.parentElement;
  // assegno dei valori alle variabili create per la modifica
  editElement = e.currentTarget.parentElement.previousElementSibling;
  // imposto questo elemento come valore dell'input
  grocery.value = editElement.innerHTML;
  // metto a true il valore della variabile d'appoggio 
  isEdited = true;
  // assegno un valore all'id da modificare
  editId = element.dataset.id;
  // modifico il testo nel bottone
  submitBtn.innerText = 'Edit';
};

// ****** LOCAL STORAGE **********
// creo una funzione per salvare il dato su Local Storage

const addToLocalStorage = (id, value) => {
  // creo una variabile per salvare un oggetto con le proprietà dell'elemento
  const grocery = { id, value };
  // creo una variabile che contenga un array degli elementi della lista
  let items = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];
  // aggiungo il valore dell'elemento all'array
  items.push(grocery);
  // uso il metodo per aggiungere il metodo a local storage
  localStorage('list', JSON.stringify(items));

};
// creo una funzione per togliere il dato da local storage
const removeFromLocalStorage = (id) => {

};

// creo una funzione per modificare local storage
const editLocalStorage = (editId, value) => {

};

// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');

const form = document.querySelector('.grocery-form');

const grocery = document.getElementById('grocery');

const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option

let editElement;
let isEdited = false;
let editId = '';

// ****** EVENT LISTENERS **********

// aggancio un ascoltatore di eventi al form
form.addEventListener('submit', addItem);

// aggancio un ascoltatore di eventi al bottone per svuotare la lista

clearBtn.addEventListener('click', clearList);


// ****** SETUP ITEMS **********
