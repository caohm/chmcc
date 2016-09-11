package org.chmcc.kafka;

import kafka.javaapi.producer.Producer;
import kafka.producer.KeyedMessage;
import kafka.producer.ProducerConfig;
import kafka.serializer.StringEncoder;

import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class kafkaProducer extends Thread {
    private String topic;

    public kafkaProducer(String topic) {
        super();
        this.topic = topic;
    }

    public static void main(String[] args) {
        new kafkaProducer("test").start(); // 使用kafka集群中创建好的主题 test
    }

    @Override
    public void run() {
        Producer<Integer, String> producer = createProducer();
        int i = 0;
        while (true) {
            producer.send(new KeyedMessage<Integer, String>(topic, "message: " + i++));
            try {
                TimeUnit.SECONDS.sleep(1);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private Producer<Integer, String> createProducer() {
        Properties properties = new Properties();
        properties.put("zookeeper.connect", "172.16.2.66:2181"); // 声明zk
        properties.put("serializer.class", StringEncoder.class.getName());
        properties.put("metadata.broker.list", "172.16.32.224:9092,172.16.32.224:9093,172.16.32.224:9094"); // 声明kafka
        // broker
        return new Producer<Integer, String>(new ProducerConfig(properties));
    }
}