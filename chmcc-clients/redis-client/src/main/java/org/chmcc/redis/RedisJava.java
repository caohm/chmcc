package org.chmcc.redis;



import redis.clients.jedis.Jedis;

public class RedisJava {
    public static void main(String[] args) {
        //Connecting to Redis server on localhost
        Jedis jedis = new Jedis("192.168.99.100", 32783);
        System.out.println("Connection to server sucessfully");
        //check whether server is running or not
        System.out.println("Server is running: " + jedis.ping());
    }
}
