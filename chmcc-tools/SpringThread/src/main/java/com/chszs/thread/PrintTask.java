package com.chszs.thread;

import org.chmcc.util.DateUtil;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentLinkedQueue;

public class PrintTask implements Runnable {
    String name;
    ConcurrentLinkedQueue queue = new ConcurrentLinkedQueue();

    public PrintTask(String name, List<String> list) {
        this.name = name;
        for (String ip : list) {
            Map map = new HashMap();
            map.put("ip", ip);
            map.put("offset", 0);
            queue.offer(map);
        }
    }

    @Override
    public void run() {
        while (true) {
            Map map = (Map) queue.poll();
            System.out.println("offset" + map.get("offset"));
            while (DateUtil.isDawn(5000)) {
                map.put("offset", 0);
                System.out.println("-------------------------------------------------------------------" + map.get("offset"));
                queue.offer(map);
                continue;
            }
            try {
                Thread.sleep(500);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            map.put("offset", System.currentTimeMillis());
            queue.offer(map);
        }
    }

}
