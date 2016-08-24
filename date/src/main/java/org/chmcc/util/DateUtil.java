package org.chmcc.util;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by caohm on 2016/8/24.
 */
public class DateUtil {
    public static boolean isDawn() {
        boolean isDawn = false;
        Calendar cal = Calendar.getInstance();
        Date time = cal.getTime();
        System.out.println(time.getTime());
        return isDawn;
    }
}
