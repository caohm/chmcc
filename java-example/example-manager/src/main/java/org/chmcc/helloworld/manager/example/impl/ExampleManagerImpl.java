package com.chmcc.helloworld.manager.example.impl;

import org.chmcc.common.manager.BaseManager;
import org.chmcc.common.util.PaginatedList;
import org.chmcc.common.util.Query;
import org.chmcc.common.util.base.BaseQuery;
import org.chmcc.common.util.base.PaginatedArrayList;
import com.chmcc.helloworld.dao.example.ExampleDao;
import com.chmcc.helloworld.domain.example.Example;
import com.chmcc.helloworld.manager.example.ExampleManager;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.JVMRandom;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import java.util.List;

/**
 * User: Administrator
 * Date: 2010-4-19
 * Time: 14:03:37
 */
public class ExampleManagerImpl extends BaseManager implements ExampleManager {
     private final static Log log = LogFactory.getLog(ExampleManagerImpl.class);
    private ExampleDao exampleDao;

    public List<Example> findExamples() {
        return exampleDao.findExamples();
    }


    public int getExamplesCount() {
        return exampleDao.getExamplesCount();
    }

    public List<Example> findExamplesPage(Query query) {
        return exampleDao.findExamplesPage(query);
    }

    public PaginatedList<Example> findExamples(String name,int pageIndex, int pageSize) {
        BaseQuery baseQuery = new BaseQuery();
        if(StringUtils.isNotBlank(name)) { //���ò�ѯ����
            baseQuery.setValue("%"+name+"%"); //һ������²���ʹ��like
        }

        int totalItem = exampleDao.getExamplesCount(baseQuery); //�õ��ܵļ�¼����

        PaginatedList<Example> examples = new PaginatedArrayList<Example>(pageIndex, pageSize); //���췵�ض�����Ҫ������ҳ������ʾ
        examples.setTotalItem(totalItem);//�����ܼ�¼��

        baseQuery.setStartRow(examples.getStartRow() - 1);//�������ݿ����ʼλ��
        baseQuery.setEndRow(examples.getEndRow() - examples.getStartRow() + 1);//�������ݿ�Ľ���λ��

        List<Example> exampleList = exampleDao.findExamplesPage(baseQuery);//��ѯ�õ���Ӧ�ļ�¼

        examples.addAll(exampleList);
        return examples;
    }

    public int createExample(final Example example) {
//        example.setId((int) sequenceUtil.get("pop_user_example_id"));
        TransactionTemplate template = getDataSourceTransactionManager();
        template.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    exampleDao.createExample(example);
                    int rnd = new JVMRandom().nextInt(2);
                    if (rnd == 1) {
                        throw new Exception("�������");
                    }
                } catch (Exception e) {
                    log.error("createExample error!",e);
                     status.setRollbackOnly();
                    throw new RuntimeException("gaga",e);
                }
            }
        });

        return example.getId();
    }

    public void setExampleDao(ExampleDao exampleDao) {
        this.exampleDao = exampleDao;
    }
}
