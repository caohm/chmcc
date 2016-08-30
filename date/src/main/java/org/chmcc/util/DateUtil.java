package org.chmcc.util;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by caohm on 2016/8/24.
 */
public class DateUtil {
    /**
     * 判断是否是第二天凌晨
     *
     * @param offset 时间偏移量 MILLISECOND
     * @return boolean
     */
    public static boolean isDawn(int offset) {
        long current = System.currentTimeMillis();
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, 1);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        cal.set(Calendar.MILLISECOND, 0);
        Date dawn = cal.getTime();
        long min = dawn.getTime() - offset;
        long max = dawn.getTime() + offset;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss SSS");
        System.out.println(sdf.format(new Date(min)));
        System.out.println(sdf.format(new Date(current)));
        System.out.println(sdf.format(new Date(max)));
        return min <= current && max >= current;
    }
}
