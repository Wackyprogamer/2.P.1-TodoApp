// lists array to contain our lists with name and todos

const lists = {

    
    }

    const currentList = lists[0];

    // added click function when user clicks button it will grab value from
    // text box and append a new list -- and add it to the array

    document.getElementById('addNewList').addEventListener('click', addList);

    function addList() {

        let newName = document.getElementById('textNameList').value;

        let newLI = document.createElement('li');

        let i = document.createElement('i');

        i.innerHTML = '<i class="fa-solid fa-trash-can" style="color: #006efd;"></i>';

        newLI.classList = "list-group-item";

        newLI.id = Object.keys(lists).length + 1;

        newLI.textContent = newName;

        let newList = {

            name: newName,
            todos: []

        };

        lists[Object.keys(lists).length + 1] = newList;

        document.getElementById('lists').appendChild(newLI).appendChild(i);

    }

    //update Select a list to view to selected list via click event & Display their Items

    document.getElementById('lists').addEventListener('click', function(event) {

        if(event.target.tagName === 'LI') {

            let clickedListText = event.target.textContent;

            document.getElementById('headerList').textContent = clickedListText;

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
    //is clicked and will append to the selected array

    document.getElementById('addTodo').addEventListener('click', addNewTodo);

    function addNewTodo () {

        let newTodoText = document.getElementById('textTodo').value;

        let newTodoItemAdded = {

            text: newTodoText,
            completed: false
        };

        let currentSelectedTodos = currentList.todos;

        currentSelectedTodos.push(newTodoItemAdded);

        const todosContainer = document.getElementById('todos');
        todosContainer.innerHTML = '';

        currentSelectedTodos.forEach(function(todo) {

            let addedLi = document.createElement('li');

            addedLi.textContent = todo.text

            todosContainer.appendChild(addedLi);

        });

    }