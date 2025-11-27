package com.eggtimer.eggtimerbackend;

// Abstraction
public abstract class Egg {

    // Encapsulation
    // ซ่อนข้อมูลไว้เป็น private 
    private Doneness doneness;
    private EggSize size;
    private StartTemperature startTemp;

    // Composition
    private CookingStrategy strategy;

    // Constructor:
    public Egg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        this.doneness = doneness;
        this.size = size;
        this.startTemp = startTemp;
    }

    // --- Getters ---
    // (Encapsulation) อนุญาตให้ภายนอกอ่าน ค่าได้เท่านั้น
    public Doneness getDoneness() { return this.doneness; }
    public EggSize getSize() { return this.size; }
    public StartTemperature getStartTemp() { return this.startTemp; }

    // --- Strategy Pattern Methods ---
    // Methodให้ Backend (Controller ที่สร้างทีหลัง) 
    // เรียกใช้เพื่อสลับวิธีการทำ (เช่น จาก "ต้ม" เป็น "นึ่ง")
    public void setCookingStrategy(CookingStrategy strategy) {
        this.strategy = strategy;
    }

    // Methodหลักที่ Controller จะเรียกใช้
    // มันจะส่งต่อ หน้าที่การคำนวณไปให้ strategy ที่มันถืออยู่
    public int getCookingTimeInSeconds() {
        if (this.strategy == null) {
            // ถ้าไม่มีใครตั้งค่า strategy มาให้
            // เราจะตั้งค่า default strategy (ต้มปกติ) ให้เอง
            this.strategy = new StandardBoilingStrategy(); 
        }
        
        // ส่งต่อตัวเองให้ strategy เอาไปคำนวณ
        return this.strategy.calculateTime(this);
    }
}
