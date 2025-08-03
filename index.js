todos = [];

function initializeState(){
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos){
        try {
            todos = JSON.parse(savedTodos);
            if (!Array.isArray(todos)){
                todos = [];
            }
        } catch (error){
            console.log("Error parsing todos from local Storage: ", error);
            todos = [];
        }
    }
}

function saveState(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

initializeState();
render();

function deleteTodo(idx){
    todos.splice(idx, 1);
    saveState();
    render();
}

function completed(idx){
    // alert(todos[idx]["completed"]);
    todos[idx]["completed"] === true ? todos[idx]["completed"] = false : todos[idx]["completed"] = true;
    saveState();
    render();
}

function render(){
    const removeContainer = document.querySelector("#todoContainer");
    document.querySelector("#bigContainer").removeChild(removeContainer);

    const container = document.createElement("div");
    container.setAttribute("id", "todoContainer");

    todos.forEach((element, idx, arr) => {
        const todoItem = document.createElement("div");
        todoItem.setAttribute("class", "todo-item")

        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("onchange", `completed(${idx})`)
        checkBox.checked = element["completed"];
 
        const innerContent = document.createElement("h4");
        innerContent.setAttribute("class", "todoText");
        if (element["completed"]){
            innerContent.setAttribute("class", "striked");
        }
        innerContent.innerHTML = element["description"];

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("onclick", `deleteTodo(${idx})`)
        deleteButton.setAttribute("class", "deleteBtn");
        deleteButton.innerHTML = "DELETE";

        todoItem.appendChild(checkBox);
        todoItem.appendChild(innerContent);
        todoItem.appendChild(deleteButton);
        container.appendChild(todoItem);
    });

    document.querySelector("#bigContainer").appendChild(container);
}


function addTodo(){
    const todo = {
        "description": document.querySelector("#inputBox").value, 
        "completed": false
    }
    todos.push(todo);
    saveState();
    render();
}

