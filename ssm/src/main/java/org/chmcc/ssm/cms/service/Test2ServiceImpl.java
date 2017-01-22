package org.chmcc.ssm.cms.service;

import org.chmcc.ssm.cms.impl.impl2.InterfaceImpl2;
import org.chmcc.ssm.cms.service.bean.bean2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by caohongming on 2016/12/29.
 */
@Service
public class Test2ServiceImpl implements TestService {
    private static final Logger logger = LoggerFactory.getLogger(Test2ServiceImpl.class);
    @Autowired
    private InterfaceImpl2 interfaceImpl2;

    @Override
    public void getTest() {
        logger.error("21");
        interfaceImpl2.getTest();
        logger.error("22");
        new bean2().getA();
    }
}
