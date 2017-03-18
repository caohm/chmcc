package org.chmcc.springmvc.controller;


import org.chmcc.springmvc.service.Test2ServiceImpl;
import org.chmcc.springmvc.service.service1.impl.TestServiceImpl;
import org.chmcc.springmvc.service.service1.restful.TestRestfulServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test")
public class TestController {
    private static final Logger logger = LoggerFactory.getLogger(TestController.class);
    @Autowired
    private TestServiceImpl testServiceImpl;
    @Autowired
    private Test2ServiceImpl test2ServiceImpl;
    @Autowired
    private TestRestfulServiceImpl testRestfulServiceImpl;

    @RequestMapping("/index")
    public String test() {
        logger.error("1");
        testServiceImpl.getTest();
        logger.error("2");
        test2ServiceImpl.getTest();
        logger.error("3");
        testRestfulServiceImpl.getTest();
        return "test/index";
    }


}
