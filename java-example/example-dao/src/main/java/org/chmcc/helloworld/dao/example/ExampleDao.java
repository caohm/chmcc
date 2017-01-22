package com.chmcc.helloworld.dao.example;

import org.chmcc.common.util.Query;
import com.chmcc.helloworld.domain.example.Example;

import java.util.List;

/**
 * User: Administrator
 * Date: 2010-4-15
 * Time: 18:17:34
 */
public interface ExampleDao {

    /**
     * �г����в�
     * @return
     */
    public List<Example> findExamples() ;

    /**
     * ȡ���ܼ�¼��
     * @return ��¼����
     */
    int getExamplesCount();

    /**
     * ȡ���ܼ�¼��
     * @return ��¼����
     */
    int getExamplesCount(Query query);

    /**
     * ȡ����صļ�¼��
     * @param query ��ѯ����
     * @return ��ؼ�¼
     */
    List<Example> findExamplesPage(Query query);

    /**
     * ��������
     * @param example
     */
    void createExample(Example example);
}
