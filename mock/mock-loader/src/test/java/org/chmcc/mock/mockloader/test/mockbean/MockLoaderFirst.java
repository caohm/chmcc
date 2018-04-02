package org.chmcc.mock.mockloader.test.mockbean;

import org.chmcc.mock.mockloader.annotation.JsonFileData;
import org.chmcc.mock.mockloader.annotation.MockConfigBean;
import org.chmcc.mock.mockloader.test.service.UserService;
import org.chmcc.mock.mockloader.test.vo.User;
import org.mockito.Mockito;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

import java.util.List;

/**
 * Created by david on 2015/7/12.
 */
public class MockLoaderFirst {


    /**
     * 用户列表，从json文件中封装, 如果为List对象，必须指定itemClass，否则会报错
     */
    @JsonFileData(fileId = "user/list", itemClass = User.class)
    private List<User> userList;


    @MockConfigBean(beanId = "userServiceMock")
    public UserService mockUserService() {
        UserService userService = Mockito.mock(UserService.class);
        Mockito.doReturn(1).when(userService).countByParam(Mockito.anyMap());
        return userService;
    }


    @MockConfigBean(beanId = "userServiceMock2")
    public UserService mockUserService2() {
        UserService userService = Mockito.mock(UserService.class);
        Mockito.doAnswer(new Answer() {
            public Object answer(InvocationOnMock invocationOnMock) throws Throwable {
                User user = new User();
                user.setAge(39);
                Object param1 = invocationOnMock.getArguments()[0];
                user.setId((Integer) param1);
                user.setName("user_" + user.getId());

                return user;
            }
        }).when(userService).getUserById(Mockito.anyInt());

        return userService;
    }


    @MockConfigBean(beanId = "userServiceMock3")
    public UserService mockUserService3(@JsonFileData(fileId = "user/david") User user) {
        UserService userService = Mockito.mock(UserService.class);
        Mockito.doReturn(user).when(userService).getUserById(Mockito.anyInt());

        //从域对象中返回数据
        Mockito.doReturn(userList).when(userService).getUserList(Mockito.anyMap());
        return userService;
    }


    @MockConfigBean(beanId = "myList")
    public List mockUserService546(@JsonFileData(fileId = "user/david") User user) {
        List myList = Mockito.mock(List.class);
        Mockito.doReturn(user).when(myList).get(Mockito.anyInt());
        return myList;
    }


    public List<User> getUserList() {
        return userList;
    }

    public void setUserList(List<User> userList) {
        this.userList = userList;
    }
}
