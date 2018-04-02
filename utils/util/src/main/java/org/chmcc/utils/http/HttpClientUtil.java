package org.chmcc.utils.http;

import com.alibaba.fastjson.JSON;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.ResponseHandler;
import org.apache.http.client.config.CookieSpecs;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpHead;
import org.apache.http.client.methods.HttpPatch;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.client.methods.HttpRequestBase;
import org.apache.http.client.methods.HttpTrace;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.BasicResponseHandler;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.message.BasicNameValuePair;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;


public class HttpClientUtil {
    private final static Logger logger = LoggerFactory.getLogger(HttpClientUtil.class);

    public HttpClientUtil() {
    }


    private static void commonSetting(HttpRequestBase httpBase, Map<String, String> headers, Map<String, String> cookieMap) {
        httpBase.setHeader("User-Agent", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36");
        httpBase.setHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        httpBase.setHeader("Accept-Language", "zh-CN");
        httpBase.setHeader("Accept-Charset", "ISO-8859-1,utf-8,gbk,gb2312;q=0.7,*;q=0.7");
        httpBase.setHeader("Connection", "keep-alive");
//        httpBase.setHeader("accept", "application/json");
//        httpBase.setHeader("accept-encoding", "gzip, deflate");
//        httpBase.setHeader("Content-Type", "text/html;charset=UTF-8");
        // 配置请求的超时设置
        // 网站header中有set-cookie字段时，采用默认方式可能会被cookie reject，无法写入cookie。将此属性设置成CookieSpecs.STANDARD_STRICT可避免此情况
        RequestConfig requestConfig = RequestConfig.custom()
                .setConnectionRequestTimeout(20000)
                .setConnectTimeout(20000)
                .setSocketTimeout(20000)
                .setCookieSpec(CookieSpecs.STANDARD_STRICT)
                .build();
        httpBase.setConfig(requestConfig);

        String cookie = null;
        if (MapUtils.isNotEmpty(headers)) {
            Set<String> keys = headers.keySet();
            for (String key : keys) {
                if (StringUtils.isNotBlank(key)) {
                    if ("Cookie".equals(key)) {
                        cookie = headers.get(key);
                    } else {
                        httpBase.setHeader(key, headers.get(key));
                    }
                }
            }
        }

        if (MapUtils.isNotEmpty(cookieMap)) {
            if (StringUtils.isNotBlank(cookie)) {
                cookie += ";";
            }
            Set<String> keys = cookieMap.keySet();
            for (String key : keys) {
                cookie += key + "=" + cookieMap.get(key) + ";";
            }
        }

        if (StringUtils.isNotBlank(cookie)) {
            httpBase.setHeader("Cookie", cookie);
        }
    }

    /**
     * exec httpPost request
     *
     * @param httpClient
     * @param url
     * @param paramMap   in JSON for StringEntity; Map for UrlEncodedFormEntity
     * @param headers
     * @param cookieMap  cookieMap null for using cookieStore
     * @return
     */
    public static String httpPost(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpPost httpBase = null;

        httpBase = new HttpPost(url);

        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            if (MapUtils.isNotEmpty(paramMap)) {
                if (paramMap instanceof JSON) {
                    httpBase.setEntity(new StringEntity(JSON.toJSONString(paramMap), "UTF-8"));
                } else {
                    Set<String> keys = paramMap.keySet();
                    for (String key : keys) {
                        params.add(new BasicNameValuePair(key, paramMap.get(key)));
                    }
                    httpBase.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
                }
            }

            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);

        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }
//        CloseableHttpResponse response = null;
//        try {
//            response = httpClient.execute(httpBase, HttpClientContext.create());
//            HttpEntity entity = response.getEntity();
//            responseBody = EntityUtils.toString(entity, "utf-8");
//            EntityUtils.consume(entity);
//        } catch (IOException e) {
//            logger.error(e.getMessage(), e);
//        } finally {
//            try {
//                if (response != null)
//                    response.close();
//            } catch (IOException e) {
//                logger.error(e.getMessage(), e);
//            }
//            httpBase.abort();
//        }
        return responseBody;
    }

    public static String httpPut(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpPut httpBase = null;

        httpBase = new HttpPut(url);

        commonSetting(httpBase, headers, cookieMap);

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                params.add(new BasicNameValuePair(key, paramMap.get(key)));
            }
        }

        String responseBody = "";
        try {
            httpBase.setEntity(new UrlEncodedFormEntity(params, "UTF-8"));
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }
        return responseBody;
    }

    public static String httpGet(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        HttpGet httpBase = null;

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                if (url.contains("?")) {
                    url += "&" + key + "=" + paramMap.get(key);
                } else {
                    url += "?" + key + "=" + paramMap.get(key);
                }
            }
        }

        httpBase = new HttpGet(url);
        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

        return responseBody;
    }

    public static String httpDelete(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpDelete httpBase = null;

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                if (url.contains("?")) {
                    url += "&" + key + "=" + paramMap.get(key);
                } else {
                    url += "?" + key + "=" + paramMap.get(key);
                }
            }
        }

        httpBase = new HttpDelete(url);
        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

        return responseBody;
    }

    public static String httpHead(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpHead httpBase = null;

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                if (url.contains("?")) {
                    url += "&" + key + "=" + paramMap.get(key);
                } else {
                    url += "?" + key + "=" + paramMap.get(key);
                }
            }
        }

        httpBase = new HttpHead(url);
        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

        return responseBody;
    }

    public static String httpPatch(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpPatch httpBase = null;

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                if (url.contains("?")) {
                    url += "&" + key + "=" + paramMap.get(key);
                } else {
                    url += "?" + key + "=" + paramMap.get(key);
                }
            }
        }

        httpBase = new HttpPatch(url);
        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

        return responseBody;
    }

    public static String httpTrace(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        List<NameValuePair> params = new ArrayList<NameValuePair>();
        HttpTrace httpBase = null;

        if (paramMap != null && paramMap.size() > 0) {
            Set<String> keys = paramMap.keySet();
            for (String key : keys) {
                if (url.contains("?")) {
                    url += "&" + key + "=" + paramMap.get(key);
                } else {
                    url += "?" + key + "=" + paramMap.get(key);
                }
            }
        }

        httpBase = new HttpTrace(url);
        commonSetting(httpBase, headers, cookieMap);

        String responseBody = "";
        try {
            ResponseHandler<String> responseHandler = new BasicResponseHandler();
            responseBody = httpClient.execute(httpBase, responseHandler);
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

        return responseBody;
    }

    public static void getCookies(CloseableHttpClient httpClient, String url, Map<String, String> paramMap, Map<String, String> headers, Map<String, String> cookieMap) {
        HttpGet httpBase = null;

        httpBase = new HttpGet(url);
        commonSetting(httpBase, headers, cookieMap);
        try {
            httpClient.execute(httpBase);
//            String responseBody = "";
//            ResponseHandler<String> responseHandler = new BasicResponseHandler();
//            responseBody = httpClient.execute(httpBase, responseHandler);
//            System.out.println("responseBody = [" + responseBody + "]");
        } catch (Exception e) {
            logger.error(e.getMessage(), e);
            httpBase.abort();
        }

    }
}
