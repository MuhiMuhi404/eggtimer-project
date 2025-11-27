package com.eggtimer.eggtimerbackend;

// Inheritance (การสืบทอด)
public class QuailEgg extends Egg {

    // Constructorจะไม่รับ EggSize จากข้างนอก
    public QuailEgg(Doneness doneness, StartTemperature startTemp) {
        
        // เรียกsuper(Constructor ของคลาสแม่)
        // แต่บังคับEggSize.MEDIUM เพราะไข่นกกระทาไม่จำเป็นต้องเลือกขนาด
        super(doneness, EggSize.MEDIUM, startTemp);
    }
}