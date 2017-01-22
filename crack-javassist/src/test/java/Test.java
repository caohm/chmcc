import javassist.ClassPool;
import javassist.NotFoundException;

/**
 * Created by caohongming on 2017/1/17.
 */
public class Test {
    public static void main(String args[]) {
        ClassPool pool = ClassPool.getDefault();

        try {
            pool.insertClassPath(System.getProperty("user.dir") + "");
        } catch (NotFoundException e) {
            e.printStackTrace();
        }
    }
}
