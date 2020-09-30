const todos = document.querySelector('#todos');
const checkAllButton = document.querySelector('.check-all');
const input = document.querySelector('#inputAdd');
const itemsCount = document.querySelector('.items-count');
const filterButtons = document.querySelectorAll('.additional-info .filter-buttons button');
const clearButton = document.querySelector('.clear-tasks');
let currentDeleteShow;

const allTasks = [];

checkAllButton.addEventListener('click', checkAll);
input.addEventListener('keydown', addTodo);
for (let button of filterButtons) {
    console.log(button);
    button.addEventListener('click', filterEvent);
}
clearButton.addEventListener('click', clearAll);

function addTodo(e) {
    const text = e.target.value;
    if (e.key === 'Enter' && text) {
        createTask(e.target.value);
        e.target.value = '';
        updateCount();
        allTasks.push({ text, isActive: false });
        console.log(allTasks);
        filter();
    }
}

function checkAll(e) {
    console.log(todos.childNodes);

    const completed = ([...todos.children].filter((i) => i.classList.contains('completed')));
    console.log(completed);
    if (completed.length !== todos.childElementCount) {
        for (let i = 1; i < todos.childNodes.length; i++) {
            checkTodo(todos.childNodes[i].querySelector('.check'));
        }
    } else {
        for (let i = 1; i < todos.childNodes.length; i++) {
            toggleTodo({ target: todos.childNodes[i].querySelector('.check') });
        }
    }

}

function clearAll(e) {
    todos.innerHTML = '';
    updateCount();
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
    const childCount = todos.childElementCount;
    itemsCount.textContent = `${childCount} item${childCount === 1 ? '' : 's'}`; 
}

function createTask(text) {
    const block = document.createElement('div');
    block.classList.add('task');

    const checkButton = document.createElement('button');
    checkButton.className = 'check';
    checkButton.addEventListener('click', toggleTodo);

    const todoText = createElement('p', text);
    
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', deleteElement);
    blockContent = { checkButton, todoText, deleteButton };
    fillElement(block, blockContent);
    
    todos.appendChild(block);    

}


function checkTodo(item) {
    console.log(item);
    item.classList.add('completed');
    item.nextSibling.classList.add('completed');
    item.parentElement.classList.add('completed');
    checkForClear();
}

function toggleTodo(e) {
    e.target.classList.toggle('completed');
    e.target.nextSibling.classList.toggle('completed');
    e.target.parentElement.classList.toggle('completed');
    checkForClear();
}

function showDeleteButton(e) {
    //console.log('mouseover', e.target);
    e.target.querySelector('.delete').style['visibility'] = 'visible';
    currentDeleteShow = e.target;
}

function hideDeleteButton(e) {
    //console.log(currentDeleteShow);
    currentDeleteShow.querySelector('.delete').style['visibility'] = 'hidden';

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
updateCount();
console.log('hello');
