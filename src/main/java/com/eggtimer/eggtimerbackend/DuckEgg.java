package com.eggtimer.eggtimerbackend;

// Inheritance
public class DuckEgg extends Egg {

    // Constructor ของ DuckEgg
    public DuckEgg(Doneness doneness, EggSize size, StartTemperature startTemp) {
        
        // เพื่อส่งต่อค่าทั้ง 3 นี้กลับไปให้ abstract class Egg
        super(doneness, size, startTemp);
    }
    
    // Logic อยู่ที่ Strategy 
}