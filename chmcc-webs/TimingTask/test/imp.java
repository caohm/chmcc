
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
