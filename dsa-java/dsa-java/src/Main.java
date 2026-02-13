import java.util.*;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);
        String str = sc.nextLine();
        int a1 = sc.nextInt();
        int b2 = sc.nextInt();

        System.out.println(str);
        System.out.println(a1*b2);

        
        
        if(a1>10){
            System.out.println("10 greater");
        } else if (b2>a1) {
            System.out.println("b2 greater");
        }
        //variables
        int a =10;
        int b= 20;

        int sum = a+b;
        int diff = b-a;

        System.out.println(sum);
        System.out.println(diff);
    }


}