package com.eggtimer.eggtimerbackend;

// 1. Abstraction
public abstract class Egg {

    // 2. Encapsulation
    // ซ่อนข้อมูลไว้เป็น private ไม่ให้ภายนอกมาแก้ไขมั่วได้
    private Doneness doneness;
    private EggSize size;
    private StartTemperature startTemp;

    // 5. Composition (การองค์ประกอบ)
    // Egg "มี" (has-a) CookingStrategy
    private CookingStrategy strategy;

    // นี่คือ Constructor:
    // เป็น "โรงงาน" ที่บังคับว่าตอนสร้างไข่ (เช่น ChickenEgg)
    public Egg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        this.doneness = doneness;
        this.size = size;
        this.startTemp = startTemp;
    }

    // --- Getters ---
    // (Encapsulation) อนุญาตให้ภายนอก "อ่าน" ค่าได้เท่านั้น
    public Doneness getDoneness() { return this.doneness; }
    public EggSize getSize() { return this.size; }
    public StartTemperature getStartTemp() { return this.startTemp; }

    // --- Strategy Pattern Methods ---
    
    // Method นี้ให้ Backend (Controller ที่เราจะสร้างทีหลัง) 
    // เรียกใช้เพื่อ "สลับ" กลยุทธ์ (เช่น จาก "ต้ม" เป็น "นึ่ง")
    public void setCookingStrategy(CookingStrategy strategy) {
        this.strategy = strategy;
    }

    // Method นี้คือหัวใจหลักที่ Controller จะเรียกใช้
    // มันจะ "ส่งต่อ" (delegate) หน้าที่การคำนวณไปให้ strategy ที่มันถืออยู่
    public int getCookingTimeInSeconds() {
        if (this.strategy == null) {
            // ถ้าไม่มีใครตั้งค่า strategy มาให้
            // เราจะตั้งค่า default strategy (ต้มปกติ) ให้เอง
            this.strategy = new StandardBoilingStrategy(); 
        }
        
        // ส่งต่อ "ตัวมันเอง" (this) ให้ strategy เอาไปคำนวณ
        return this.strategy.calculateTime(this);
    }
}
