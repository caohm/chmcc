package org.chmcc.ssm.cms.service;

import org.chmcc.ssm.cms.model.User;

import java.util.List;

public interface UserService {

    public List<User> getAllUsers();

    public User getUserByUsername(String username);

    public void addUser(User user);

    public List<User> getUsersByPage(int pageSize, int currentPage);
}
