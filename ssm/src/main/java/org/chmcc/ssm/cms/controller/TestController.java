package org.chmcc.ssm.cms.controller;


import org.chmcc.ssm.cms.SystemControllerLog;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestController {

    @RequestMapping("/index")
    @SystemControllerLog(description = "test")
    public String test() {
        return "test/index";
    }


}
