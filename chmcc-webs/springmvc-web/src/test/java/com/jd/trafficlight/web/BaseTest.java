package com.jd.trafficlight.web;

import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

/**
 * 测试用例基类
 * 
 * @author zhuxiaojie
 * 
 */
public class BaseTest {

    protected static ApplicationContext appContext;

    @BeforeClass
    public static void setUp() throws Exception {
        try {
            long start = System.currentTimeMillis();
            System.out.println("正在加载配置文件...");

            appContext = new ClassPathXmlApplicationContext(new String[] { "ump-statistics.xml" });

            System.out.println("配置文件加载完毕,耗时：" + (System.currentTimeMillis() - start));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    protected boolean setProtected() {
        return false;
    }

    @Before
    public void autoSetBean() {
        appContext.getAutowireCapableBeanFactory().autowireBeanProperties(this, DefaultListableBeanFactory.AUTOWIRE_BY_NAME, false);
    }

    @AfterClass
    public static void tearDown() throws Exception {
        System.out.println("测试用例结束");
    }

    @Test
    public void hold() throws InterruptedException {
        Thread.sleep(Long.MAX_VALUE);
    }
}
