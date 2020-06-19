'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoComplete = document.querySelector('.todo-completed');

let todoData = [];

const renderDeal = () => {
    todoList.textContent = '';
    todoComplete.textContent = '';

    if(localStorage.getItem('data')) {
        todoData = JSON.parse(localStorage.getItem('data'));
    }

    todoData.forEach((item, i) => {
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `
            <span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
            `;

        if(item.completed) {
            todoComplete.append(li);
        } else {
            item.value = item.value.trim();
            if(item.value !== '') {
                todoList.append(li);
            }
        }

        const completeBtn = li.querySelector('.todo-complete');
        completeBtn.addEventListener('click', () => {
            item.completed = !item.completed;
            localStorage.setItem('data', JSON.stringify(todoData));
            renderDeal();
        });

        const removeBtn = li.querySelector('.todo-remove');
        removeBtn.addEventListener('click', () => {
            todoData.splice(i, 1);
            localStorage.setItem('data', JSON.stringify(todoData));
            renderDeal();
        });

        localStorage.setItem('data', JSON.stringify(todoData));
    });
};

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();
    const newToDo = {
        value: headerInput.value,
        completed: false
    };
    headerInput.value = '';
    todoData.push(newToDo);
    localStorage.setItem('data', JSON.stringify(todoData));
    renderDeal();
});

renderDeal();