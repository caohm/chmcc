package com.chmcc.helloworld.manager.example;

import com.jd.common.util.PaginatedList;
import com.chmcc.helloworld.domain.example.Example;
import com.chmcc.helloworld.manager.BaseTest;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.junit.Test;


public class ExampleManagerCachedTest extends BaseTest {
    private final static Log log = LogFactory.getLog(ExampleManagerCachedTest.class);
    private ExampleManager exampleManagerCached;

    @Test
    public void testList() {
        search();
        search();
    }

    private PaginatedList<Example> search() {
        return exampleManagerCached.findExamples("d", 1, 4);
    }

    public void setExampleManagerCached(ExampleManager exampleManagerCached) {
        this.exampleManagerCached = exampleManagerCached;
    }
}
