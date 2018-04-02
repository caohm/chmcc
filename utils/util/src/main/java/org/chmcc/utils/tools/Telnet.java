package org.chmcc.utils.tools;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;

public class Telnet {
    private static final Logger logger = LoggerFactory.getLogger(Telnet.class);

    public static boolean telnet(InetSocketAddress address, int outTime) {

        Socket server = null;
        try {
            server = new Socket();
            long start = System.currentTimeMillis();
            server.connect(address, outTime);
            long l = System.currentTimeMillis() - start;
            if (l > outTime + 10) {
                logger.error("timeout error! machine:" + address.getHostName() + ",time:" + l);
            }
            return true;
        } catch (Throwable e) {
            logger.info("Telnet Fail Mahine:" + address.getHostName() + ",outTime:" + outTime + "，Msg：" + e.getMessage());
        } finally {
            if (server != null)
                try {
                    server.close();
                } catch (IOException e) {
                }
        }
        return false;
    }


    public static void main(String[] args) throws Exception {
        String ipAddress = "127.0.0.1";
        int port = 880;
        InetSocketAddress address = new InetSocketAddress(ipAddress, port);
        boolean success = Telnet.telnet(address, 10);
        System.out.println("success = [" + success + "]");
    }
}
