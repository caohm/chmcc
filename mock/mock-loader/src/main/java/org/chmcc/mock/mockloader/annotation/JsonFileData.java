package org.chmcc.mock.mockloader.annotation;

import com.alibaba.fastjson.TypeReference;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by david on 2015/7/12.
 */

@Target({ElementType.PARAMETER,ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface JsonFileData {


    /** json配置文件ID*/
    String fileId();

    /**List元素的class类型*/
    Class itemClass() default Object.class;



}
