// Task array to store tasks and their data
let tasks = [];

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const taskDate = document.getElementById('taskDate').value;

    if (taskInput.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: new Date().getTime(), // Unique ID for each task
        task: taskInput,
        date: taskDate,
        completed: false
    };

    tasks.push(task);
    document.getElementById('taskInput').value = ''; // Clear the input field
    document.getElementById('taskDate').value = ''; // Clear the datetime input field

    renderTasks();
}

// Function to render tasks on the page
function renderTasks() {
    const taskLists = document.getElementById('taskLists');
    taskLists.innerHTML = ''; // Clear the existing tasks

    tasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div>
                <strong>${task.task}</strong>
                <div class="task-date">${task.date ? `Due: ${new Date(task.date).toLocaleString()}` : ''}</div>
            </div>
            <div>
                <button onclick="toggleCompletion(${task.id})">${task.completed ? 'Unmark' : 'Mark Completed'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskLists.appendChild(taskItem);
    });
}

// Function to mark a task as completed or uncompleted
function toggleCompletion(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        renderTasks(); // Re-render tasks to update UI
    }
}

// Function to edit a task
function editTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        const newTaskText = prompt('Edit your task:', task.task);
        const newDate = prompt('Edit task due date (yyyy-mm-ddThh:mm):', task.date);
        
        if (newTaskText && newDate) {
            task.task = newTaskText;
            task.date = newDate;
            renderTasks(); // Re-render tasks to update UI
        }
    }
}

// Function to delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(t => t.id !== taskId);
    renderTasks(); // Re-render tasks to update UI
}
