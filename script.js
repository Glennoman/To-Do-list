// retrieve todo from local storage or initialize an empty array

// retrieve a value from the browser's local storage associated 
// with the key "todo" or todo stays empty []
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("counter-container span");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize button functionalities
document.addEventListener("DOMContentLoaded", function () {
    addButton.addEventListener("click", addTodo);
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addTodo();
        } 
    })
    deleteButton.addEventListener("click", removeTodo);
    displayTodos();
});

// Add a new todo calls displaytodos to update list
const addTodo = () => {
    // trim() removes excess space when registering a value
    const newTask = todoInput.value.trim();
    if(newTask !== ""){
        // Add a unique id to each todo item
        const newTodo = {
            id: Date.now(), //Using the current timestamp as unique ID
            text: newTask,
            disabled: false,
        };
        // The new todo item is added to the todo array using the push method
        todo.push(newTodo);
        saveToLocalStorage();
        todoInput.value = "";
        // displayTodos();
        displayTodos();
    }
}

const removeTodo = (id) => {
    // Find the index of the todo item with the matching id
    const index = todoInput.findindex(item => item.id === id);
    if (index !== -1) {
        // Remove the item from array
        todo.splice(index, 1);
        // Save the updated array to local storage and update list
        saveToLocalStorage();
        displayTodos();
    }
}

const toggleTask = (index) => {
    todo[index].disabled = !todo[index].disabled;
    saveToLocalStorage();
    displayTodos();
}

const displayTodos = () => {
     // Clear the existing content in the todo list container
    todoList.innerHTML = "";

    // Iterate over each item in the todo array
    todo.forEach((item) => {

        // Creating new div element to hold the todo item and its controls
        const todoContainer = document.createElement("div");
        todoContainer.classList.add("todo-container");

        // Creating checkbox for todo item
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("todo-checkbox"); // Adding to class for styling
        checkbox.checked = item.disabled; // Setting checked state based on the item's disabled property
        checkbox.addEventListener("change", () => {
            toggleTask(todo.indexOf(item)); // Toggle the task's disabled state
        });

        // Creating span element for todo text
        const todoText = document.createElement("span");
        // Setting class based on whether the item is disabled, to apply correct styling
        todoText.className = item.disabled ? "disabled" : "";
        todoText.textContent = item.text; // Seting text content of the span to the todo item's text
        // Add an event listener to the text to handle the click event
        todoText.addEventListener("click", () => {
            editTask(todo.indexOf(item));  // Edit the task when the text is clicked (assuming editTask is defined)
        });

        // Create a delete button for the todo item
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Remove"; // Set the button text
        deleteButton.classList.add("delete-button"); // Add a class for styling
        // Add an event listener to the delete button to handle the click event
        deleteButton.addEventListener("click", () => {
            removeTodo(item.id); // Remove the task when the button is clicked
        });

        // Append the checkbox, text, and delete button to the container
        todoContainer.appendChild(checkbox);
        todoContainer.appendChild(todoText);
        todoContainer.appendChild(deleteButton);

        // Append the container to the todo list
        todoList.appendChild(todoContainer);
    });
    
    // Update the todo count
    todoCount.textContent = todo.length; // Display the current number of todos
}

const saveToLocalStorage = () => {
    localStorage.setItem("todo", JSON.stringify(todo));
}