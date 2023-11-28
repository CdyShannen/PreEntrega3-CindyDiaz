//Variables
const input = document.querySelector(".input-btn input");
const listTasks = document.querySelector(".list-tasks ul");
const message = document.querySelector(".list-tasks");
let tasks = [];

//Evento y funcion para recuperar la info
eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    createHTML();
  });

  listTasks.addEventListener("click", deleteTask);
}

//Funcion para eliminar con el click
function deleteTask(e) {
  if (e.target.tagName == "SPAN") {
    const deleteId = parseInt(e.target.getAttribute("task-id"));
    tasks = tasks.filter((task) => task.id !== deleteId);
    createHTML();
  }
}

//Funcion para boton Eliminar Todo
function deleteAll() {
  tasks = [];
  createHTML();
}

//Funcion para eliminar tareas vacias, agregar tareas nuevas
function addTasks() {
  const task = input.value;
  if (task === "") {
    showError("Esta fila esta vacia...");
    return;
  }

  const taskObj = {
    task,
    id: Date.now(),
  };
  tasks = [...tasks, taskObj];

  createHTML();
  input.value = "";
}

//Funcion para crear HTML
function createHTML() {
  clearHTML();

  if (tasks.length > 0) {
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.innerHTML = `${task.task} <span task-id="${task.id}" >X</span>`;

      listTasks.appendChild(li);
    });
  }

  sincronizationStorage();
}

//Funcion para guardar en el Storage
function sincronizationStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Funcion para limpiar la lista
function clearHTML() {
  listTasks.innerHTML = "";
}

//Funcion para mostrar error

function showError(error) {
  const messageError = document.createElement("p");
  messageError.textContent = error;
  messageError.classList.add("error");

  message.appendChild(messageError);
  //console.log(error);
  setTimeout(() => {
    messageError.remove();
  }, 2000);
}

