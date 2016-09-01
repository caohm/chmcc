package org.chmcc.bootstrap.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by caohm on 2016/8/31.
 */
@Controller
@RequestMapping("/bootstrap")
public class BoopstrapController {

    @RequestMapping("/get")
    public String get(HttpServletRequest request, ModelMap modelMap) {

        return "bootstrap/get";
    }
}
