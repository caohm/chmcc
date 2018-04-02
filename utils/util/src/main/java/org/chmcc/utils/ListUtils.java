package org.chmcc.utils;

import java.util.ArrayList;
import java.util.List;

public class ListUtils {

    public static <T> List<List<T>> splitList(List<T> list, int pageSize) {


        List<List<T>> listArray = new ArrayList<List<T>>(); // 创建list数组

        int listSize = list.size();
        int page = listSize / pageSize + (listSize % pageSize > 0 ? 1 : 0);
        for (int i = 0; i < page; i++) {
            if (i == page - 1) {
                listArray.add(list.subList(i * pageSize, listSize));
            } else {
                listArray.add(list.subList(i * pageSize, (i + 1) * pageSize));
            }
        }
        return listArray;
    }

    public static void main(String[] s) {

        System.out.println(31 / 5 + 1);
    }

    public static Double[] toArray(List<Double> list) {
        Double[] arr = new Double[list.size()];
        for (int i = 0; i < list.size(); i++) {
            Double t = list.get(i);
            arr[i] = t;
        }
        return arr;
    }

    public static Double[] toArray(List<Double> list, boolean init) {
        Double[] arr = new Double[list.size()];
        for (int i = 0; i < list.size(); i++) {
            Double t = list.get(i);
            if (init && t == null) {
                t = 0D;
            }
            arr[i] = t;
        }
        return arr;
    }
}
