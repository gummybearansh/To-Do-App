todos = ["hello"];

render();

function deleteTodo(idx){
    todos.splice(idx, 1);
    render();
}

function render(){
    const removeContainer = document.querySelector("#todoContainer");
    document.querySelector("#bigContainer").removeChild(removeContainer);

    const container = document.createElement("div");
    container.setAttribute("id", "todoContainer");

    todos.forEach((element, idx, arr) => {
        const todoItem = document.createElement("div");
        todoItem.setAttribute("style", "display:flex;")

        const innerContent = document.createElement("h4");
        innerContent.innerHTML = element;

        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("onclick", `deleteTodo(${idx})`)
        deleteButton.innerHTML = "Delete TO DO";
        deleteButton.setAttribute("style", "height: 20px; margin-left: 30px; margin-top: 20px")

        todoItem.appendChild(innerContent);
        todoItem.appendChild(deleteButton);
        container.appendChild(todoItem);
    });

    document.querySelector("#bigContainer").appendChild(container);
}

function addTodo(){
    todos.push(document.querySelector("#inputBox").value);
    render();
}

