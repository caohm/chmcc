package org.chmcc.mock.mockloader.test;

import org.chmcc.mock.mockloader.test.service.UserService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;

/**
 * Created by david on 2015/7/12.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath*:spring-config.xml"})
public class MainTest {


    @Resource(name = "userServiceMock")
    private UserService userService;

    @Resource(name = "userServiceMock2")
    private UserService userService2;


    @Resource(name = "userServiceMock3")
    private UserService userService3;

    @Resource(name = "myList")
    private List myList;

    /**
     * 测试获取总数
     */
    @Test
    public void testCountByParam() {
        System.out.println("testCountByParam start");
        int count = userService.countByParam(new HashMap<String, Object>());
        System.out.println(count);
        System.out.println("testCountByParam end");

    }

    /**
     * 测试根据传入参数动态返回数据
     */
    @Test
    public void testDynamicGetUserById() {
        System.out.println("testDynamicGetUserById start");
        System.out.println(userService2.getUserById(123));
        System.out.println(userService2.getUserById(5566));
        System.out.println("testDynamicGetUserById end");
    }


    /**
     * 测试通过
     */
    @Test
    public void testGetUserByIdFromJsonFile() {
        System.out.println("testGetUserByIdFromJsonFile start");
        System.out.println(userService3.getUserById(1));
        System.out.println("testGetUserByIdFromJsonFile end");

    }


    @Test
    public void testGetUserListFromJsonFile() {
        System.out.println("testGetUserListFromJsonFile start");
        System.out.println(userService3.getUserList(new HashMap<String, Object>()));
        System.out.println("testGetUserListFromJsonFile end");

    }


    @Test
    public void testList() {
        System.out.println(myList.get(39849));
    }
}
