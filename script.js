// seletores do DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// função que cria um <li> com texto e botão "remover"
function createTaskItem(text) {
    const li = ducument.createElement('li');
    const span = document.creaateElement('span');
    span.textContent = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remover';
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

// captura do submit
taskForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    const li = createTaskItem(text);
    taskList.appendChild(li);
    taskInput.value = '';
    taskInput.focus();
});