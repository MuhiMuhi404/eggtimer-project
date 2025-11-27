package com.eggtimer.eggtimerbackend;

// import เครื่องมือของ Spring
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


/* Controller รอรับคำสั่ง (Request) จาก Frontend แล้วส่งคำตอบ (Response) กลับไป */
@RestController
@RequestMapping("/api")
public class EggTimerController {

    // สร้าง method ข้างใน
    // 1. @GetMapping:
    // บอก Spring ว่า method นี้จะรอรับคำขอแบบ GET
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
        
        // Logic ทั้งหมด
        // 1. สร้าง EGG (ใช้ Inheritance)
        Egg egg; // สร้างกล่องเปล่าๆ ที่เก็บไข่ชนิดใดก็ได้

        if (type.equals("chicken")) {
            egg = new ChickenEgg(doneness, size, temp);
        } 
        else if (type.equals("duck")) {
            egg = new DuckEgg(doneness, size, temp);
        } 
        else { 
            egg = new QuailEgg(doneness, temp); 
        }

        //2. สร้าง STRATEGY (ใช้ Polymorphism)
        CookingStrategy strategy; // สร้างกล่องเปล่าๆ ที่เก็บวิธีการใดก็ได้

        if (strategyName.equals("steam")) {
            strategy = new SteamingStrategy();
        } 
        else if (strategyName.equals("onsen")) {
            strategy = new OnsenStrategy();
        } 
        else {
            //standardเป็นค่า default
            strategy = new StandardBoilingStrategy();
        }

        // 3. ประกอบร่างและส่งค่ากลับ
        // นำstrategy ที่เลือก เข้าไปใน egg
        egg.setCookingStrategy(strategy);

        // สั่งให้ egg คำนวณเวลา (โดยใช้ strategy ที่เพิ่งนำเข้าไป)
        int totalSeconds = egg.getCookingTimeInSeconds();

        // @RestController จะแปลง int นี้เป็น JSON ส่งกลับไป
        return totalSeconds;
    }

}