package org.chmcc.springmvc.controller;

import org.apache.shiro.SecurityUtils;
import org.chmcc.springmvc.annotation.SystemControllerLog;
import org.chmcc.springmvc.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class IndexController {
    @Resource
    private UserService userService;


    @SystemControllerLog(description = "index")
    @RequestMapping(value = "/index")
    public String loginSuccess(HttpServletRequest req, Model model) {
        String username = (String) SecurityUtils.getSubject().getPrincipal();
        model.addAttribute("user", username);
        return "index";
    }


}
