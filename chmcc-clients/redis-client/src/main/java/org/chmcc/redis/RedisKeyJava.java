package org.chmcc.redis;

import redis.clients.jedis.Jedis;

import java.util.Set;

public class RedisKeyJava {
    public static void main(String[] args) {
        //Connecting to Redis server on localhost
        Jedis jedis = new Jedis("192.168.99.100", 32783);
        System.out.println("Connection to server sucessfully");
        //store data in redis list
        // Get the stored data and print it
        Set<String> set = jedis.keys("*");
        for (String key : set) {
            System.out.println("List of stored keys:: " + key);
        }
    }
}