/**
 * Created by caohm on 2016/7/15.
 */
public class imp extends abs {
    static {
        System.out.println("imp static block");
    }

    {
        System.out.println("imp block");
    }

    imp() {
        System.out.println("imp struct");
    }

}
