// ===========================
// Utility
// ===========================
function saveSelection(key, value) {
    localStorage.setItem(key, value);
}
function getSelection(key) {
    return localStorage.getItem(key);
}

// ===========================
// Egg Type
// ===========================
const typeCards = document.querySelectorAll("#egg-type .egg-card");
typeCards.forEach(card => {
    card.addEventListener("click", () => {
        saveSelection("type", card.dataset.name);
        window.location.href = "size.html";
    });
});

// ===========================
// Egg Size
// ===========================
const sizeCards = document.querySelectorAll("#size .egg-card");
sizeCards.forEach(card => {
    card.addEventListener("click", () => {
        saveSelection("size", card.dataset.name);
        window.location.href = "doneness.html";
    });
});

// ===========================
// Egg Doneness
// ===========================
const donenessCards = document.querySelectorAll("#doneness .egg-card");
donenessCards.forEach(card => {
    card.addEventListener("click", () => {
        saveSelection("doneness", card.dataset.name);
        window.location.href = "tempstart.html";
    });
});

// ===========================
// Temperature
// ===========================
const tempCards = document.querySelectorAll("#temp .egg-card");
tempCards.forEach(card => {
    card.addEventListener("click", () => {
        saveSelection("temp", card.dataset.name);
        window.location.href = "cookingstrategy.html";
    });
});

// ===========================
// Cooking Strategy
// ===========================
const strategyCards = document.querySelectorAll("#strategy .egg-card");
strategyCards.forEach(card => {
    card.addEventListener("click", () => {
        saveSelection("strategyName", card.dataset.name);
        window.location.href = "timer.html";
    });
});

// ===========================
// Timer Page
// ===========================
const startButton = document.getElementById("start-button");
const timerDisplay = document.getElementById("timer-display");
const alarmSound = document.getElementById("alarm-sound");
let countdownInterval;

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

function startTimer(seconds) {
    if (countdownInterval) clearInterval(countdownInterval);
    let timeLeft = seconds;
    timerDisplay.textContent = formatTime(timeLeft);
    timerDisplay.style.color = "black";

    countdownInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);

        if (timeLeft === 5) {
            alarmSound?.play();
            timerDisplay.style.color = "red";
        }

        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = "ต้มเสร็จแล้ว! 🍳";
        }
    }, 1000);
}

if (startButton) {
    startButton.addEventListener("click", async () => {
        const type = getSelection("type");
        const size = getSelection("size");
        const doneness = getSelection("doneness");
        const temp = getSelection("temp");
        const strategy = getSelection("strategyName");

        const url = `http://localhost:8080/api/calculateTime?type=${type}&doneness=${doneness}&size=${size}&temp=${temp}&strategyName=${strategy}`;

        try {
            const response = await fetch(url);
            const seconds = await response.json();
            startTimer(seconds);
        } catch (err) {
            timerDisplay.textContent = "เชื่อมต่อ Backend ไม่ได้!";
            console.error(err);
        }
    });
}
