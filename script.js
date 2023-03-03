//grab all elements 
const form = document.querySelector("[data-form]");
const list = document.querySelector("[data-list]");
const input = document.querySelector("[data-input]");

// Local Storage
class Storage {
    static addTodoStorage(todoArr) {
        let storage = localStorage.setItem("todo", JSON.stringify(todoArr));
        return storage;
    }
    static getStorage() {
        let storage = localStorage.getItem("todo") === null ? [] : JSON.parse(localStorage.getItem("todo"));
        return storage;
    }
}

// empty array
let todoArr = Storage.getStorage();

//form 
form.addEventListener("submit", (e) => {
    e.preventDefault();
    let id = Math.random() * 1000;
    const todo = new Todo(id, input.value);
    todoArr = [...todoArr, todo];
    UI.displayData();
    UI.clearInput();
    // remove from the DOM
    UI.removeTodo();
    // add to storage
    Storage.addTodoStorage(todoArr)

});

// make object instance
class Todo {
    constructor(id, todo) {
        this.id = id;
        this.todo = todo;
    }
} 

//display the todo in the DOM;
class UI {
    static displayData() {
        let displayData = todoArr.map((item) => {
            return `
            <div class="todo">
            <p>${item.todo}</p>
            <span class="remove" data-id=${item.id}>🗑️</span>
        </div>
            `
        });
        list.innerHTML = (displayData).join(" ")
    }
    static clearInput() {
        input.value = ""
    }
    static removeTodo() {
        list.addEventListener("click", (e) => {
            if (e.target.classList.contains("remove")) {
                console.log(e.target.parentElement.remove())
            }
            let btnId = e.target.dataset.id;
            // remove from Array
            UI.removeArrayTodo(btnId);

        })
    }
    static removeArrayTodo(id) {
        todoArr = todoArr.filter((item) => item.id !== +id);
        Storage.addTodoStorage(todoArr);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    UI.displayData();
    UI.removeTodo();
})