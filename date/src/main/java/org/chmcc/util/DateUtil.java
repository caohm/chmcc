package org.chmcc.util;

import java.util.Calendar;

/**
 * Created by caohm on 2016/8/24.
 */
public class DateUtil {
    /**
     * 判断是否是第二天凌晨
     *
     * @param offset 时间偏移量 Millis
     * @return boolean
     */
    public static boolean isDawn(int offset) {
        Calendar cal = Calendar.getInstance();
        long current = cal.getTimeInMillis();
        cal.add(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR_OF_DAY, 1);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.MILLISECOND, 0);
        long min = cal.getTimeInMillis() - offset;
        long max = cal.getTimeInMillis() + offset;
        return min <= current && max >= current;
    }
}
