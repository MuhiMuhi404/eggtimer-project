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
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const cancelButton = document.getElementById("cancel-button");

const statusText = document.getElementById("status");
const timerDisplay = document.getElementById("timer-display");
const alarmSound = document.getElementById("alarm-sound");

let countdownInterval;
let remainingTime = 0; // ใช้จำเวลาที่เหลือ

function formatTime(totalSeconds) {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

// ฟังก์ชันเริ่มนับถอยหลัง (ใช้ remainingTime เป็นหลัก)
function runCountdown() {
    clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        remainingTime--; // ลดเวลาลง
        if (timerDisplay) timerDisplay.textContent = formatTime(remainingTime);

        // เตือน 5 วินาทีสุดท้าย
        if (remainingTime === 5) {
            if (alarmSound) alarmSound.play();
            if (timerDisplay) timerDisplay.style.color = "red";
        }

        // หมดเวลา
        if (remainingTime <= 0) {
            clearInterval(countdownInterval);
            if (timerDisplay) timerDisplay.textContent = "ต้มเสร็จแล้ว! 🍳";
            if (statusText) statusText.textContent = "ทานให้อร่อยนะครับ!";
            toggleButtons("finished"); // เปลี่ยนปุ่มเมื่อเสร็จ
        }
    }, 1000);
}

// ฟังก์ชันสลับปุ่มตามสถานะ
function toggleButtons(state) {
    if (state === "running") {
        startButton.style.display = "none";
        pauseButton.disabled = false;
        pauseButton.style.display = "inline-block";
        resumeButton.style.display = "none";
        cancelButton.disabled = false;
    } else if (state === "paused") {
        pauseButton.style.display = "none";
        resumeButton.disabled = false;
        resumeButton.style.display = "inline-block";
    } else if (state === "finished") {
        pauseButton.style.display = "none";
        resumeButton.style.display = "none";
        cancelButton.textContent = "หน้าหลัก";
    }
}

// --- Event Listeners ---

if (startButton) {
    startButton.addEventListener("click", async () => {
        // อ่านค่าจาก LocalStorage
        const type = getSelection("type");
        const size = getSelection("size");
        const doneness = getSelection("doneness");
        const temp = getSelection("temp");
        const strategy = getSelection("strategyName");

        const url = `http://localhost:8080/api/calculateTime?type=${type}&doneness=${doneness}&size=${size}&temp=${temp}&strategyName=${strategy}`;

        try {
            const response = await fetch(url);
            // **แก้ให้รับ Error กรณีส่งค่าผิด**
            if (!response.ok) throw new Error("Backend Error");

            const seconds = await response.json();
            
            // เริ่มต้นจับเวลา
            remainingTime = seconds;
            timerDisplay.textContent = formatTime(remainingTime);
            statusText.textContent = "กำลังจับเวลา...";
            
            runCountdown();
            toggleButtons("running"); // สั่งให้ปุ่ม Start หายไป

        } catch (err) {
            timerDisplay.textContent = "Error!";
            statusText.textContent = "เช็กไฟล์ HTML ว่า data-name ตรงกับ Java Enum ไหม";
            console.error(err);
        }
    });
}

// ปุ่มหยุดชั่วคราว
if (pauseButton) {
    pauseButton.addEventListener("click", () => {
        clearInterval(countdownInterval); // หยุดเวลา
        if (statusText) statusText.textContent = "หยุดชั่วคราว";
        toggleButtons("paused");
    });
}

// ปุ่มนับต่อ
if (resumeButton) {
    resumeButton.addEventListener("click", () => {
        runCountdown(); // นับต่อจาก remainingTime เดิม
        if (statusText) statusText.textContent = "กำลังจับเวลา...";
        toggleButtons("running");
    });
}

// ปุ่มยกเลิก / หน้าหลัก
if (cancelButton) {
    cancelButton.addEventListener("click", () => {
        clearInterval(countdownInterval);
        localStorage.clear(); // ล้างค่าที่เลือกไว้
        window.location.href = "index.html"; // กลับหน้าแรก
    });
}