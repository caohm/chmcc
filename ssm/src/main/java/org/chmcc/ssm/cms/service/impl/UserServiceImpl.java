package org.chmcc.ssm.cms.service.impl;

import com.github.miemiedev.mybatis.paginator.domain.Order;
import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.chmcc.ssm.cms.dao.UserDao;
import org.chmcc.ssm.cms.model.User;
import org.chmcc.ssm.cms.service.UserService;
import org.chmcc.ssm.cms.shiro.PasswordHelper;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("userService")
public class UserServiceImpl implements UserService {


    private UserDao userDao;
    private PasswordHelper passwordHelper;

    @Override

    @Cacheable(value = "username", key = "#username")
    public User getUserByUsername(String username) {
        System.out.println("---- --" + username + "---- --");
        return userDao.getUserByUsername(username);
    }

    @Override
    public void addUser(User user) {
        // TODO Auto-generated method stub
        passwordHelper.encryptPassword(user);
        userDao.addUser(user);
    }

    public List<User> getAllUsers() {
        return userDao.getAllUsers(null);
    }

    @Override
    public List<User> getUsersByPage(int currentPage, int pageSize) {
        String sort = "username.desc";
        PageBounds bounds = new PageBounds(currentPage, pageSize, Order.formString(sort));
        List<User> users = userDao.getAllUsers(bounds);

        return users;
    }


    public UserDao getUserDao() {
        return userDao;
    }

    @Resource
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public PasswordHelper getPasswordHelper() {
        return passwordHelper;
    }

    @Resource
    public void setPasswordHelper(PasswordHelper passwordHelper) {
        this.passwordHelper = passwordHelper;
    }


}
