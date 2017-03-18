package org.chmcc.springmvc.controller;

import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.chmcc.springmvc.annotation.SystemControllerLog;
import org.chmcc.springmvc.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/")
public class LoginController {
    @Resource
    private UserService userService;


    @SystemControllerLog(description = "login")
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String toLoginPage() {
        return "login";
    }

    @SystemControllerLog(description = "unauthorized")
    @RequestMapping(value = "/unauthorized", method = RequestMethod.GET)
    public String toUnauthorizedPage() {
        return "unauthorized";
    }


    /**
     * 登陆过滤器action
     *
     * @param req
     * @param model
     * @return
     */
    @SystemControllerLog(description = "login")
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String showLoginForm(HttpServletRequest req, Model model) {
        String exceptionClassName = (String) req.getAttribute("shiroLoginFailure");
        String error = null;
        if (UnknownAccountException.class.getName().equals(exceptionClassName)) {
            error = "UnknownAccountException";
        } else if (IncorrectCredentialsException.class.getName().equals(exceptionClassName)) {
            error = "IncorrectCredentialsException";
        } else if (exceptionClassName != null) {
            error = "其他错误：" + exceptionClassName;
        }
        model.addAttribute("error", error);
        return "login";
    }


}
