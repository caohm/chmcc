package org.chmcc.mock.mockloader;

import org.chmcc.mock.mockloader.annotation.MockConfigBean;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.BeanFactoryAware;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.util.CollectionUtils;

import java.lang.reflect.Method;
import java.util.List;

/**
 *
 * load mock data
 * Created by david on 2015/7/12.
 */
public class MockDataLoader implements ApplicationContextAware,BeanFactoryAware {

    private ApplicationContext applicationContext;

    private JsonFileDataLoader jsonFileDataLoader;


    private List<Object> mcokDataBeanList;
    private DefaultListableBeanFactory beanFactory;


    public void init(){
        if(CollectionUtils.isEmpty(mcokDataBeanList)){
            return;
        }

        for(Object object : mcokDataBeanList){

            //autowire filed test data first
            jsonFileDataLoader.autowireTestData(object);



            Class clazz=object.getClass();
            Method[] methods=clazz.getDeclaredMethods();
            if(methods.length==0){
               continue;
            }

            for(Method method:methods){
                MockConfigBean configBean=method.getAnnotation(MockConfigBean.class);
                if(configBean==null){
                    continue;
                }

              Class returnClass=  method.getReturnType();
                if(returnClass==null){
                    continue;
                }
                Object[]  paramData=jsonFileDataLoader.getMethodParamData(method);
                try {
                   Object mockObject=  method.invoke(object,paramData);
                   String beanId=configBean.beanId();
                    if(beanId!=null && beanId.length()>0 && mockObject!=null){
                        beanFactory.registerSingleton(beanId,mockObject);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                    throw new RuntimeException("init bean error!",e);
                }
            }

        }
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext=applicationContext;
    }

    public List<Object> getMcokDataBeanList() {
        return mcokDataBeanList;
    }

    public void setMcokDataBeanList(List<Object> mcokDataBeanList) {
        this.mcokDataBeanList = mcokDataBeanList;
    }

    public void pos(ConfigurableListableBeanFactory beanFactory) throws BeansException {

    }

    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        this.beanFactory=(DefaultListableBeanFactory)beanFactory;
    }

    public JsonFileDataLoader getJsonFileDataLoader() {
        return jsonFileDataLoader;
    }

    public void setJsonFileDataLoader(JsonFileDataLoader jsonFileDataLoader) {
        this.jsonFileDataLoader = jsonFileDataLoader;
    }
}
