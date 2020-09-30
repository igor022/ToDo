const todos = document.querySelector('#todos');
const input = document.querySelector('#inputAdd');

input.addEventListener('keydown', addTodo)

function addTodo(e) {
    const text = e.target.value;
    if (e.key === 'Enter' && text) {
        createTask(e.target.value);
        e.target.value = '';
    }
}

function createTask(text) {
    const block = document.createElement('div');
    block.classList.add('task');

    const checkButton = createElement('button', 'check');
    checkButton.className = 'check';

    const todoText = createElement('p', text);

    const deleteButton = createElement('button', 'remove');
    deleteButton.className = 'delete';

    blockContent = { checkButton, todoText, deleteButton };
    fillElement(block, blockContent);

    todos.appendChild(block);
}

function createElement(tag, text) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
}

function fillElement(parent, children) {
    for (let key in children) {
        parent.appendChild(children[key]);
    }
}

createTask('wap');
console.log('hello');