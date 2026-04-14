// -------------------- Greeting --------------------
const greeting = document.getElementById("greeting");

function setGreeting() {
    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.textContent = "Good Morning ☀️";
    } else if (hour < 18) {
        greeting.textContent = "Good Afternoon 🌤️";
    } else {
        greeting.textContent = "Good Evening 🌙";
    }
}


// -------------------- Task Storage Helpers --------------------
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// -------------------- Task Rendering --------------------
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    const tasks = getTasks();

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const span = document.createElement("span");
        span.textContent = task.text;
        span.style.cursor = "pointer";

        if (task.completed) {
            span.style.textDecoration = "line-through";
            span.style.opacity = "0.7";
        }

        span.onclick = function () {
            toggleComplete(index);
        };

        const buttonGroup = document.createElement("div");
        buttonGroup.className = "task-buttons";

        const editBtn = document.createElement("button");
        editBtn.textContent = "✏️";
        editBtn.onclick = function () {
            editTask(index);
        };

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.onclick = function () {
            deleteTask(index);
        };

        buttonGroup.appendChild(editBtn);
        buttonGroup.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(buttonGroup);
        taskList.appendChild(li);
    });
}


// -------------------- Task Actions --------------------
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    const tasks = getTasks();

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks(tasks);
    displayTasks();
    input.value = "";
}

function toggleComplete(index) {
    const tasks = getTasks();
    tasks[index].completed = !tasks[index].completed;
    saveTasks(tasks);
    displayTasks();
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    displayTasks();
}

function editTask(index) {
    const tasks = getTasks();
    const newText = prompt("Edit task:", tasks[index].text);

    if (newText !== null && newText.trim() !== "") {
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        displayTasks();
    }
}

function clearTasks() {
    localStorage.removeItem("tasks");
    displayTasks();
}


// -------------------- Weather Feature --------------------
async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("weatherResult");

    if (city === "") {
        alert("Enter a city");
        return;
    }

    const apiKey = "5d4495ade76f0e1bcf40a77dce3498d1"; // Replace with your OpenWeatherMap API key
    result.textContent = "Loading...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            result.textContent = "City not found";
            return;
        }

        result.textContent = `🌡️ Temperature in ${city}: ${data.main.temp}°C`;
    } catch (error) {
        result.textContent = "Error fetching data";
    }
}


// -------------------- Event Listeners --------------------
document.getElementById("taskInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});


// -------------------- Initialization --------------------
setGreeting();
displayTasks();