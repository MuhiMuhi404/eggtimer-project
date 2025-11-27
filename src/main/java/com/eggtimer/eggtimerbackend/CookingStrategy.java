package com.eggtimer.eggtimerbackend;

// อยู่ในรูปของ Interface
// ใช้ Abstraction และ Polymorphism
public interface CookingStrategy {
    int calculateTime(Egg egg);
}