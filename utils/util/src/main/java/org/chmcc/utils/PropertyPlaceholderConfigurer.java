package org.chmcc.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;

import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class PropertyPlaceholderConfigurer extends org.springframework.beans.factory.config.PropertyPlaceholderConfigurer {
    private static Map<String, Object> propertiesMap;

    /**
     * 读取配置
     *
     * @param key 关键字
     * @return 值
     */
    public static Object getContextProperty(String key) {
        return propertiesMap.get(key);
    }

    /**
     * 重写父类方法，加载到内存，暴露出Properties配置参数
     */
    protected void processProperties(ConfigurableListableBeanFactory beanFactory, Properties props) throws BeansException {

        // 保留原来逻辑
        super.processProperties(beanFactory, props);

        // 加载
        propertiesMap = new HashMap<String, Object>();
        for (Object key : props.keySet()) {
            String keyStr = key.toString();
            String value = props.getProperty(keyStr);
            propertiesMap.put(keyStr, value);
        }
    }
}
