const todos = document.querySelector('#todos');
const checkAllButton = document.querySelector('.check-all');
const formAdd = document.querySelector('.form-add');
const itemsCount = document.querySelector('.items-count');
const filterButtons = document.querySelector('.filter-buttons');
const clearButton = document.querySelector('.clear-tasks');

checkAllButton.addEventListener('click', checkAll);
formAdd.addEventListener('submit', addTodo);
todos.addEventListener('click', editTaskStatus); 
filterButtons.addEventListener('click', filterEvent);
clearButton.addEventListener('click', clearAll);

function addTodo(e) {
    e.preventDefault();

    const text = formAdd.inputAdd.value;

    if (text) {
        renderTask(taskTemplate(text));
        formAdd.inputAdd.value = '';
        updateCount();
        filter();
    }
} 

function checkAll(e) {
    const completed = getCompletedTasks();

    if (completed.length !== todos.childElementCount) {
        [...todos.children].forEach(checkTodo);
    } else {
        [...todos.children].forEach(toggleTodo);
    }

    updateCount();
}

function getCompletedTasks() {
    return ([...todos.children].filter((todo) => todo.classList.contains('completed')));
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
    const completed = getCompletedTasks();
    if (completed.length > 0) {
        clearButton.style.visibility = 'visible';
    } else {
        clearButton.style.visibility = 'hidden';       
    }
}

function updateCount() {
    const childCount = todos.childElementCount - getCompletedTasks().length;
    itemsCount.textContent = `${childCount} item${childCount === 1 ? '' : 's'}`; 
}

function taskTemplate(text) {
    const template = 
            `<div class="task">
                <button class="check"></button>
                <p>${text}</p>
                <button class="delete"></button>
            </div>`;

    return template;
}

function renderTask(template) {
    todos.innerHTML += template;
}

function editTaskStatus(e) {
    const classList = e.target.classList;
    if (classList.contains('check')) {
        toggleEvent(e);
    } 
    if (classList.contains('delete')) {
        deleteElement(e);
    }
}

function checkTodo(item) {
    item.classList.add('completed');
    item.querySelector('.check').classList.add('completed');
    item.querySelector('p').classList.add('completed');

    filter();
    checkForClear(); 
    updateCount();
}

function toggleTodo(item) {
    item.classList.toggle('completed');
    item.querySelector('.check').classList.toggle('completed');
    item.querySelector('p').classList.toggle('completed');

    filter();
    checkForClear();
    updateCount();
}

function toggleEvent(e) {
    toggleTodo(e.target.parentElement);
} 

function deleteElement(e) {
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
            for (const item of todos.children){
                item.style['display'] = 'flex';
            }
            break;
        case 'current':
            for (const item of todos.children){
                if (item.classList.contains('completed')) {
                    item.style['display'] = 'none';
                } else {
                    item.style['display'] = 'flex';
                }
            }
            break;
        case 'completed':
            for (const item of todos.children){
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
    if (e.target.nodeName === 'BUTTON' && e.target !== currentFilter)
    {
        currentFilter.classList.remove('selected');
        e.target.classList.add('selected');
        filter();
    }
}

renderTask(taskTemplate('TODO'));

updateCount();