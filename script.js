// lists array to contain our lists with name and todos

const lists = localStorage.getItem("lists") ? JSON.parse(localStorage.getItem("lists")): {};

let currentListId = localStorage.getItem("currentListId") ?? '';

    function saveToLocalStorage () {

        localStorage.setItem("currentListId", JSON.stringify(currentListId));

        localStorage.setItem("lists", JSON.stringify(lists));

    }

    render();


    // added click function when user clicks button it will grab value from
    // text box and append a new list -- and add it to the array

    document.getElementById('addNewList').addEventListener('click', addList);


    function guidGenerator() {
        var S4 = function() {
           return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return 'a' + (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }


    function addList() {

        let newName = document.getElementById('textNameList').value; //

        if (newName in lists) {

            console.error('List already exists')

        } else {

            let newLI = document.createElement('li');

            let i = document.createElement('i');

            let id = guidGenerator();
            i.innerHTML = '<i class="fa-solid fa-trash-can" id="trashCan" style="color: #006efd;"></i>';

            newLI.classList.add("list-group-item");

            newLI.classList.add("d-flex");

            newLI.classList.add("justify-content-between");

        
            newLI.id = id;

            newLI.textContent = newName;

            
            lists[id] = {

                name: newName,
                todos: {}

            };

            document.getElementById('lists').appendChild(newLI).appendChild(i);
            let trashCanElement = document.getElementById('lists') 
            .getElementsByTagName('li')
            .namedItem(id)
            .getElementsByTagName('i') 
            .item(0);
            bindClickOnListTrashCan(trashCanElement,id);
                
        }
        saveToLocalStorage();
    }

    function bindClickOnListTrashCan(trashCanElement,id) {

        trashCanElement.addEventListener('click', function(event) {

            event.target.parentElement.parentElement.remove();

            delete lists[id];
            currentListId = "";
            document.getElementById('headerList').textContent = "";
            saveToLocalStorage();

    });

    }
    //update Select a list to view to selected list via click event & Display their Items



    document.getElementById('lists').addEventListener('click', function(event) {

        if(event.target.tagName === 'LI') {
            
            let clickedListText = event.target.textContent;
            let listId = event.target.id;

            document.getElementById('headerList').textContent = clickedListText;

            currentListId = listId;

            renderTodos();
        }

    });


    //Created function to grab input value in text box when add item btn 
    //is clicked and will append to the selected array for todos in object

    document.getElementById('addTodo').addEventListener('click', addNewTodo);


function addNewTodo () {

    if (currentListId) {
        let todoId = guidGenerator();
        let newTodoItemAdded = {
            name: document.getElementById('textTodo').value,
            completed: false
        };

        let currentSelectedTodos = lists[currentListId].todos;
        currentSelectedTodos[todoId] = newTodoItemAdded;
        
        saveToLocalStorage();
        renderTodos();
    } else {
        alert('Select a Todo List')
    }

}


/******
*
Render Functions
*
*******/
function render() {
    renderListsOfTodoList();
    renderTodos();
}

function renderListsOfTodoList() {
    let listsHtml = '';
    // iterate through the lists to get their names
    for (let [id, {name}] of Object.entries(lists)) {
        listsHtml += `<li class="list-group-item d-flex justify-content-between" id="${id}">${name}<i><i class="fa-solid fa-trash-can" id="trashCan" style="color: #006efd;"></i></i></li>`;
    }
    document.getElementById('lists').innerHTML = listsHtml;

    for (let [id] of Object.entries(lists)) {
        let trashCanElement = document.querySelector("#" + id).querySelector("#trashCan");
        bindClickOnListTrashCan(trashCanElement, id);
    }
}

function renderHeader() {
    document.getElementById('headerList').innerText = lists[currentListId]?.name ?? '';
}

function renderTodos() {
    let todoItems = lists[currentListId]?.todos ?? {};

    let todoContainer = document.getElementById('todos');

    todoContainer.innerHTML = '';

    Object.entries(todoItems).forEach(function([todoId, {name, completed}]) {

        let todoLi = document.createElement('li');

        todoLi.textContent = name;

        todoLi.classList.add("list-group-item");

        todoLi.classList.add("d-flex");

        todoLi.classList.add("justify-content-between");

        todoLi.setAttribute('id', todoId);

        todoContainer.appendChild(todoLi);

        let i = document.createElement('i');

        i.setAttribute('class', 'fa-solid fa-trash-can');

        i.setAttribute('id', 'trashCanTodo');

        i.setAttribute('style', 'color: #006efd;');

        let iedit = document.createElement('i')

        iedit.setAttribute('class', 'fa-solid fa-pencil');

        iedit.setAttribute('id', 'editTodo');

        iedit.setAttribute('style', 'color: #006efd;');

        let checkBox = document.createElement('input')
        checkBox.setAttribute('type', 'checkBox');

        checkBox.addEventListener('change', function () {
            if (checkBox.checked) {

                todoLi.setAttribute('style', 'text-decoration: line-through;');

            } else {

                todoLi.setAttribute('style', 'text-decoration: none;');
                

            }

        });

        todoContainer.appendChild(todoLi);
        todoLi.appendChild(checkBox);
        todoLi.appendChild(iedit);
        todoLi.appendChild(i);
        
        
        i.addEventListener('click', function(event) {
          const todoId = event.target.parentElement.id;
          
          delete todoItems[todoId];
          
          renderTodos();
          saveToLocalStorage();

        });

        iedit.addEventListener('click', function(event) {

            let editableItem = event.target.parentElement;
            let todoId = editableItem.id;
            let currentSelectedTodos = lists[currentListId].todos;
            editableItem.addEventListener('keypress', function (e) {

                if (e.key === 'Enter') {

                    e.preventDefault();

                    editableItem.setAttribute('contentEditable', false);

                    currentSelectedTodos[todoId].name = editableItem.textContent;
                    renderTodos();
                    saveToLocalStorage();
                }

            });

            editableItem.setAttribute('contentEditable', true);

        });
        
    });

}