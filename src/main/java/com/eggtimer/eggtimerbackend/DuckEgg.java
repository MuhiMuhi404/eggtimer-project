package com.eggtimer.eggtimerbackend;

// 2. Inheritance (การสืบทอด)
// DuckEgg "เป็น" (is-a) Egg ชนิดหนึ่ง
public class DuckEgg extends Egg {

    // Constructor ของ DuckEgg
    public DuckEgg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        
        // เราเรียก "super" (Constructor ของคลาสแม่)
        // เพื่อส่งต่อค่าทั้ง 3 นี้กลับไปให้ abstract class Egg
        super(doneness, size, startTemp);
    }
    
    // เช่นเดียวกับ ChickenEgg คลาสนี้ว่างเปล่า
    // เพราะ "สมอง" (Logic) อยู่ที่ Strategy ครับ
}