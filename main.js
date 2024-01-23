// Retrieve to do from local storage or initialize an empty array

// JSON.parse() -> convert string to object
let todo = JSON.parse(localStorage.getItem("todo")) || [];

const todoInput = document.getElementById("todoInput");

const todoList = document.getElementById("todoList");

const todoCount = document.getElementById("todoCount");

const addBtn = document.querySelector(".btn");

const deleteButton = document.getElementById("delete-btn");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addBtn.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Dont refresh or send to any other page
      event.preventDefault();
      addTask();
    }
  });

  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  // To get the text we write in input box
  // Trim will trim away space
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      disabled: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function deleteAllTasks() {
  // Logic
  console.log("text");
}

function displayTasks() {
  // Logic
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class = "todo-container">
      <input type = "checkbox" class = "todo-checkbox"
      id = "input-${index}" ${item.disabled ? "checked" : ""}>

      <p id = "todo-${index}" class = "${
      item.disabled ? "disabled" : ""
    }" onClick = "editTask(${index}">
      ${item.text}</p>
    </div>
    `;

    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
  todoCount.textContent = todo.length;
}

function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const exitingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = exitingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  // stringify => Object to string conversion
  localStorage.setItem("todo", JSON.stringify(todo));
}
