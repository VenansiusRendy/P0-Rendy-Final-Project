//Data
let data = []

if(localStorage.getItem('task') === null){
    localStorage.setItem('task', JSON.stringify(data));
}else{
    data = JSON.parse(localStorage.getItem('task'))
}

// Selectors
const todoList = document.querySelector('.todo_list');
const todoInput = document.querySelector('.todo_input');
const todoButton = document.querySelector('.todo_button');
const filterOption = document.querySelector('.filter_todo');
const searchInput = document.querySelector('.search_button');

// Render List
const renderList = () => {
    data.forEach(task => {
        renderToDo(task);
    })

}

// Render data to list
const renderToDo = (data) => {
    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if(data.completed){
        todoDiv.classList.add("completedItem");
    }
    todoDiv.id = data.id;
    // Todo LI
    const newTodo = document.createElement('li');
    newTodo.innerText = data.task
    newTodo.classList.add('todo_item');
    todoDiv.appendChild(newTodo);

    //check mark BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete_btn')
    todoDiv.appendChild(completedButton);
    //delete BUTTON
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete_btn')
    todoDiv.appendChild(deleteButton);
    //Append to Actual LIST
    todoList.appendChild(todoDiv);
}

// Add to do btn
const addToDo = (e) => {
    // Prevent Default
    e.preventDefault();
    // Check if empty task
    if(todoInput.value === ""){
        return null;
    }
    // Create new task object
    const today = new Date().toLocaleDateString();
    const newTask = {
        id : data.length === undefined || data.length === 0 ? 0 : data[data.length - 1].id + 1,
        task : todoInput.value,
        date : today
    }
    // Push New Task To Data Array
    data.push(newTask);
    // Render New Data
    renderToDo(newTask);
    // Clear Input Value
    todoInput.value = "";
    localStorage.setItem('task', JSON.stringify(data));
}

const deleteCheck = (e) => {
    const item = e.target;
    let button = "";
    if(item.tagName === "BUTTON"){
        button = item;
    }else if(item.tagName === "I"){
        button = item.parentElement;
    }else{
        return null;
    }
    const todo = button.parentElement;
    const id = todo.id;
    //DELETE ITEM
    if (item.classList[0] === "delete_btn") {
        const todo = item.parentElement;
        //ANIMATION TRANSITION
        todo.classList.add("fall")
        todo.addEventListener('transitionend', function () {
            todo.remove()
        })
        for(let i = 0; i < data.length; i++){
            if(data[i].id === Number(id)){
                data.splice(i, 1);
            }
        }
    }
    //COMPLETE ITEM
    if (item.classList[0] === "complete_btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completedItem")
        for(let i = 0; i < data.length; i++){
            if(data[i].id === Number(id)){
                data[i].completed = !data[i].completed;
            }
        }
    }
    localStorage.setItem('task', JSON.stringify(data));

}

//FILTERING THE TASKS ACCORDING THE OPTION
const filterTodo = (e) => {
    const todos = todoList.childNodes;
    for(let i = 1; i<todos.length; i++ ){
        switch (e.target.value) {
            case "all":
                todos[i].style.display = "flex";
                break;
            case "completed":
                if (todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos[i].classList.contains('completedItem')) {
                    todos[i].style.display = "flex";
                } else {
                    todos[i].style.display = "none";
                }
                break;
        }
    }
} 

const search = () => {
    // Declare variables
    let filter, div, txtValue, li;
    
    filter = searchInput.value.toUpperCase();
    div = todoList.querySelectorAll(".todo");

    // Loop through all list items, and hide those who don't match the search query
    for (let i = 0; i < div.length; i++) {
        li = div[i].getElementsByTagName("li")[0];
        txtValue = li.textContent || li.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            div[i].style.display = "";
        } else {
            div[i].style.display = "none";
        }
    }
}

// Event Listeners
todoButton.addEventListener("click", addToDo)
todoList.addEventListener("click", deleteCheck)
filterOption.addEventListener("click", filterTodo)