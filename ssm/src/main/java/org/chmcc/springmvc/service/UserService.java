package org.chmcc.springmvc.service;

import org.chmcc.springmvc.model.User;

import java.util.List;

public interface UserService {

    List<User> getAllUsers();

    User getUserByUsername(String username);

    void addUser(User user);

    List<User> getUsersByPage(int pageSize, int currentPage);
}
