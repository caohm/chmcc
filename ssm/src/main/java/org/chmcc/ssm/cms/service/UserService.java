package org.chmcc.ssm.cms.service;

import org.chmcc.ssm.cms.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserByUsername(String username);

    void addUser(User user);

    List<User> getUsersByPage(int pageSize, int currentPage);
}
