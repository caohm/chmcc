package org.chmcc.ssm.cms.service.restful;

import org.chmcc.ssm.cms.service.TestService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Created by caohongming on 2016/12/29.
 */
@Service
public class TestRestfulServiceImpl implements TestService {
    private static final Logger logger = LoggerFactory.getLogger(TestRestfulServiceImpl.class);

    @Override
    public void getTest() {
        logger.error("31");
    }
}
