package org.chmcc.util;

import org.apache.commons.collections.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by caohm on 2016/8/24.
 */
public class run {

    public static void main(String[] args) {
//        DateUtil.isDawn(5);
        List ipList = new ArrayList();
        for (int i = 0; i < 51; i++) {
            ipList.add(i);
        }
        int per = 10;

        int size = ipList.size();
        int s = size / per;
        int y = size % per;
        for (int i = 0; i < s + 1; i++) {
            List list;
            if (i == s) {
                list = ipList.subList(i * per, size);
            } else {
                list = ipList.subList(i * per, (i + 1) * per);
            }
            if (CollectionUtils.isNotEmpty(list)) {
                System.out.println(list);
            }
        }
    }

}
