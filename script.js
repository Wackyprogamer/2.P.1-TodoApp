// lists array to contain our lists with name and todos

const lists = {

    
    }

    let currentList = {};

    // added click function when user clicks button it will grab value from
    // text box and append a new list -- and add it to the array

    document.getElementById('addNewList').addEventListener('click', addList);

    function addList() {

        let newName = document.getElementById('textNameList').value; //

        if (newName in lists) {

            console.error('List already exists')

        } else {

            let newLI = document.createElement('li');

            let i = document.createElement('i');

            i.innerHTML = '<i class="fa-solid fa-trash-can" id="trashCan" style="color: #006efd;"></i>';

            newLI.classList = "list-group-item d-flex justify-content-between";

            newLI.id = newName;

            newLI.textContent = newName;

            lists[newName] = {

                name: newName,
                todos: []

            };

            document.getElementById('lists').appendChild(newLI).appendChild(i);

            document.getElementById('lists')
                .getElementsByTagName('li')
                .namedItem(newName)
                .getElementsByTagName('i')
                .item(0)
                .addEventListener('click', function(event) {

                    event.target.parentElement.parentElement.remove();

                    delete lists[newName];

            });

        }

    }


    //update Select a list to view to selected list via click event & Display their Items

    document.getElementById('lists').addEventListener('click', function(event) {

        if(event.target.tagName === 'LI') {

            let clickedListText = event.target.textContent;

            document.getElementById('headerList').textContent = clickedListText;

            currentList = event.target.id;

            let listId = event.target.id;

            let todoItems = lists[listId].todos;

            let todoContainer = document.getElementById('todos');

            todoContainer.innerHTML = '';

            todoItems.forEach(function(todo) {

                let todoLi = document.createElement('li');

                todoLi.textContent = todo.text;

                todoContainer.appendChild(todoLi);
                
            });


        }

    });


    //Created function to grab input value in text box when add item btn 
    //is clicked and will append to the selected array for todos in object

    document.getElementById('addTodo').addEventListener('click', addNewTodo);

    function addNewTodo () {

        let newTodoText = document.getElementById('textTodo').value;

        let newTodoItemAdded = {

            text: newTodoText,
            completed: false
        };

        let currentSelectedTodos = lists[currentList].todos;

        currentSelectedTodos.push(newTodoItemAdded);

        const todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';

        currentSelectedTodos.forEach(function(todo) {

            let addedLi = document.createElement('li');

            addedLi.textContent = todo.text

            addedLi.classList = "list-group-item d-flex justify-content-between";

            addedLi.id = todo.text;

            let checkBox = document.createElement('input')
            checkBox.setAttribute('type', 'checkBox');

            checkBox.addEventListener('change', function () {
                if (checkBox.checked) {

                    addedLi.setAttribute('style', 'text-decoration: line-through;');

                } else {

                    addedLi.setAttribute('style', 'text-decoration: none;');
                    

                }

            
            });


            let i = document.createElement('i');

            i.setAttribute('class', 'fa-solid fa-trash-can');

            i.setAttribute('id', 'trashCanTodo');

            i.setAttribute('style', 'color: #006efd;');

            let iedit = document.createElement('i')

            iedit.setAttribute('class', 'fa-solid fa-pencil');

            iedit.setAttribute('id', 'editTodo');

            iedit.setAttribute('style', 'color: #006efd;');

            
            todosContainer.appendChild(addedLi);
            addedLi.appendChild(checkBox);
            addedLi.appendChild(iedit);
            addedLi.appendChild(i);
            

            i.addEventListener('click', function(event) {

                i.parentElement.remove();

                let itemIndex = currentSelectedTodos.findIndex((todoItem) => todoItem.text === todo.text);

                currentSelectedTodos.splice(itemIndex, 1);

            });

            iedit.addEventListener('click', function(event) {

                let editableItem = event.target.parentElement;

                let oldItemText = editableItem.textContent;

                editableItem.addEventListener('keypress', function (e) {

                    if (e.key === 'Enter') {

                        e.preventDefault();

                        editableItem.setAttribute('contentEditable', false);

                        let editableIndex = currentSelectedTodos.findIndex((todoItem) => todoItem.text === oldItemText);

                        currentSelectedTodos[editableIndex].text = editableItem.textContent;

                    }

                });

                editableItem.setAttribute('contentEditable', true);


            });

        });

    }

    function render() {
        // this will hold the html that will be displayed in the sidebar
        let listsHtml = '<ul class="list-group">';
        // iterate through the lists to get their names
        lists.forEach((list) => {
          listsHtml += `<li class="list-group-item">${list.name}</li>`;
        });
       
        listsHtml += '</ul>';
        // print out the lists
       
        document.getElementById('lists').innerHTML = listsHtml;
        // print out the name of the current list
       
        document.getElementById('current-list-name').innerText = currentList.name;
        // iterate over the todos in the current list
       
        let todosHtml = '<ul class="list-group-flush">';
        currentList.todos.forEach((list) => {
          todosHtml += `<li class="list-group-item">${todo.text}</li>`;
        });
        // print out the todos
        document.getElementById('current-list-todos').innerHTML = todosHtml;
       }