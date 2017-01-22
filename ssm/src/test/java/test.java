import org.junit.Assert;
import org.junit.Test;

/**
 * Created by caohongming on 2016/12/30.
 */
public class test {
    @Test
    public void test1() {
        String origin = "RPC-Rpc-rpc";
        Assert.assertTrue(origin.contains("RPC"));
    }

    @Test
    public void test2() {
        String origin = "RPC--";
        Assert.assertTrue(origin.contains("RPC"));
    }

    @Test
    public void test3() {
        String origin = "-Rpc-rpc";
        Assert.assertTrue(origin.contains("RPC"));
    }

    @Test
    public void test4() {
        String origin = "--rpc";
        Assert.assertTrue(origin.contains("RPC"));
    }

    @Test
    public void test5() {
        Assert.assertTrue("test".equals(getClass().getSimpleName()));
    }
}
