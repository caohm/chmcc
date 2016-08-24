/**
 * Created by caohm on 2016/7/15.
 */
public class a {
    public static int getValue(int i) {
        int result = 0;
        switch (i) {
            case 1:
                result = result + i;
            case 2:
                result = result + i * 2;
            case 3:
                result = result + i * 3;
        }
        return result;
    }

    public static void main(String[] s) {
        int b = a.getValue(2);
        System.out.print(b);
    }


}
