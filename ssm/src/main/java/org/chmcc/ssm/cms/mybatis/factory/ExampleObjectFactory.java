package org.chmcc.ssm.cms.mybatis.factory;

import org.apache.ibatis.reflection.factory.DefaultObjectFactory;

import java.util.Collection;
import java.util.Properties;

/**
 * Created by caohongming on 2016/12/15.
 */
public class ExampleObjectFactory extends DefaultObjectFactory {
    public Object create(Class type) {
        return super.create(type);
    }
//    public Object create(Class type, List<Class> constructorArgTypes, List<Object> constructorArgs) {
//        return super.create(type, constructorArgTypes, constructorArgs);
//    }
    public void setProperties(Properties properties) {
        super.setProperties(properties);
    }
    public <T> boolean isCollection(Class<T> type) {
        return Collection.class.isAssignableFrom(type);
    }}
