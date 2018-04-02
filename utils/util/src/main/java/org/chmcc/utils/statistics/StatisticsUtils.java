package org.chmcc.utils.statistics;


import org.apache.commons.lang.ArrayUtils;

import java.math.BigDecimal;

public class StatisticsUtils {
    public static void main(String[] args) {
        Double[] a = {2.0, 2.0};

        print(max(a));
        print(min(a));
        print(mean(a));
        print(median(a));
        print(quartile1(a));
        print(quartile3(a));
        print(mode(a));
        print(standardDeviation(a));
    }

    public static void print(Double a) {
        System.out.println(a);
    }

    public static double convert(Double d) {
        BigDecimal bd = new BigDecimal(d).setScale(4, BigDecimal.ROUND_HALF_UP);
        return bd.doubleValue();
    }

    /**
     * 平均值
     *
     * @param a
     * @return
     */
    public static double avg(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double sum = 0.0;
        for (int i = 0; i < a.length; i++) {
            sum += a[i];
        }
        return convert(sum / a.length);
    }

    /**
     * 最大值
     *
     * @param a
     * @return
     */
    public static double max(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double max = a[0];
        for (int i = 0; i < a.length; i++) {
            if (a[i] > max) {
                max = a[i];
            }
        }
        return max;
    }

    /**
     * 最小值
     *
     * @param a
     * @return
     */
    public static double min(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double min = a[0];
        for (int i = 0; i < a.length; i++) {
            if (a[i] < min) {
                min = a[i];
            }
        }

        return min;
    }

    /**
     * 平均值
     *
     * @param a
     * @return
     */
    private static double mean(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double mean = a[0];
        double sum = 0.0;
        double total = 0.0;
        for (int i = 0; i < a.length; i++) {
            sum += a[i];
            total++;
        }
        mean = sum / total;


        return convert(mean);
    }

    /**
     * 中位数
     *
     * @param a
     * @return
     */
    public static double median(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }

        double median = a[0];
        if (a.length % 2 == 0) {
            //even
            median = (double) (a[(a.length) / 2]);
            median += (double) (a[(a.length) / 2 - 1]);
            median /= 2;
        } else {
            //odd
            median = (double) a[(a.length - 1) / 2];
        }


        return median;
    }

    public static double quartile1(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double median = a[0];
        int length = 0;

        if (a.length % 2 == 1) {
            //odd
            Double[] x = new Double[(a.length + 1) / 2];
            for (int i = 0; i < x.length; i++) {
                x[i] = a[i];
            }
            median = median(x);
            return median;
        } else {
            //even
            Double[] x = new Double[(a.length) / 2];
            for (int i = 0; i < x.length; i++) {
                x[i] = a[i];
            }
            median = median(x);
            return convert(median);
        }

    }

    public static double quartile3(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double median = median(a);
        int length = 0;

        if (a.length % 2 == 1) {
            //odd
            Double[] x = new Double[(a.length + 1) / 2];
            for (int i = x.length - 1; i >= 0; i--) {
                x[i] = a[i + x.length - 1];
            }
            median = median(x);
            return median;
        } else {
            //even
            Double[] x = new Double[(a.length) / 2];
            for (int i = x.length - 1; i >= 0; i--) {
                x[i] = a[i + x.length];
            }
            median = median(x);
            return median;
        }
    }

    /**
     * 众数
     *
     * @param a
     * @return
     */
    public static double mode(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        int most = 0;
        double z = 0;
        int amount = 0;
        double x = 0;
        for (int i = 0; i < a.length; i++) {
            amount = 0;
            z = a[i];
            for (int c = 0; c < a.length; c++) {
                if (z == a[c]) {
                    amount++;
                }
            }
            if (amount > most) {
                most = amount;
                x = a[i];
            }
        }


        return x;
    }

    /**
     * 标准差
     *
     * @param a
     * @return
     */
    public static double standardDeviation(Double[] a) {
        if (ArrayUtils.isEmpty(a) || a[0] == null) {
            return 0.0;
        }
        double dev = 0.0;
        double avg = mean(a);
        for (int i = 0; i < a.length; i++) {
            dev += (a[i] - avg) * (a[i] - avg);
        }

        dev = dev / (a.length - 1);

        dev = Math.sqrt(dev);

        return dev;

    }
}