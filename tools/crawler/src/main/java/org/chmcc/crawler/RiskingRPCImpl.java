package org.chmcc.crawler;

import org.apache.commons.lang.StringUtils;
import org.apache.http.client.CookieStore;
import org.apache.http.impl.client.BasicCookieStore;
import org.chmcc.utils.http.HttpClientPool;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;


public class RiskingRPCImpl {
    private static Logger logger = LoggerFactory.getLogger(RiskingRPCImpl.class);


    private String index = "http://www.orangepi.cn";

    private CookieStore cookieStore = new BasicCookieStore();
    private HttpClientPool httpClientPool = new HttpClientPool(index, null, null, cookieStore);

    private void buildCookies() {

    }

    private Map getProducts() {
        Map products = new HashMap();
        try {
            Document html = Jsoup.connect(index).get();
            Elements as = (html.select("#webmenu li .second-menu")).get(0).select("li a");
            for (Element document : as) {
                products.put(document.attr("href"), document.select("span").html());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return products;
    }

    private Map getProductInfo(String action) {
        Map info = new HashMap();
        try {
            Document html = Jsoup.connect(index + action).get();
            Elements trs = html.select("div[class='main'] table tbody tr");
            for (Element element : trs) {
                Elements tds = element.select("td");
                if (tds.size() == 1) {
                    continue;
                }
                String attr = tds.get(0).select("p").html().replaceAll("&nbsp;", "");
                String value = tds.get(1).select("p").html().replaceAll("&nbsp;", "");
                info.put(attr, value);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return info;
    }


    public static void main(String[] args) {
        RiskingRPCImpl bean = new RiskingRPCImpl();
        Map<String, String> products = bean.getProducts();
        List<Map<String, String>> ss = new ArrayList();
        Iterator<Map.Entry<String, String>> it = products.entrySet().iterator();
        while (it.hasNext()) {
            Map.Entry<String, String> entry = it.next();
            String action = entry.getKey();
            String name = entry.getValue();
            Map<String, String> info = bean.getProductInfo(action);
            info.put("name", name);
            ss.add(info);
        }
        Set set = new TreeSet<String>();
        set.add("name");
        for (Map<String, String> map : ss) {
            it = map.entrySet().iterator();
            while (it.hasNext()) {
                Map.Entry<String, String> entry = it.next();
                set.add(entry.getKey());
            }
        }
        StringBuilder sb = new StringBuilder();
        Iterator si = set.iterator();
        while (si.hasNext()) {
            sb.append(si.next()).append("\t");
        }
        sb.append("\n");
        for (Map<String, String> map : ss) {
            si = set.iterator();
            while (si.hasNext()) {
                String value = map.get(si.next());
                sb.append(StringUtils.isNotBlank(value) ? value : "").append("\t");
            }
            sb.append("\n");
        }
        System.out.println(sb.toString());
    }

    @PreDestroy
    public void destroy() {
        httpClientPool.destroy();
    }
}
