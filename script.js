const greeting = document.getElementById("greeting");

const hour = new Date().getHours();

if (hour < 12) {
    greeting.textContent = "Good Morning ☀️";
} else if (hour < 18) {
    greeting.textContent = "Good Afternoon 🌤️";
} else {
    greeting.textContent = "Good Evening 🌙";
}
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value;

    if (taskText === "") return;

    const li = document.createElement("li");
    li.textContent = taskText;

    document.getElementById("taskList").appendChild(li);

    input.value = "";

    li.addEventListener("click", function () {
    li.remove();
});
}
async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city.trim() === "") {
        alert("Enter a city");
        return;
    }

    const apiKey = "5d4495ade76f0e1bcf40a77dce3498d1";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("weatherResult").textContent =
            `🌡️ Temperature in ${city}: ${data.main.temp}°C`;
    } catch (error) {
        document.getElementById("weatherResult").textContent =
            "Error fetching data";
    }
}