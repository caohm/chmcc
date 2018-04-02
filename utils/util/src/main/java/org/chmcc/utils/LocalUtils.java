package org.chmcc.utils;

import java.util.Calendar;
import java.util.Date;

public class LocalUtils {

    public static Date localDate(Date date) {

        if (date == null) {
            date = new Date();
        }
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        cal.set(Calendar.YEAR, 2017);
        cal.set(Calendar.MONTH, 4);
        cal.set(Calendar.DAY_OF_MONTH, 20);
        cal.set(Calendar.HOUR_OF_DAY, 15);
//        int minute = cal.get(Calendar.MINUTE);
//        cal.set(Calendar.MINUTE, 50 + minute % 10);
        return cal.getTime();
    }
}
