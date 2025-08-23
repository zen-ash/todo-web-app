// Simple to‑do list logic.
//
// This file contains the JavaScript necessary to make the to‑do list work.
// Tasks are stored in the browser's localStorage so they persist when you
// refresh the page. You can add new tasks, mark them complete, edit the
// contents, and delete them altogether.

// Select DOM elements once up front to avoid repeated lookups.
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Our in-memory representation of the tasks. Each task has an id, text, and
// completed flag. The id uses the current timestamp to ensure uniqueness.
let tasks = [];

// Load tasks from localStorage, if present. Parsing JSON may throw if the
// stored value is malformed; wrap in try/catch just in case.
try {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
} catch (err) {
  console.warn('Could not parse tasks from localStorage:', err);
}

// Render any existing tasks on initial load.
renderTasks();

// Handle submission of the add task form. Preventing the default form submit
// behaviour stops the page from reloading. We trim whitespace and ignore
// empty strings.
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) {
    // Provide gentle feedback without an alert; just shake the input or similar
    taskInput.focus();
    return;
  }
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(newTask);
  taskInput.value = '';
  persistAndRender();
});

// Persist tasks to localStorage and then re-render the list. Keeping these
// operations together reduces the chance of forgetting to call one or the
// other after modifying the tasks array.
function persistAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Create and insert DOM elements for each task. Clearing the list each time
// ensures we don't accumulate duplicate nodes when re-rendering.
function renderTasks() {
  // Remove all child nodes of the list.
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');

    // Checkbox to toggle completion state.
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      persistAndRender();
    });
    li.appendChild(checkbox);

    // Span for the task text. We use contentEditable to allow inline editing.
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;
    li.appendChild(textSpan);

    // Container for the edit and delete buttons.
    const actions = document.createElement('div');
    actions.className = 'task-actions';

    // Edit button toggles between edit and save modes. When editing,
    // contentEditable is enabled on the span; saving disables it and updates
    // the underlying task text.
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      if (editButton.textContent === 'Edit') {
        // Start editing
        textSpan.contentEditable = 'true';
        textSpan.focus();
        editButton.textContent = 'Save';
      } else {
        // Save changes
        textSpan.contentEditable = 'false';
        const updatedText = textSpan.textContent.trim();
        if (updatedText) {
          task.text = updatedText;
        }
        editButton.textContent = 'Edit';
        persistAndRender();
      }
    });
    actions.appendChild(editButton);

    // Delete button removes the task from the array.
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      persistAndRender();
    });
    actions.appendChild(deleteButton);

    li.appendChild(actions);
    taskList.appendChild(li);
  });
}