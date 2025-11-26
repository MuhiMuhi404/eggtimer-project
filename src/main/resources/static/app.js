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
// ตรวจสอบว่าอยู่หน้า timer.html หรือไม่ (เพื่อป้องกัน Error หน้าอื่น)
if (window.location.pathname.endsWith('timer.html')) {

    // --- A. คว้าปุ่มและองค์ประกอบต่างๆ ---
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    const resumeButton = document.getElementById("resume-button");
    const cancelButton = document.getElementById("cancel-button");
    const boilAgainButton = document.getElementById("boil-again-button");
    const changeSettingsButton = document.getElementById("change-settings-button");

    const timerDisplay = document.getElementById("timer-display");
    const statusText = document.getElementById("status");
    const alarmSound = document.getElementById("alarm-sound");
    const fiveSecSound = document.getElementById("five-sec-sound");

    let countdownInterval;
    let remainingTime = 0; // ใช้จำเวลาที่เหลือ

    // --- B. ฟังก์ชันแปลงเวลาและจัดการ UI ---
    
    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
    }

    // ฟังก์ชันจัดการการแสดงผลปุ่ม (State Management)
    function toggleButtons(state) {
        // ซ่อนทุกปุ่มก่อน
        [startButton, pauseButton, resumeButton, cancelButton, boilAgainButton, changeSettingsButton].forEach(btn => {
            if (btn) btn.style.display = "none";
        });

        // แสดงปุ่มตามสถานะ
        if (state === "ready") {
            if(startButton) startButton.style.display = "inline-block";
        } 
        else if (state === "running") {
            if(pauseButton) {
                pauseButton.style.display = "inline-block";
                pauseButton.disabled = false;
            }
            if(cancelButton) {
                cancelButton.style.display = "inline-block";
                cancelButton.disabled = false;
            }
        } 
        else if (state === "paused") {
            if(resumeButton) {
                resumeButton.style.display = "inline-block";
                resumeButton.disabled = false;
            }
            if(cancelButton) {
                cancelButton.style.display = "inline-block";
                cancelButton.disabled = false;
            }
        } 
        else if (state === "finished") {
            if(boilAgainButton) boilAgainButton.style.display = "inline-block";
            if(changeSettingsButton) changeSettingsButton.style.display = "inline-block";
        }
    }

    // ฟังก์ชันนับถอยหลัง
    function runCountdown() {
        if (countdownInterval) clearInterval(countdownInterval);
        
        countdownInterval = setInterval(() => {
            remainingTime--;
            if (timerDisplay) timerDisplay.textContent = formatTime(remainingTime);

            // เตือน 5 วินาทีสุดท้าย
            if (remainingTime === 5) {
                if (fiveSecSound) {
                    fiveSecSound.play().catch(e => console.log("Auto-play blocked:", e));
                }
                if (timerDisplay) timerDisplay.style.color = "red";
            }

            // หมดเวลา
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                if (alarmSound) {
                    alarmSound.play().catch(e => console.log("Auto-play blocked:", e));
                }
                if (timerDisplay) {
                    timerDisplay.textContent = "ต้มเสร็จแล้ว! 🍳";
                    timerDisplay.style.color = "green";
                }
                if (statusText) statusText.textContent = "ไข่สุกพร้อมทานแล้ว";
                toggleButtons("finished");
            }
        }, 1000);
    }

    // ฟังก์ชันหลัก: ยิง API และเริ่มนับ
    async function fetchAndStart() {
        const type = getSelection("type");
        const size = getSelection("size");
        const doneness = getSelection("doneness");
        const temp = getSelection("temp");
        const strategy = getSelection("strategyName");

        // สร้าง URL
        const url = `http://localhost:8080/api/calculateTime?type=${type}&doneness=${doneness}&size=${size}&temp=${temp}&strategyName=${strategy}`;
        console.log("Calling API:", url);

        try {
            if (statusText) statusText.textContent = "กำลังคำนวณเวลา...";
            
            const response = await fetch(url);
            if (!response.ok) throw new Error("Backend Error");

            const seconds = await response.json();
            console.log("Time received:", seconds);
            
            // ตั้งค่าเริ่มต้น
            remainingTime = seconds;
            if (timerDisplay) {
                timerDisplay.textContent = formatTime(remainingTime);
                timerDisplay.style.color = "black";
            }
            if (statusText) statusText.textContent = "กำลังจับเวลา...";
            
            // เริ่มทำงาน
            runCountdown();
            toggleButtons("running");

        } catch (err) {
            console.error(err);
            if (timerDisplay) timerDisplay.textContent = "Error!";
            if (statusText) statusText.textContent = "เกิดข้อผิดพลาด กรุณาตรวจสอบค่าที่เลือก";
        }
    }

    // --- C. ผูก Event Listeners กับปุ่ม ---

    // ปุ่ม Start (เริ่มครั้งแรก)
    if (startButton) {
        startButton.addEventListener("click", fetchAndStart);
    }

    // ปุ่ม Pause (หยุดชั่วคราว)
    if (pauseButton) {
        pauseButton.addEventListener("click", () => {
            clearInterval(countdownInterval);
            if (statusText) statusText.textContent = "หยุดชั่วคราว";
            toggleButtons("paused");
        });
    }

    // ปุ่ม Resume (นับต่อ)
    if (resumeButton) {
        resumeButton.addEventListener("click", () => {
            runCountdown();
            if (statusText) statusText.textContent = "กำลังจับเวลา...";
            toggleButtons("running");
        });
    }

    // ปุ่ม Cancel (ยกเลิก/กลับหน้าแรก)
    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            clearInterval(countdownInterval);
            localStorage.clear();
            window.location.href = "index.html";
        });
    }

    // ปุ่ม Boil Again (เริ่มใหม่ด้วยค่าเดิม)
    if (boilAgainButton) {
        boilAgainButton.addEventListener("click", () => {
            fetchAndStart(); // เรียกฟังก์ชันเดิม ค่าใน localStorage ยังอยู่
        });
    }

    // ปุ่ม Change Settings (ล้างค่าและกลับไปเลือกใหม่)
    if (changeSettingsButton) {
        changeSettingsButton.addEventListener("click", () => {
            localStorage.clear();
            window.location.href = "select.html"; // หรือ index.html
        });
    }

    // เริ่มต้น: แสดงปุ่ม Start
    toggleButtons("ready");
}