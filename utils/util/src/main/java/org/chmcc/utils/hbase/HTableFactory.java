package org.chmcc.utils.hbase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.HTableInterfaceFactory;
import org.apache.hadoop.hbase.util.Bytes;
import org.apache.hadoop.hbase.util.PoolMap;

import java.io.IOException;

public class HTableFactory implements HTableInterfaceFactory {

    private static final Log LOG = LogFactory.getLog(HTableFactory.class);

    private PoolMap<String, HTableInterface> tablePool;

    private int maxSize;

    public HTableFactory(int maxSize) {
        if (maxSize <= 0) {
            throw new RuntimeException("invalid maxSize : " + maxSize);
        }
        this.setMaxSize(maxSize);
        tablePool = new PoolMap<String, HTableInterface>(PoolMap.PoolType.Reusable, this.maxSize);
    }

    @Override
    public HTableInterface createHTableInterface(Configuration config, byte[] tableName) {
        HTableInterface table = tablePool.get(tableName);
        if (table == null) {
            try {
                table = new HTable(config, tableName);
            } catch (IOException e) {
                LOG.error("create HTableInterface exception.", e);
                throw new RuntimeException("create HTableInterface exception.", e);
            }
        }
        return table;
    }

    @Override
    public void releaseHTableInterface(HTableInterface table) throws IOException {
        String tableName = Bytes.toString(table.getTableName());
        if (tablePool.size(tableName) < maxSize) {
            tablePool.put(tableName, table);
        } else {
            tablePool.remove(tableName, table);
            table.close();
        }
    }

    public void setMaxSize(int maxSize) {
        this.maxSize = maxSize;
    }

}
