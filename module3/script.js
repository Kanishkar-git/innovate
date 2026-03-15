document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('todo-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from local storage or set to empty array
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Initialize the app by rendering existing tasks
  function init() {
    renderTasks();
  }

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = '';
    }
  });

  // Add a new task
  function addTask(text) {
    const task = {
      id: Date.now().toString(),
      text: text,
      completed: false
    };
    
    tasks.push(task);
    saveAndRender();
  }

  // Toggle completion status
  function toggleTask(id) {
    tasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveAndRender();
  }

  // Delete a task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveAndRender();
  }

  // Save tasks to local storage and re-render
  function saveAndRender() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }

  // Render tasks to the DOM
  function renderTasks() {
    taskList.innerHTML = '';
    
    if (tasks.length === 0) {
      const emptyState = document.createElement('li');
      emptyState.innerHTML = '<p style="text-align: center; color: rgba(255,255,255,0.4); padding: 20px; width: 100%;">No tasks yet. Add one above!</p>';
      taskList.appendChild(emptyState);
      return;
    }
    
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = `task-item ${task.completed ? 'completed' : ''}`;
      
      const checkIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      const deleteIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`;

      li.innerHTML = `
        <div class="task-content" data-id="${task.id}">
          <div class="checkbox">
            ${checkIcon}
          </div>
          <span class="task-text">${escapeHTML(task.text)}</span>
        </div>
        <button class="delete-btn" data-id="${task.id}" aria-label="Delete Task">
          ${deleteIcon}
        </button>
      `;
      
      taskList.appendChild(li);
    });

    // Add event listeners to newly rendered items
    document.querySelectorAll('.task-content').forEach(element => {
      element.addEventListener('click', (e) => {
        const id = element.getAttribute('data-id');
        toggleTask(id);
      });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', (e) => {
        // Prevent event bubbling if clicking near the button
        e.stopPropagation();
        const id = button.getAttribute('data-id');
        deleteTask(id);
      });
    });
  }

  // Basic HTML escaping to prevent XSS
  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Start the app
  init();
});
