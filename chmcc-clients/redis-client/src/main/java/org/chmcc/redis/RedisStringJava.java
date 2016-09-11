package org.chmcc.redis;

import redis.clients.jedis.Jedis;
public class RedisStringJava {
   public static void main(String[] args) {
      //Connecting to Redis server on localhost
       Jedis jedis = new Jedis("192.168.99.100", 32783);
      System.out.println("Connection to server sucessfully");
      //set the data in redis string
      jedis.set("tutorial-name", "Redis tutorial");
     // Get the stored data and print it
     System.out.println("Stored string in redis:: "+ jedis.get("tutorial-name"));
 }
}