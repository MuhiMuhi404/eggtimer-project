package com.eggtimer.eggtimerbackend;

// นี่คือ "Interface" (สัญญา)
// มันใช้หลัก Abstraction และ Polymorphism
public interface CookingStrategy {

    // นี่คือ "สัญญา" ที่บอกว่า
    // คลาสใดๆ ก็ตามที่ "implement" (นำไปใช้) CookingStrategy
    // "ต้อง" มี method นี้
    int calculateTime(Egg egg);
}