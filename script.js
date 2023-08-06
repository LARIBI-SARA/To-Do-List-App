const taskForm = document.getElementById('task-form');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

function updateStorage() {

    localStorage.setItem("taskItem",taskList.innerHTML);
    
    }
    
    function showLists(){
    
        taskList.innerHTML = localStorage.getItem("taskItem")
    }

    showLists();

taskForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = newTaskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
        <span>${taskText}</span>
       <button class="delete-btn">DELETE</button>   
       <button class="edit-btn">EDIT</button> 
        `;
        taskList.appendChild(taskItem);
        newTaskInput.value = '';
        updateStorage()
    }
});

taskList.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentElement.remove();
        updateStorage()

    }else if (event.target.classList.contains('edit-btn')) {
        const taskItem = event.target.parentElement;
        const taskText = taskItem.querySelector('span').innerText;

        // Create an input field for editing
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = taskText;
        editInput.classList.add('input-box'); // Add the class "input-box"
        // Replace the task text with the input field
        taskItem.replaceChild(editInput, taskItem.querySelector('span'));

        // Replace the "Edit" button with a "Save" button
        event.target.textContent = 'SAVE';
        event.target.classList.remove('edit-btn');
        event.target.classList.add('save-btn');
    } else if (event.target.classList.contains('save-btn')) {
        const taskItem = event.target.parentElement;
        const editInput = taskItem.querySelector('input');
        const editedTaskText = editInput.value;

        // Replace the input field with the updated task text
        const span = document.createElement('span');
        span.textContent = editedTaskText;
        taskItem.replaceChild(span, editInput);

        // Replace the "Save" button with an "Edit" button
        event.target.textContent = 'EDIT';
        event.target.classList.remove('save-btn');
        event.target.classList.add('edit-btn');
        updateStorage()
    }
});
