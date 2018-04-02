package org.chmcc.utils.hbase;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.hbase.HBaseConfiguration;
import org.apache.hadoop.hbase.HColumnDescriptor;
import org.apache.hadoop.hbase.HTableDescriptor;
import org.apache.hadoop.hbase.KeyValue;
import org.apache.hadoop.hbase.MasterNotRunningException;
import org.apache.hadoop.hbase.ZooKeeperConnectionException;
import org.apache.hadoop.hbase.client.Delete;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HBaseAdmin;
import org.apache.hadoop.hbase.client.HConnection;
import org.apache.hadoop.hbase.client.HConnectionManager;
import org.apache.hadoop.hbase.client.HTable;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.HTablePool;
import org.apache.hadoop.hbase.client.Put;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.client.ResultScanner;
import org.apache.hadoop.hbase.client.Scan;
import org.apache.hadoop.hbase.filter.CompareFilter;
import org.apache.hadoop.hbase.filter.Filter;
import org.apache.hadoop.hbase.filter.FilterList;
import org.apache.hadoop.hbase.filter.SingleColumnValueFilter;
import org.apache.hadoop.hbase.util.Bytes;
import org.chmcc.utils.PropertyPlaceholderConfigurer;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


public class HbaseUtil {

    private final static Log log = LogFactory.getLog(HbaseUtil.class);
    private static Object lockObj = new Object();
    private static HConnection connection = null;
    private static Configuration config;

    static {
        init();
    }

    public HbaseUtil() {
    }

    public static void init() {
        // 下面是连接HBase的参数配置
        Configuration conf = new Configuration();
        conf.set("hbase.zookeeper.quorum", (String) PropertyPlaceholderConfigurer.getContextProperty("hbase.zookeeper.quorum"));
        conf.set("hbase.zookeeper.property.clientPort", (String) PropertyPlaceholderConfigurer.getContextProperty("hbase.zookeeper.property.clientPort"));
        conf.set("hbase.client.scanner.caching", (String) PropertyPlaceholderConfigurer.getContextProperty("hbase.client.scanner.caching"));
        conf.set("hbase.master", (String) PropertyPlaceholderConfigurer.getContextProperty("hbase.master"));
        //创建一个Configuration
        config = HBaseConfiguration.create(conf);
    }

    public static HConnection getInstance() {

        if (connection == null) {
            synchronized (lockObj) {
                if (connection == null) {
                    try {
                        connection = HConnectionManager.createConnection(config);
                    } catch (Exception e) {
                        log.error("getConnection error", e);
                    }
                }
            }
        }
        return connection;
    }

    /**
     * 创建表
     *
     * @param tableName
     */
    public static void createTable(String tableName) {
        System.out.println("start create table ......");
        try {
            HBaseAdmin hBaseAdmin = new HBaseAdmin(config);
            if (hBaseAdmin.tableExists(tableName)) {// 如果存在要创建的表，那么先删除，再创建
                hBaseAdmin.disableTable(tableName);
                hBaseAdmin.deleteTable(tableName);
                System.out.println(tableName + " is exist,detele....");
            }
            HTableDescriptor tableDescriptor = new HTableDescriptor(tableName);
            tableDescriptor.addFamily(new HColumnDescriptor("column1"));
            tableDescriptor.addFamily(new HColumnDescriptor("column2"));
            tableDescriptor.addFamily(new HColumnDescriptor("column3"));
            hBaseAdmin.createTable(tableDescriptor);
        } catch (MasterNotRunningException e) {
            e.printStackTrace();
        } catch (ZooKeeperConnectionException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("end create table ......");
    }

    /**
     * 删除一张表
     *
     * @param tableName
     */
    public static void dropTable(String tableName) {
        try {
            HBaseAdmin admin = new HBaseAdmin(config);
            admin.disableTable(tableName);
            admin.deleteTable(tableName);
        } catch (MasterNotRunningException e) {
            e.printStackTrace();
        } catch (ZooKeeperConnectionException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    /**
     * 插入数据
     *
     * @param tableName
     */
    public static void insertData(String tableName) {
        System.out.println("start insert data ......");
        HTablePool pool = new HTablePool(config, 1000);
        HTable table = (HTable) pool.getTable(tableName);
        Put put = new Put("112233bbbcccc".getBytes());// 一个PUT代表一行数据，再NEW一个PUT表示第二行数据,每行一个唯一的ROWKEY，此处rowkey为put构造方法中传入的值
        put.add("column1".getBytes(), null, "aaa".getBytes());// 本行数据的第一列
        put.add("column2".getBytes(), null, "bbb".getBytes());// 本行数据的第三列
        put.add("column3".getBytes(), null, "ccc".getBytes());// 本行数据的第三列
        try {
            table.put(put);
        } catch (IOException e) {
            e.printStackTrace();
        }
        System.out.println("end insert data ......");
    }

    public static HTableInterface getTable(String tableName) {
        HTableInterface table = null;
        try {

            table = getInstance().getTable(tableName);

        } catch (IOException e) {
            log.error(e);
        }
        return table;
    }


    public static void deleteTable(String tableName, String rows, String family) throws Exception {
        // Instantiating HTable class
//        String tableName = "myHbaseTable";
//        //建立一个TablePool
//        HTablePool tablePool = new HTablePool(configuration, 10); //这个最好用成单例，
//        //    可以做到工具类中
//        // 获取HTable，然后就可以进行读写操作操作了
//        HTableInterface table = tablePool.getTable(tableName);
//// 以后就可以使用table进行操作。记住几个关键点：
//// 特别指出 ：scanner用完以后close；
//        table.flushCommits();
//        table.close();
        HTable table = new HTable(config, tableName);

        // Instantiating Delete class
        Delete delete = new Delete(Bytes.toBytes(rows));
//        delete.deleteColumn(Bytes.toBytes("au"), Bytes.toBytes("TP99"));
//        delete.deleteColumn(Bytes.toBytes("au"), Bytes.toBytes("dataTime"));
        delete.deleteFamily(Bytes.toBytes(family));

        // deleting the data
        table.delete(delete);

        // closing the HTable object
        table.close();
        System.out.println("data deleted....." + rows);
    }

    /**
     * 批量删除数据
     *
     * @param tableName
     * @param rows
     * @param family
     * @throws Exception
     */
    public static void deleteRows(String tableName, List<String> rows, String family) throws Exception {
        // Instantiating HTable class
        HTable table = new HTable(config, tableName);

        // Instantiating Delete class
        List<Delete> delList = new ArrayList<Delete>();
        for (String row : rows) {
            Delete delete = new Delete(Bytes.toBytes(row));
            delList.add(delete);
            delete.deleteFamily(Bytes.toBytes(family));
        }
        // deleting the data
        table.delete(delList);

        // closing the HTable object
        table.close();
        System.out.println("data deleted.....");
    }

    /**
     * 根据 rowkey删除一条记录
     *
     * @param tablename
     * @param rowkey
     */
    public static void deleteRow(String tablename, String rowkey) {
        try {
            HTable table = new HTable(config, tablename);
            List list = new ArrayList();
            Delete d1 = new Delete(rowkey.getBytes());
            list.add(d1);

            table.delete(list);
            System.out.println("删除行成功!");

        } catch (IOException e) {
            e.printStackTrace();
        }


    }

    /**
     * 查询所有数据
     *
     * @param tableName
     */
    public static void QueryAll(String tableName) {
        HTablePool pool = new HTablePool(config, 1000);
        HTable table = (HTable) pool.getTable(tableName);
        try {
            ResultScanner rs = table.getScanner(new Scan());
            for (Result r : rs) {
                System.out.println("获得到rowkey:" + new String(r.getRow()));
                for (KeyValue keyValue : r.raw()) {
                    System.out.println("列：" + new String(keyValue.getFamily())
                            + "====值:" + new String(keyValue.getValue()));
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 单条件查询,根据rowkey查询唯一一条记录
     *
     * @param tableName
     */
    public static void QueryByCondition1(String tableName) {

        HTablePool pool = new HTablePool(config, 1000);
        HTable table = (HTable) pool.getTable(tableName);
        try {
            Get scan = new Get("abcdef".getBytes());// 根据rowkey查询
            Result r = table.get(scan);
            System.out.println("获得到rowkey:" + new String(r.getRow()));
            for (KeyValue keyValue : r.raw()) {
                System.out.println("列：" + new String(keyValue.getFamily())
                        + "====值:" + new String(keyValue.getValue()));
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 单条件按查询，查询多条记录
     *
     * @param tableName
     */
    public static void QueryByCondition2(String tableName) {

        try {
            HTablePool pool = new HTablePool(config, 1000);
            HTable table = (HTable) pool.getTable(tableName);
            Filter filter = new SingleColumnValueFilter(Bytes
                    .toBytes("column1"), null, CompareFilter.CompareOp.EQUAL, Bytes
                    .toBytes("aaa")); // 当列column1的值为aaa时进行查询
            Scan s = new Scan();
            s.setFilter(filter);
            ResultScanner rs = table.getScanner(s);
            for (Result r : rs) {
                System.out.println("获得到rowkey:" + new String(r.getRow()));
                for (KeyValue keyValue : r.raw()) {
                    System.out.println("列：" + new String(keyValue.getFamily())
                            + "====值:" + new String(keyValue.getValue()));
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

    /**
     * 组合条件查询
     *
     * @param tableName
     */
    public static void QueryByCondition3(String tableName) {

        try {
            HTablePool pool = new HTablePool(config, 1000);
            HTable table = (HTable) pool.getTable(tableName);

            List<Filter> filters = new ArrayList<Filter>();

            Filter filter1 = new SingleColumnValueFilter(Bytes
                    .toBytes("column1"), null, CompareFilter.CompareOp.EQUAL, Bytes
                    .toBytes("aaa"));
            filters.add(filter1);

            Filter filter2 = new SingleColumnValueFilter(Bytes
                    .toBytes("column2"), null, CompareFilter.CompareOp.EQUAL, Bytes
                    .toBytes("bbb"));
            filters.add(filter2);

            Filter filter3 = new SingleColumnValueFilter(Bytes
                    .toBytes("column3"), null, CompareFilter.CompareOp.EQUAL, Bytes
                    .toBytes("ccc"));
            filters.add(filter3);

            FilterList filterList1 = new FilterList(filters);

            Scan scan = new Scan();
            scan.setFilter(filterList1);
            ResultScanner rs = table.getScanner(scan);
            for (Result r : rs) {
                System.out.println("获得到rowkey:" + new String(r.getRow()));
                for (KeyValue keyValue : r.raw()) {
                    System.out.println("列：" + new String(keyValue.getFamily())
                            + "====值:" + new String(keyValue.getValue()));
                }
            }
            rs.close();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    public static void close() {
        try {
            getInstance().close();
        } catch (IOException e) {
        } finally {
            try {
                getInstance().close();
            } catch (IOException e) {
                log.error(e);
            }
        }
    }


}
