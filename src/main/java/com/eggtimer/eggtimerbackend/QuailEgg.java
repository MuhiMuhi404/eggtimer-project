package com.eggtimer.eggtimerbackend;

// 2. Inheritance (การสืบทอด)
public class QuailEgg extends Egg {

    // สังเกตว่า Constructor นี้ "แตกต่าง" จากไข่ชนิดอื่น
    // เราไม่รับ EggSize จากข้างนอก
    public QuailEgg(Doneness doneness, StartTemperature startTemp) {
        
        // เราเรียก "super" (Constructor ของคลาสแม่)
        // แต่เรา "บังคับ" (hardcode) ค่า EggSize.MEDIUM ไปเลย
        // เพราะเราตกลงกันว่าไข่นกกระทาไม่จำเป็นต้องเลือกขนาด
        super(doneness, EggSize.MEDIUM, startTemp);
    }
    
    // คลาสนี้ก็ว่างเปล่าเช่นกัน
}