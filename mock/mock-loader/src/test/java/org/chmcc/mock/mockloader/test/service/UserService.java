package org.chmcc.mock.mockloader.test.service;

import org.chmcc.mock.mockloader.test.vo.User;

import java.util.List;
import java.util.Map;

/**
 * Created by david on 2015/7/12.
 */
public interface UserService {


    /**
     * 计算总数
     * @param param
     * @return
     */
    public int countByParam(Map<String,Object> param);


    /**
     * 根据用户id查询用户
     * @param id
     * @return
     */
    public User getUserById(Integer id);



    /**
     * 查询用户列表
     * @param param
     * @return
     */
    public List<User> getUserList(Map<String,Object> param);


}
