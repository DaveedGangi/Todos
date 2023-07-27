let addBtn = document.getElementById("addBtn");
let saveBtn = document.getElementById("saveBtn");
let ulContainer = document.getElementById("ulContainer");

function getElementsFromLocalStorage() {

    let stringFiedElement = localStorage.getItem("todoList");
    let parseElement = JSON.parse(stringFiedElement);
    if (parseElement === null) {
        return [];
    } else {
        return parseElement;
    }
}
let todoList = getElementsFromLocalStorage();
let todosCount = todoList.length;
saveBtn.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));

};

function Onadd() {
    let userInput = document.getElementById("userIn");
    let userValue = userInput.value;
    if (userValue === "") {
        alert("Enter a Valid Text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAppendTodo(newTodo);
    userInput.value = "";
}
addBtn.onclick = function() {
    Onadd();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let elementIn = todoList.findIndex(function(eachObject) {
        let todoObjectIndex = "todo" + eachObject.uniqueNo;
        if (todoObjectIndex === todoId) {
            return true;
        } else {
            return false;
        }
    });

    let todoObject = todoList[elementIn];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }

}

function OnDeleteElement(todoId) {
    let todoElement = document.getElementById(todoId);
    ulContainer.removeChild(todoElement);
    let todoElementIndex = todoList.findIndex(function(eachItem) {
        let todoElementId = "todo" + eachItem.uniqueNo;
        if (todoElementId === todoId) {
            return true;
        }
        return false;
    });
    todoList.splice(todoElementIndex, 1);
}

function createAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("d-flex", "flex-row");
    ulContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.id = checkboxId;
    inputElement.type = "checkbox";
    inputElement.classList.add("CheckBoxButtonStyle");

    inputElement.checked = todo.isChecked;

    inputElement.onclick = function() {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("StyleLabelContainer", "d-flex", "flex-row");
    todoElement.appendChild(labelContainer);
    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    labelElement.classList.add("labelStyle");

    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement("div");
    deleteContainer.classList.add("delete-icon-container");
    labelContainer.appendChild(deleteContainer);
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        OnDeleteElement(todoId);
    };

    deleteContainer.appendChild(deleteIcon);

}

for (let item of todoList) {
    createAppendTodo(item);
}