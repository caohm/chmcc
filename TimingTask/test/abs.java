/**
 * Created by caohm on 2016/7/15.
 */
public class abs {
    static {
        System.out.println("abs static block");
    }

    {
        System.out.println("abs block");
    }

    abs() {
        System.out.println("abs struct");
    }
}
