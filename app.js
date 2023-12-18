document.addEventListener("DOMContentLoaded", function () {

   

    // Array para almacenar las tareas
    let tasks = [];

    // Función para renderizar la lista de tareas
    function renderTasks() {
        const taskList = document.getElementById("taskList");
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="completeTask(${index})">Completar</button>
                <button onclick="deleteTask(${index})">Eliminar</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Función para agregar una nueva tarea
    window.addTask = function () {
        const taskInput = document.getElementById("taskInput");
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    };

    // Función para marcar una tarea como completada
    window.completeTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    // Función para eliminar una tarea
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    // Inicializar la lista de tareas al cargar la página
    renderTasks();
});

let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function updateTimer() {
    if (minutes === 0 && seconds === 0) {
        clearInterval(timer);
        isRunning = false;
        alert("Pomodoro session completed!");
    } else {
        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        document.getElementById("timer").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    document.getElementById("timer").innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
