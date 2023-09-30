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

            todosContainer.appendChild(addedLi);

        });

    }

    