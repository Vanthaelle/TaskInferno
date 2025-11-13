// Task Logic
const form = document.getElementById('taskForm');
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');
    li.innerHTML = `
      <span>${task.text}</span>
      <span class="delete">✖</span>
    `;
    li.querySelector('span').addEventListener('click', () => toggleTask(index));
    li.querySelector('.delete').addEventListener('click', e => {
      e.stopPropagation();
      deleteTask(index);
    });
    list.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({ text, done: false });
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    addTask(text);
    input.value = '';
  }
});

renderTasks();