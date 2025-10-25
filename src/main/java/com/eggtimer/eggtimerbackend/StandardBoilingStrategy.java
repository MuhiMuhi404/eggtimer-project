package com.eggtimer.eggtimerbackend;

// 4. Polymorphism (การพ้องรูป)
// เรา "implements" (นำสัญญามาปฏิบัติ) จาก CookingStrategy
public class StandardBoilingStrategy implements CookingStrategy {

    // เราต้อง @Override (เขียนทับ) method ที่สัญญากับ interface ไว้
    @Override
    public int calculateTime(Egg egg) {
        int baseTime = 0; // เวลาเป็นวินาที

        // --- Logic สำหรับไข่ไก่ ---
        // เราใช้ "instanceof" เพื่อเช็กว่าไข่ที่ส่งเข้ามาเป็นชนิดไหน
        if (egg instanceof ChickenEgg) {
            switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 300; break; // 5 นาที
                case MEDIUM_BOILED: baseTime = 420; break; // 7 นาที
                case HARD_BOILED: baseTime = 600; break; // 10 นาที
                case ONSEN: baseTime = 1000; break; // (สมมติ)
            }
            // ปรับเวลาตามขนาด (อ่านค่าจาก Getters)
            if (egg.getSize() == EggSize.LARGE) baseTime += 60;
            if (egg.getSize() == EggSize.SMALL) baseTime -= 30;

        // --- Logic สำหรับไข่เป็ด (ใช้เวลานานกว่า) ---
        } else if (egg instanceof DuckEgg) {
            switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 420; break; // 7 นาที
                case MEDIUM_BOILED: baseTime = 540; break; // 9 นาที
                case HARD_BOILED: baseTime = 720; break; // 12 นาที
                case ONSEN: baseTime = 1500; break;
            }
            if (egg.getSize() == EggSize.LARGE) baseTime += 90;
            if (egg.getSize() == EggSize.SMALL) baseTime -= 45;

        // --- Logic สำหรับไข่นกกระทา (ใช้เวลาน้อยกว่า) ---
        } else if (egg instanceof QuailEgg) {
            switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 120; break; // 2 นาที
                case MEDIUM_BOILED: baseTime = 150; break; // 2.5 นาที
                case HARD_BOILED: baseTime = 180; break; // 3 นาที
                case ONSEN: baseTime = 400; break;
            }
            // ไม่ต้องเช็ก Size
        }

        // --- ปรับเวลาตามอุณหภูมิ (ใช้ร่วมกัน) ---
        // (อ่านค่าจาก Getters)
        if (egg.getStartTemp() == StartTemperature.FRIDGE) {
            baseTime += 60; // บวก 1 นาที (โดยประมาณ) ถ้าไข่มาจากตู้เย็น
        }

        return baseTime;
    }
}