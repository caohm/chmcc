package com.chmcc.helloworld.dao.example.impl;

import com.chmcc.helloworld.dao.example.ExampleDao;
import com.chmcc.helloworld.domain.example.Example;

import javax.management.Query;
import java.util.List;

/**
 * User: Administrator
 * Date: 2010-4-15
 * Time: 18:23:46
 */
@SuppressWarnings("unchecked")
public class ExampleDaoImpl extends BaseDao implements ExampleDao {

    public List<Example> findExamples() {        
        return queryForList("Example.findExamples");
    }

    public void createExample(Example example) {
         insert("Example.createExample",example);
    }

    public int getExamplesCount() {
        return (Integer)queryForObject("Example.getExamplesCount");
    }

    public int getExamplesCount(Query query) {
        return (Integer)queryForObject("Example.getExamplesCount",query);
    }


    public List<Example> findExamplesPage(Query query) {
        return queryForList("Example.findExamplesPage",query);
    }
}
