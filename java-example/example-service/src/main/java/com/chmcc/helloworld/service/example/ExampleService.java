package com.chmcc.helloworld.service.example;

import com.jd.common.web.result.Result;
import com.chmcc.helloworld.domain.example.Example;
 


public interface ExampleService {

      /**
     * �г����в�
     * @return
     */
    Result findExamples() ;

    /**
     * ͨ����ҳ����
     * @param name
     * @param pageIndex
     * @param pageSize
     * @return
     */
    Result findExamples(String name, int pageIndex, int pageSize) ;


       /**
     * ��������
     * @param example
     */
    Result createExample(Example example);
}
