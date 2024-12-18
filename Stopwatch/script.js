// Variables
let startTime, elapsedTime = 0, timerInterval;
let isRunning = false;
const lapsList = document.getElementById("laps-list");

// Helper Functions
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let ms = Math.floor((diffInSec - ss) * 1000);

    return `${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}:${String(ms).padStart(3, "0")}`;
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function () {
            elapsedTime = Date.now() - startTime;
            document.getElementById("display").innerText = timeToString(elapsedTime);
        }, 10);
    }
}

function pause() {
    clearInterval(timerInterval);
    isRunning = false;
}

function reset() {
    clearInterval(timerInterval);
    document.getElementById("display").innerText = "00:00:00";
    elapsedTime = 0;
    lapsList.innerHTML = "";
    isRunning = false;
}

function recordLap() {
    if (isRunning) {
        const lapTime = timeToString(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

// Theme Toggle
function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Event Listeners
document.getElementById("start").addEventListener("click", start);
document.getElementById("pause").addEventListener("click", pause);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", recordLap);
document.getElementById("theme-toggle").addEventListener("click", toggleTheme);
