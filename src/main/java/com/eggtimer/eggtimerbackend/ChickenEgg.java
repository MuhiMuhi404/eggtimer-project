package com.eggtimer.eggtimerbackend;

// Inheritance
public class ChickenEgg extends Egg {

    // Constructor ของ ChickenEgg
    public ChickenEgg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        
        // ส่งต่อค่าทั้ง 3 นี้กลับไปให้ abstract class Egg
        super(doneness, size, startTemp);
    }
    
    // Logic ทั้งหมดไปอยู่ที่ Strategy
}