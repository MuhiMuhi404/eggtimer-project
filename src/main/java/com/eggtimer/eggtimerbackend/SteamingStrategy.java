package com.eggtimer.eggtimerbackend;

import java.lang.Math;

public class SteamingStrategy implements CookingStrategy {

    @Override
    public int calculateTime(Egg egg) {
        double mass = getMass(egg);
        double tStart = getStartTemp(egg);
        double tInternal = getTargetTemp(egg);
        double tWater = 100.0; // ไอน้ำ

        // ปรับค่า K สำหรับการนึ่ง
        double K = 0.45; 

        double tempRatio = (0.76 * (tWater - tStart)) / (tWater - tInternal);
        double logTerm = Math.log(tempRatio);
        double massTerm = Math.pow(mass, 0.6667);

        double timeInMinutes = K * massTerm * logTerm;

        return (int) Math.round(timeInMinutes * 60);
    }

    // Helper Methods
    
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
            case SOFT_BOILED: return 63.0; case MEDIUM_BOILED: return 70.0; case HARD_BOILED: return 85.0;default: return 70.0;
        }
    }
}