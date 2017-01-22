package org.chmcc.ssm.cms.service.impl;

import org.chmcc.ssm.cms.impl.InterfaceImpl1;
import org.chmcc.ssm.cms.service.TestService;
import org.chmcc.ssm.cms.service.bean1;
import org.chmcc.ssm.cms.service.util.TestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by caohongming on 2016/12/29.
 */
@Service
public class TestServiceImpl implements TestService {
    private static final Logger logger = LoggerFactory.getLogger(TestServiceImpl.class);
    @Autowired
    private InterfaceImpl1 interfaceImpl1;

    @Override
    public void getTest() {
        logger.error("11");
        interfaceImpl1.getTest();
        logger.error("12");
        TestUtils.getTest();
        logger.error("13");
        getTest2();
        logger.error("14");
        new bean1().getA();
    }

    private void getTest2() {
    }
}
