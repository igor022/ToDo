const todos = document.querySelector('#todos');
const checkAllButton = document.querySelector('.check-all');
const input = document.querySelector('#inputAdd');
const itemsCount = document.querySelector('.items-count');
let currentShow;
let currentFilter;

checkAllButton.addEventListener('click', checkAll);
input.addEventListener('keydown', addTodo)

function addTodo(e) {
    const text = e.target.value;
    if (e.key === 'Enter' && text) {
        createTask(e.target.value);
        e.target.value = '';
        updateCount();
    }
}

function checkAll(e) {
    console.log(todos.childNodes);
    for (let i = 1; i < todos.childNodes.length; i++) {
        checkTodo({ target: todos.childNodes[i].querySelector('.check') });
    }
}

function updateCount() {
    const childCount = todos.childElementCount;
    itemsCount.textContent = `${childCount} item${childCount === 1 ? '' : 's'}`; 
}

function createTask(text) {
    const block = document.createElement('div');
    block.classList.add('task');
    block.addEventListener('mouseenter', showDeleteButton)
    block.addEventListener('mouseleave', hideDeleteButton);

    const checkButton = document.createElement('button');
    checkButton.className = 'check';
    checkButton.addEventListener('click', checkTodo);

    const todoText = createElement('p', text);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', deleteElement);
    blockContent = { checkButton, todoText, deleteButton };
    fillElement(block, blockContent);
    
    todos.appendChild(block);    
}

function checkTodo(e) {
    e.target.classList.toggle('active');
    e.target.nextSibling.classList.toggle('active');
    e.target.parentElement.classList.toggle('active');
}

function showDeleteButton(e) {
    //console.log('mouseover', e.target);
    e.target.querySelector('.delete').style['visibility'] = 'visible';
    currentShow = e.target;
}

function hideDeleteButton(e) {
    //console.log(currentShow);
    currentShow.querySelector('.delete').style['visibility'] = 'hidden';

}

function deleteElement(e) {
    console.log('delete')
    e.target.parentElement.remove();

    updateCount();
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
updateCount();
console.log('hello');