package com.eggtimer.eggtimerbackend;

// 2. Inheritance (การสืบทอด)
// เราประกาศว่า ChickenEgg "เป็น" (is-a) Egg ชนิดหนึ่ง
public class ChickenEgg extends Egg {

    // นี่คือ Constructor ของ ChickenEgg
    public ChickenEgg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        
        // เราต้องเรียก "super" ( Constructor ของคลาสแม่)
        // เพื่อส่งต่อค่าทั้ง 3 นี้กลับไปให้ abstract class Egg
        super(doneness, size, startTemp);
    }
    
    // สังเกตว่าคลาสนี้ "ว่างเปล่า" ไม่มี logic อะไรเลย
    // เพราะ "สมอง" (Logic) ทั้งหมดถูกย้ายไปอยู่ที่ Strategy หมดแล้ว!
}