package com.eggtimer.eggtimerbackend;

// เราต้อง import เครื่องมือของ Spring ที่เราจะใช้
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

// (เราจะเพิ่ม import อีก... แต่เอาแค่นี้ก่อน)


/**
 * นี่คือ Controller (พนักงานต้อนรับ)
 * หน้าที่ของมันคือรอรับคำสั่ง (Request) จาก Frontend
 * แล้วส่งคำตอบ (Response) กลับไป
 */
@RestController
@RequestMapping("/api")
public class EggTimerController {

    // (เราจะสร้าง method ข้างในนี้)
    // 1. @GetMapping:
    // บอก Spring ว่า method นี้จะ "ดักฟัง" คำขอแบบ GET
    // ที่ส่งมายัง URL: /api/calculateTime
    @GetMapping("/calculateTime")
    public int getBoilingTime(
            // 1. ดักจับตัวแปร "type" จาก URL
            @RequestParam String type, 
            
            // 2. ดักจับตัวแปร "doneness" จาก URL
            @RequestParam Doneness doneness,
            
            // 3. ดักจับตัวแปร "size" จาก URL
            @RequestParam EggSize size,
            
            // 4. ดักจับตัวแปร "temp" จาก URL
            @RequestParam StartTemperature temp,
            
            // 5. ดักจับตัวแปร "strategy" จาก URL
            @RequestParam String strategyName
    ) {
        
        // (เราจะใส่ Logic ทั้งหมดของเราที่นี่)
        // ----- 1. สร้าง EGG (ใช้ Inheritance) -----
        Egg egg; // สร้าง "กล่อง" เปล่าๆ ที่เก็บไข่ชนิดใดก็ได้

        if (type.equals("chicken")) {
            egg = new ChickenEgg(doneness, size, temp);
        } 
        else if (type.equals("duck")) {
            egg = new DuckEgg(doneness, size, temp);
        } 
        else { 
            // ถ้าไม่ใช่ "chicken" หรือ "duck" ก็ให้เป็น "quail"
            egg = new QuailEgg(doneness, temp); // <-- Error จะเกิดที่นี่
        }

        // ----- 2. สร้าง STRATEGY (ใช้ Polymorphism) -----
        CookingStrategy strategy; // สร้าง "กล่อง" เปล่าๆ ที่เก็บกลยุทธ์ใดก็ได้

        if (strategyName.equals("steam")) {
            strategy = new SteamingStrategy();
        } 
        else if (strategyName.equals("onsen")) {
            strategy = new OnsenStrategy();
        } 
        else {
            // ถ้าไม่ใช่ "steam" หรือ "onsen"
            // ก็ให้ใช้ "ต้มปกติ" (standard) เป็นค่า default
            strategy = new StandardBoilingStrategy();
        }

        // ----- 3. ประกอบร่างและส่งค่ากลับ -----
        // "ฉีด" strategy ที่เลือก เข้าไปใน egg
        egg.setCookingStrategy(strategy);

        // สั่งให้ egg คำนวณเวลา (โดยใช้ strategy ที่เพิ่งฉีดเข้าไป)
        int totalSeconds = egg.getCookingTimeInSeconds();

        // @RestController จะแปลง int นี้เป็น JSON ส่งกลับไป
        return totalSeconds;
    }

}