// seletores do DOM
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// função que cria um <li> com texto e botão "remover"
function createTaskItem(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
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

// delegação de eventos no <ul>
taskList.addEventListener('click', function(e) {
    const li = e.target.closest('li');
    if (!li) return;

    // remover tarefa
    if (e.target.classList.contains('delete-btn')) {
        li.remove();
        return;
    }

    // marcar como concluída
    if (e.target.tagName === 'SPAN') {
        li.classList.toggle('completed');
    }
});

let currentFilter = 'all';

// editar texto ao clicar duas vezes
taskList.addEventListener('dblclick', function(e) {
    if(e.target.tagName === 'SPAN') {
        const span = e.target;
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;

        span.replaceWith(input);
        input.focus();

        input.addEventListener('blur', function() {
            const newSpan = document.createElement('span');
            newSpan.textContent = input.value.trim() || 'Sem título';
            input.replaceWith(newSpan);
        });
    }
});

// filtros
document.querySelectorAll('.filter').forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        applyFilter();
    });
});

function applyFilter() {
    taskList.querySelectorAll('li').forEach(li => {
        if (currentFilter === 'all') {
            li.style.display = '';
        } else if (currentFilter === 'active') {
            li.style.display = li.classList.contains('completed') ? 'none' : '';
        } else {
            li.style.display = li.classList.contains('completed') ? '' : 'none';
        }
    });
}