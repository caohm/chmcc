package org.chmcc.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;


public class StringUtils {

    public static String fillStringByArgs(String str, Object... arr) {
        Matcher m = Pattern.compile("\\{(\\d)\\}").matcher(str);
        while (m.find()) {
            str = str.replace(m.group(), String.valueOf(arr[Integer.parseInt(m.group(1))]));
        }
        return str;

    }

    public static void main(String[] args) {
        String key = "dc.mdc.statistic.time:{0}.group:{1}";
        for (int i = 0; i < 100; i++) {
            String fkey = fillStringByArgs(key, "201704202234", "6067");
            System.out.println("fkey = [" + fkey + "]");
        }

    }
}
