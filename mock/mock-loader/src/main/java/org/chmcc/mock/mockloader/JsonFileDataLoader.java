package org.chmcc.mock.mockloader;

import com.alibaba.fastjson.JSON;
import org.chmcc.mock.mockloader.annotation.JsonFileData;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.ReflectionUtils;

import java.io.IOException;
import java.io.InputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URL;
import java.util.List;

/**
 * 读取测试使用的json数据
 * Created by zhangshibin on 2015/6/25.
 */
public class JsonFileDataLoader {


    private String jsonFilePath = "testJson/";


    private JsonFileDataLoader() {
    }

    public <T> T loadTestData(String fileId, Class<T> clazz) {

        if (fileId != null && !fileId.endsWith(".json")) {
            fileId = fileId + ".json";
        }

        String filePath = contactPath(jsonFilePath, fileId);
        URL url = JsonFileDataLoader.class.getClassLoader().getResource(filePath);
        String content = null;
        InputStream inputStream = null;
        try {
            inputStream = url.openStream();
            content = IOUtils.toString(inputStream, "UTF-8");
            if (StringUtils.isNotEmpty(content)) {
                T value = JSON.parseObject(content, clazz);
                return value;
            }
        } catch (IOException e) {
            throw new RuntimeException(fileId + "加载数据失败，原因是" + e.getMessage());
        } finally {
            if (inputStream != null) {
                IOUtils.closeQuietly(inputStream);
            }
        }
        return null;

    }


    public <T> List<T> loadTestDataList(String fileId, Class<T> clazz) {

        if (fileId != null && !fileId.endsWith(".json")) {
            fileId = fileId + ".json";
        }

        String filePath = contactPath(jsonFilePath, fileId);
        URL url = JsonFileDataLoader.class.getClassLoader().getResource(filePath);
        String content = null;
        InputStream inputStream = null;
        try {
            inputStream = url.openStream();
            content = IOUtils.toString(inputStream, "UTF-8");
            if (StringUtils.isNotEmpty(content)) {
                List list = JSON.parseArray(content, clazz);
                return list;
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (inputStream != null) {
                IOUtils.closeQuietly(inputStream);
            }
        }
        return null;
    }


    public void autowireTestData(Object object) {
        if (object == null) {
            return;
        }

        Class clazz = object.getClass();
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            JsonFileData jsonFileData = field.getAnnotation(JsonFileData.class);
            if (jsonFileData != null) {
                String fileId = jsonFileData.fileId();
                Class fieldClass = field.getType();

                Object fieldValue = null;

                if (fieldClass.isAssignableFrom(List.class)) {
                    if (jsonFileData.itemClass() == Object.class) {
                        throw new RuntimeException("测试数据如果为List,必须设定itemClass,成员变量名称：" + field);
                    }
                    fieldValue = this.loadTestDataList(fileId, jsonFileData.itemClass());
                } else {
                    fieldValue = this.loadTestData(fileId, fieldClass);
                }

                if (fieldValue != null) {
                    Method setterMethod = ReflectionUtils.findMethod(clazz, getSetName(field.getName()), fieldClass);
                    if (setterMethod == null) {
                        ReflectionUtils.setField(field, object, fieldValue);
                    } else {
                        ReflectionUtils.invokeMethod(setterMethod, object, fieldValue);
                    }
                }

            }
        }

    }


    public Object[] getMethodParamData(Method method) {
        Class<?>[] variables = method.getParameterTypes();
        if (variables.length == 0) {
            return new Object[0];
        }

        Annotation[][] annotations = method.getParameterAnnotations();
        Object[] params = null;
        if (variables.length > 0) {
            params = new Object[variables.length];
            for (Integer j = 0; j < variables.length; j++) {

                JsonFileData jsonFileAnnotation = null;

                for (int k = 0; k < annotations[j].length; k++) {
                    Annotation annotation = annotations[j][k];
                    if (annotation instanceof JsonFileData) {
                        jsonFileAnnotation = (JsonFileData) annotation;
                        break;
                    }
                }

                if (jsonFileAnnotation == null) {
//                    throw new RuntimeException("the "+(j+1)+" of parameter of method :"+method.getName()+ " should have JsonFileData annotation!");
                    params[j] = null;
                    continue;
                }

                Class paramClass = variables[j];
                String fileId = jsonFileAnnotation.fileId();
                if (paramClass.isAssignableFrom(List.class)) {
                    if (jsonFileAnnotation.itemClass() == Object.class) {
                        throw new RuntimeException("测试数据如果为List,必须设定itemClass,成员变量名称：" + fileId);
                    }
                    List list = this.loadTestDataList(fileId, jsonFileAnnotation.itemClass());
                    params[j] = list;
                    //List
                } else {
                    Object o = this.loadTestData(fileId, paramClass);
                    params[j] = o;
                }
            }
        }

        return params;
    }


    /**
     * contact the parent path and sub path to be an entire path
     *
     * @param parent
     * @param filePath
     * @return
     */
    public static String contactPath(String parent, String filePath) {
        if (!parent.endsWith("/") && !parent.endsWith("\\")) {
            parent = parent + "/";
        }

        if (filePath.startsWith("/") || filePath.startsWith("\\"))
            filePath = filePath.substring(1);
        return parent + filePath;
    }


    /**
     * To make the get function name
     *
     * @param keyName
     * @return
     */
    public static String getSetName(String keyName) {
        return "set" + keyName.substring(0, 1).toUpperCase() + keyName.substring(1);
    }


    public String getJsonFilePath() {
        return jsonFilePath;
    }

    public void setJsonFilePath(String jsonFilePath) {
        this.jsonFilePath = jsonFilePath;
    }
}
