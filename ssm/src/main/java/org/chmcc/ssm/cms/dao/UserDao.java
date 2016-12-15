package org.chmcc.ssm.cms.dao;

import com.github.miemiedev.mybatis.paginator.domain.PageBounds;
import org.apache.ibatis.annotations.Param;
import org.chmcc.ssm.cms.model.User;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("userDao")
public interface UserDao {

    List<User> getAllUsers(PageBounds pageBounds);

    @Cacheable(value = "username", key = "#username")
    User getUserByUsername(@Param("username") String username);

    void addUser(User user);

}
