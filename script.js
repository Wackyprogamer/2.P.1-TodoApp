// lists array to contain our lists with name and todos

const lists = {

    
    }

    const currentList = lists[1];

    // added click function when user clicks button it will grab value from
    // text box and append a new list -- and add it to the array

    document.getElementById('addNewList').addEventListener('click', addList);

    function addList() {

        let newName = document.getElementById('textNameList').value;

        let newLI = document.createElement('li');

        newLI.classList = "list-group-item";

        newLI.id = Object.keys(lists).length + 1;

        newLI.textContent = newName;

        let newList = {

            name: newName,
            todos: []

        };

        lists[Object.keys(lists).length + 1] = newList;

        document.getElementById('lists').appendChild(newLI);

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
