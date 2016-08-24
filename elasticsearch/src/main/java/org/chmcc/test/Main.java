package org.chmcc.test;

import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.transport.InetSocketTransportAddress;

import java.net.InetAddress;

public class Main {

    public static void main(String[] args) {
        System.out.println("Hello World!");
        TransportClient client = TransportClient.builder().build()
                .addTransportAddress(new InetSocketTransportAddress("localhost", 9300));
    }
}
