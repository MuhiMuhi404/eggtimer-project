package com.eggtimer.eggtimerbackend;

import java.lang.Math;

public class OnsenStrategy implements CookingStrategy {

    @Override
    public int calculateTime(Egg egg) {
        double mass = getMass(egg);
        double tStart = getStartTemp(egg);
        double tInternal = getTargetTemp(egg);
        
        // *** ไฮไลท์: ใช้น้ำอุณหภูมิต่ำ (Sous-vide) ไม่ใช่ 100 องศา ***
        double tWater = getWaterTempForSousVide(egg.getDoneness());

        double K = 0.435; 

        double tempRatio = (0.76 * (tWater - tStart)) / (tWater - tInternal);
        
        // ป้องกัน Error ทางคณิตศาสตร์
        if (tempRatio <= 0) tempRatio = 1.01; 

        double logTerm = Math.log(tempRatio);
        double massTerm = Math.pow(mass, 0.6667);

        double timeInMinutes = K * massTerm * logTerm;

        return (int) Math.round(timeInMinutes * 60);
    }

    // --- Helper Methods ---

    private double getWaterTempForSousVide(Doneness doneness) {
        // ตั้งอุณหภูมิน้ำให้สูงกว่าเป้าหมาย (tInternal) เล็กน้อย (Delta T)
        switch (doneness) {
            case ONSEN:       return 68.0; 
            case SOFT_BOILED: return 68.0; 
            case MEDIUM_BOILED: return 73.0; 
            case HARD_BOILED: return 85.0; 
            default: return 73.0;
        }
    }

    private double getMass(Egg egg) {
        if (egg instanceof QuailEgg) return 12.0;
        if (egg instanceof DuckEgg) {
            switch (egg.getSize()) {
                case SMALL: return 70.0; case MEDIUM: return 80.0; case LARGE: return 95.0; default: return 80.0;
            }
        }
        switch (egg.getSize()) {
            case SMALL: return 48.0; case MEDIUM: return 58.0; case LARGE: return 68.0; default: return 58.0;
        }
    }

    private double getStartTemp(Egg egg) {
        return (egg.getStartTemp() == StartTemperature.FRIDGE) ? 4.0 : 25.0;
    }

    private double getTargetTemp(Egg egg) {
        switch (egg.getDoneness()) {
            case SOFT_BOILED: return 63.0; case MEDIUM_BOILED: return 68.0; case HARD_BOILED: return 80.0; case ONSEN: return 63.0; default: return 68.0;
        }
    }
}