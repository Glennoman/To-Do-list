// retrieve todo from local storage or initialize an empty array

// retrieve a value from the browser's local storage associated 
// with the key "todo" or todo stays empty []
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
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
        todo.push({
            text: newTask,
            disabled: false,
        });
        todoInput.value = "";
        // displayTodos();
    }
}

const removeTodo = () => {

}

const toggleTask = () => {
    
}

const displayTodos = () => {
     // Clear the existing content in the todo list container
    todoList.innerHTML = "";

    // Iterate over each item in the todo array
    todo.forEach((item, index) => {

        // New paragraph element to hold todo item
        const p = document.createElement("p");

        // Set the inner HTML of the paragraph element to create a todo item container
        p.innerHTML = 
        // If item.disabled is true, the checkbox is checked
        `
        <div class="todo-container">  
            <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.disabled 
                ? "checked" : ""}>
        <p id="todo-${index} class="${item.disabled ? "disabled" : ""}>
        onclick="editTask(${index})">${item.text}</p>
        </div>
        `
        // ABOVE// p element has an onclick attribute set to call editTask(${index}) when clicked. // ABOVE //

        p.querySelector(".todo-checkbox").addEventListener("change", () => {
            toggleTask(index);
        });
        todoList.appendChild(p);
    })
}