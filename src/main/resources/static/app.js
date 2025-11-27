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

// ซ่อนตัวเลือกสำหรับไข่นกกระทา
if (window.location.pathname.endsWith('size.html')) {
    const selectedType = getSelection("type");

    if (selectedType === "quail") {
        console.log("ไข่นกกระทา: ซ่อนตัวเลือก Small และ Large");
        // ถ้าเป็นไข่นกกระทา ให้ซ่อน Small และ Large
        const smallCard = document.querySelector('.egg-card[data-name="SMALL"]');
        const largeCard = document.querySelector('.egg-card[data-name="LARGE"]');
        
        if (smallCard) smallCard.style.display = "none";
        if (largeCard) largeCard.style.display = "none";
        
        // (ลูกเล่นเสริม) เปลี่ยนข้อความของ Medium ให้ชัดเจนขึ้น
        const mediumCardText = document.querySelector('.egg-card[data-name="MEDIUM"] p');
        if (mediumCardText) mediumCardText.innerHTML = "Standard Size";
    }
}
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
    const bgMusic = document.getElementById("bg-music");

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
        
        if (bgMusic) {
        bgMusic.volume = 0.3; // ปรับเสียงเบาหน่อย (30%) จะได้ไม่หนวกหู
        bgMusic.play().catch(e => console.log("Auto-play blocked:", e));
        }

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
                // --- หยุดเพลง BGM เมื่อเสร็จ ---
                if (bgMusic) {
                    bgMusic.pause();
                    bgMusic.currentTime = 0; // รีเซ็ตเพลงไปจุดเริ่มต้น
                }
                if (alarmSound) {
                    alarmSound.play().catch(e => console.log("Auto-play blocked:", e));
                }
                if (timerDisplay) {
                    timerDisplay.textContent = "Complete! 🍳";
                    timerDisplay.style.color = "green";
                }
                if (statusText) statusText.textContent = "The egg is ready to eat.";
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
            if (statusText) statusText.textContent = "Calculating time...";
            
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
            if (statusText) statusText.textContent = "Timer running...";
            
            // เริ่มทำงาน
            runCountdown();
            toggleButtons("running");

        } catch (err) {
            console.error(err);
            if (timerDisplay) timerDisplay.textContent = "Error!";
            if (statusText) statusText.textContent = "An error occurred.Please check selected values.";
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
            if (bgMusic) bgMusic.pause(); // หยุดเพลงด้วย
            if (statusText) statusText.textContent = "Paused";
            toggleButtons("paused");
        });
    }

    // ปุ่ม Resume (นับต่อ)
    if (resumeButton) {
        resumeButton.addEventListener("click", () => {
            runCountdown();
            if (statusText) statusText.textContent = "Timer running...";
            toggleButtons("running");
        });
    }

    // ปุ่ม Cancel (ยกเลิก/กลับหน้าแรก)
    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            clearInterval(countdownInterval);
            if (bgMusic) {
            bgMusic.pause();       // หยุดเพลง
            bgMusic.currentTime = 0; // รีเซ็ต
        }
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


function startImageLoop() {
    // 1. เลือก div ที่เก็บรูปภาพด้วย ID
    const container = document.getElementById('egg-display');
    if (!container) return; // ออกจากฟังก์ชันถ้าไม่พบ id

    // 2. เลือกรูปภาพทั้งหมดภายใน div นั้น
    const images = container.getElementsByTagName('img');
    let currentIndex = 0; // เริ่มต้นที่รูปแรก (index 0)

    // ตรวจสอบว่ามีรูปภาพหรือไม่
    if (images.length === 0) return;

    // 3. ฟังก์ชันสำหรับแสดงรูปภาพถัดไป
    function showNextImage() {
        // ซ่อนรูปภาพที่กำลังแสดงอยู่ (นำคลาส active ออก)
        if (images[currentIndex]) {
            images[currentIndex].classList.remove('active');
        }

        // คำนวณ Index ถัดไป (วนกลับไป 0 เมื่อถึงรูปสุดท้าย)
        currentIndex = (currentIndex + 1) % images.length;
        
        // แสดงรูปภาพถัดไป (เพิ่มคลาส active)
        if (images[currentIndex]) {
            images[currentIndex].classList.add('active');
        }
    }

    // 4. ตั้งค่าเริ่มต้น: แสดงรูปแรก
    images[currentIndex].classList.add('active');

    // 5. ตั้งค่า Interval ให้เรียกฟังก์ชัน showNextImage ทุก 2000 มิลลิวินาที (2 วินาที)
    // เปลี่ยน 2000 เป็นตัวเลขอื่น (หน่วยเป็นมิลลิวินาที) เพื่อเปลี่ยนความเร็ว
    setInterval(showNextImage, 2000); 
}

// 6. เรียกฟังก์ชันเมื่อหน้าเว็บโหลดเสร็จ
document.addEventListener('DOMContentLoaded', startImageLoop);

// ดึง Modal element มาเก็บไว้
var modal = document.getElementById("myModal");

// 💡 ฟังก์ชันใหม่: สลับสถานะ (Toggle)
function toggleModal() {
    // 1. ตรวจสอบสถานะปัจจุบัน
    if (modal.style.display === "block") {
        // ถ้ากำลังแสดงอยู่ (block) ให้เปลี่ยนเป็นซ่อน (none)
        modal.style.display = "none";
    } else {
        // ถ้ากำลังซ่อนอยู่ (none, หรือว่างเปล่าในตอนเริ่มต้น) ให้เปลี่ยนเป็นแสดง (block)
        modal.style.display = "block";
    }
}

// 💡 ฟังก์ชันปิด Modal โดยปุ่ม X (ถ้ายังต้องการให้ปุ่ม X ทำงานแยก)
function closeModalOnly() {
    modal.style.display = "none";
}

// 💡 ปิดกล่องข้อความเมื่อคลิกนอก Modal (ยังคงทำงานเหมือนเดิม)
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}