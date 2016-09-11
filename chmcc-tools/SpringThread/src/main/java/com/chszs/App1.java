package com.chszs;

import com.chszs.thread.PrintTask;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.ArrayList;
import java.util.List;

public class App1 {

    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("Spring-Config.xml");
        ThreadPoolTaskExecutor taskExecutor = (ThreadPoolTaskExecutor) ctx.getBean("taskExecutor");
        List list = new ArrayList();
        list.add("a");
        list.add("b");
        list.add("c");
        taskExecutor.execute(new PrintTask("Thread 1", list));
        list.add("d");
        list.add("e");
        list.add("f");
        taskExecutor.execute(new PrintTask("Thread 2", list));
        list.add("g");
        list.add("h");
        list.add("i");
        taskExecutor.execute(new PrintTask("Thread 3", list));
        list.add("j");
        list.add("k");
        list.add("l");
        taskExecutor.execute(new PrintTask("Thread 4", list));
        list.add("m");
        list.add("n");
        list.add("o");
        taskExecutor.execute(new PrintTask("Thread 5", list));
        // 检查活动的线程，如果活动线程数为0则关闭线程池
//		for(;;){
//			int count = taskExecutor.getActiveCount();
//			System.out.println("Active Threads : " + count);
//			try{
//				Thread.sleep(1000);
//				System.out.println(System.currentTimeMillis());
//			}catch(InterruptedException e){
//				e.printStackTrace();
//			}
//			if(count==0){
//				taskExecutor.shutdown();
//				break;
//			}
//		}
    }

}
