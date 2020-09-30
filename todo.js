const todos = document.querySelector('#todos');
const checkAllButton = document.querySelector('.check-all');
const formAdd = document.querySelector('.form-add');
const itemsCount = document.querySelector('.items-count');

const filterButtons = document.querySelectorAll('.additional-info .filter-buttons button');
const clearButton = document.querySelector('.clear-tasks');


checkAllButton.addEventListener('click', checkAll);
formAdd.addEventListener('submit', addTodo);

for (let button of filterButtons) {
    console.log(button);
    button.addEventListener('click', filterEvent);
}

clearButton.addEventListener('click', clearAll);

function addTodo(e) {
    e.preventDefault();

    const input = document.querySelector('#inputAdd');
    const text = input.value;

    if (text) {
        createTask(input.value);
        input.value = '';
        updateCount();
        filter();
    }
}

function checkAll(e) {
    console.log(todos.childNodes);

    const completed = ([...todos.children].filter((i) => i.classList.contains('completed')));
    console.log(completed);
    if (completed.length !== todos.childElementCount) {
        for (let i = 0; i < todos.children.length; i++) {
            checkTodo(todos.children[i].querySelector('.check'));
        }
    } else {
        for (let i = 0; i < todos.children.length; i++) {
            toggleTodo({ target: todos.children[i].querySelector('.check') });
        }
    }
    updateCount();
}

function clearAll(e) {
    [...todos.children].forEach((i) => {
        if (i.classList.contains('completed')) {
            i.remove();
        }
    })
    updateCount();
    checkForClear();
}

function checkForClear() {
    console.log(todos);
    const completed = ([...todos.children].filter((i) => i.classList.contains('completed')));
    console.log(completed);
    if (completed.length > 0) {
        clearButton.style['visibility'] = 'visible';
        return true;
    } 
        
    clearButton.style['visibility'] = 'hidden';       
    return false;
}

function updateCount() {
    console.log([...todos.children]);
    const childCount = [...todos.children].filter((i) => !i.classList.contains('completed')).length;
    itemsCount.textContent = `${childCount} item${childCount === 1 ? '' : 's'}`; 
}

function createTask(text) {
    todos.innerHTML += `<div class="task"><button class="check"></button><p>${text}</p><button class="delete"></button></div>`;
    todos.addEventListener('click', taskEvents); 
}

function taskEvents(e) {
    const classList = e.target.classList;
    console.log('task event:', e.target);
    if (classList.contains('check')) {
        toggleTodo(e);
    } 
    if (classList.contains('delete')) {
        deleteElement(e);
    }
}

function checkTodo(item) {
    console.log(item);
    item.classList.add('completed');
    item.nextSibling.classList.add('completed');
    item.parentElement.classList.add('completed');
    checkForClear();
    updateCount();
}

function toggleTodo(e) {
    e.target.classList.toggle('completed');
    e.target.nextSibling.classList.toggle('completed');
    e.target.parentElement.classList.toggle('completed');
    checkForClear();
    updateCount();
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

function filter() {
    const currentFilter = document.querySelector('.additional-info button.selected');
    switch (currentFilter.classList[0]) {
        case 'all':
            for (let item of todos.children){
                item.style['display'] = 'flex';
            }
            break;
        case 'current':
            for (let item of todos.children){
                if (item.classList.contains('completed')) {
                    item.style['display'] = 'none';
                } else {
                    item.style['display'] = 'flex';
                }
            }
            break;
        case 'completed':
            for (let item of todos.children){
                if (!item.classList.contains('completed')) {
                    item.style['display'] = 'none';
                } else {
                    item.style['display'] = 'flex';
                }
            }
            break;
    }
}

function filterEvent(e) {
    const currentFilter = document.querySelector('.additional-info button.selected');
    if (e.target !== currentFilter)
    {
        console.log('filtering...');
        console.log(todos.children);
        currentFilter.classList.remove('selected');
        e.target.classList.add('selected');
        filter();
    }
}

createTask('wap');
createTask('todo');
createTask('what');
updateCount();
console.log('hello');
