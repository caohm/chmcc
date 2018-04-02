
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
