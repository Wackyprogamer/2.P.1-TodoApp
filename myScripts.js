$(document).on("keypress", "input", function(e) {

    if (e.which == 13) {

        let text = document.getElementById('listName').value;

        let a = document.createElement('a');

        a.type = 'button';

        a.className = 'list-group-item list-group-item-action';

        a.textContent = text;

        let parentDiv = document.querySelector('#myLists')

        parentDiv.appendChild(a);

    }
});