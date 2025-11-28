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
    public Doneness getDoneness() { return this.doneness; }
    public EggSize getSize() { return this.size; }
    public StartTemperature getStartTemp() { return this.startTemp; }

    // --- Strategy Pattern Methods ---
    // Methodให้ Backend (Controller ที่สร้างทีหลัง) 
    // เรียกใช้เพื่อสลับวิธีการทำ
    public void setCookingStrategy(CookingStrategy strategy) {
        this.strategy = strategy;
    }

    // Methodหลักที่ Controller จะเรียกใช้
    // จะส่งต่อหน้าที่การคำนวณไปให้ strategy ที่มันถืออยู่
    public int getCookingTimeInSeconds() {
        if (this.strategy == null) {
            // ถ้าไม่มีใครตั้งค่า strategy มาให้
            // ตั้งค่าเป็น default strategy(ต้มปกติ)ให้เอง
            this.strategy = new StandardBoilingStrategy(); 
        }
        
        // ส่งต่อตัวเองให้ strategy เอาไปคำนวณ
        return this.strategy.calculateTime(this);
    }
}
