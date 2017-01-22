package com.chmcc.helloworld.manager.example;

import com.jd.common.util.PaginatedList;
import com.jd.common.util.Query;
import com.chmcc.helloworld.domain.example.Example;

import java.util.List;

/**
 * User: Administrator
 * Date: 2010-4-19
 * Time: 14:03:00
 */
public interface ExampleManager {

    /**
     * �г����в�
     *
     * @return
     */
    List<Example> findExamples();

    /**
     * ȡ���ܼ�¼��
     *
     * @return ��¼����
     */
    int getExamplesCount();

    /**
     * ȡ����صļ�¼��
     *
     * @param query ��ѯ����
     * @return ��ؼ�¼
     */
    List<Example> findExamplesPage(Query query);

    /**
     * ͨ����ҳ����
     *
     * @param example
     *@param pageIndex
     * @param pageSize   @return
     */
    PaginatedList<Example> findExamples(String example, int pageIndex, int pageSize);


       /**
     * ��������
     * @param example
     */
    int createExample(Example example);
}
