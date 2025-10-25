package com.eggtimer.eggtimerbackend;

// 4. Polymorphism (การพ้องรูป)
// นี่คือกลยุทธ์ "ที่สาม" ของเราที่ implement สัญญาเดียวกัน
public class OnsenStrategy implements CookingStrategy {

    @Override
    public int calculateTime(Egg egg) {
        
        // --- Logic สำหรับการต้มแบบออนเซ็น (Sous-vide) ---
        // การต้มแบบนี้มักจะใช้อุณหภูมิต่ำ (เช่น 63-75°C)
        // แต่ใช้เวลานานมาก และไม่ค่อยขึ้นกับขนาดหรืออุณหภูมิเริ่มต้น
        
        int baseTime = 0; // เวลาเป็นวินาที

        // Logic นี้จะแตกต่างไปเลย
        // เราจะสมมติว่าถ้าผู้ใช้เลือก "Onsen" (จาก Enum Doneness)
        // เขาหมายถึงไข่แบบ Onsen Tamago (ไข่ขาวเป็นวุ้น ไข่แดงสุก)
        // ซึ่งมักจะใช้เวลาคงที่ ไม่ว่าไข่จะเป็นชนิดไหน
        
        switch (egg.getDoneness()) {
            case ONSEN:
                // สมมติว่าต้มที่ 75°C
                baseTime = 900; // 15 นาที 
                break;
            case SOFT_BOILED:
                // ถ้าเลือก Soft-boiled แต่วิธี Onsen (เช่น 63°C)
                baseTime = 3600; // 1 ชั่วโมง
                break;
            case MEDIUM_BOILED:
                // ต้มแบบ Sous-vide ที่อุณหภูมิสูงขึ้น (เช่น 80°C)
                baseTime = 1800; // 30 นาที
                break;
            case HARD_BOILED:
                // ต้มแบบ Sous-vide (เช่น 90°C)
                baseTime = 2700; // 45 นาที
                break;
        }

        // การต้มแบบ Sous-vide/Onsen มักจะไม่ต้องปรับเวลาตามขนาดหรืออุณหภูมิเริ่มต้น
        // เพราะเป็นการ "แช่" จนอุณหภูมิถึงจุดที่ต้องการ
        // ดังนั้น เราจึง "ไม่" ใส่ if-check สำหรับ getSize() หรือ getStartTemp() ที่นี่
        
        return baseTime;
    }
}