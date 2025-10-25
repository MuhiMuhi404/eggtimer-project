package com.eggtimer.eggtimerbackend;

// 4. Polymorphism (การพ้องรูป)
// นี่คือกลยุทธ์ "ที่สอง" ของเราที่ implement สัญญาเดียวกัน
public class SteamingStrategy implements CookingStrategy {

    @Override
    public int calculateTime(Egg egg) {
        int baseTime = 0; // เวลาเป็นวินาที

        // --- Logic สำหรับไข่ไก่ (นึ่ง) ---
        if (egg instanceof ChickenEgg) {
            switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 270; break; // 4.5 นาที
                case MEDIUM_BOILED: baseTime = 390; break; // 6.5 นาที
                case HARD_BOILED: baseTime = 540; break; // 9 นาที
                case ONSEN: baseTime = 900; break; // (สมมติ)
            }
            if (egg.getSize() == EggSize.LARGE) baseTime += 60;
            if (egg.getSize() == EggSize.SMALL) baseTime -= 30;
        
        // --- Logic สำหรับไข่เป็ด (นึ่ง) ---
        } else if (egg instanceof DuckEgg) {
             switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 390; break; // 6.5 นาที
                case MEDIUM_BOILED: baseTime = 510; break; // 8.5 นาที
                case HARD_BOILED: baseTime = 660; break; // 11 นาที
                case ONSEN: baseTime = 1400; break;
            }
             if (egg.getSize() == EggSize.LARGE) baseTime += 90;
             if (egg.getSize() == EggSize.SMALL) baseTime -= 45;

        // --- Logic สำหรับไข่นกกระทา (นึ่ง) ---
        } else if (egg instanceof QuailEgg) {
            switch (egg.getDoneness()) {
                case SOFT_BOILED: baseTime = 100; break; // ~1.5 นาที
                case MEDIUM_BOILED: baseTime = 130; break; // ~2 นาที
                case HARD_BOILED: baseTime = 160; break; // ~2.5 นาที
                case ONSEN: baseTime = 350; break;
            }
        }

        // --- ปรับเวลาตามอุณหภูมิ (ใช้ร่วมกัน) ---
        if (egg.getStartTemp() == StartTemperature.FRIDGE) {
            baseTime += 45; // นึ่งอาจจะใช้เวลาเพิ่มน้อยกว่าต้ม
        }

        return baseTime;
    }
}