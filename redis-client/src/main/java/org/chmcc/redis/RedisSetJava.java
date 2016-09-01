package org.chmcc.redis;

import redis.clients.jedis.Jedis;

import java.util.Set;

public class RedisSetJava {
    public static void main(String[] args) {
        //Connecting to Redis server on localhost
        Jedis jedis = new Jedis("192.168.99.100", 32839);
        System.out.println("Connection to server sucessfully");
        //store data in redis set
        String key = "pc_getCurrentOrder";
        double score = 1;
        String member = "千水金年";
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        member = "zhangsan";
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        member = "lishi";
        jedis.zincrby(key, score, member);
        member = "wangwu";
        jedis.zincrby(key, score, member);
        jedis.zincrby(key, score, member);
        // Get the member's count and score in [0 ,$]
        Long zcount = jedis.zcount(key, 1, 10000);
        Long zcard = jedis.zcard(key);
        System.out.println(key + "'s size : " + zcount + " | " + zcard);
        // Get the stored data and print it
        Set<String> set = jedis.zrange(key, 0, -1);
        System.out.println(key + "'s child : ");
        for (String str : set) {
            System.out.print("        " + str);
            Double rscore = jedis.zscore(key, str);
            System.out.println("      score : " + rscore);
        }

    }
}
