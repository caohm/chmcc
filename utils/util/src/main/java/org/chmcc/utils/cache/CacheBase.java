package org.chmcc.utils.cache;

import com.google.common.cache.Cache;
import com.google.common.cache.CacheBuilder;
import org.chmcc.utils.PropertyPlaceholderConfigurer;

import java.util.Map;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;


public abstract class CacheBase<K, V> {

    private Cache<K, V> guavaCache;
    private static Integer maximumSize = Integer.valueOf((String) PropertyPlaceholderConfigurer.getContextProperty("guava.cache.maximumSize"));
    private static Integer expireAfterAccess = Integer.valueOf((String) PropertyPlaceholderConfigurer.getContextProperty("guava.cache.expireAfterAccess"));

    public CacheBase CacheBase() {
        guavaCache = CacheBuilder.newBuilder()
                .maximumSize(maximumSize)
                .expireAfterAccess(expireAfterAccess, TimeUnit.MINUTES)
                .build();
        return this;
    }

    /**
     * 实现不同业务的 initCache
     */
    protected abstract V initCache(K key);

    /**
     * 读取缓存值
     *
     * @param key
     */
    public V get(final K key) throws ExecutionException {
        V value = guavaCache.get(key, new Callable<V>() {
            public V call() {
                V value = initCache(key);
                if (null != value) {
                    put(key, value);
                }
                return value;
            }
        });
        return value;
    }

    /**
     * 加入缓存
     *
     * @param key
     * @param value
     */
    public void put(K key, V value) {
        if (null == value) {
//            guavaCache.put(key, value);
        } else {
            guavaCache.put(key, value);
        }
    }

    public void putAll(Map<? extends K, ? extends V> map) {
        guavaCache.putAll(map);
    }

    /**
     * 删除缓存
     *
     * @param key
     */
    public void remove(K key) {
        guavaCache.invalidate(key);
    }
}
