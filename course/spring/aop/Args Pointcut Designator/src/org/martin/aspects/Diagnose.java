package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

//	@Pointcut("args(int,int)")
//	@Pointcut("args(int,..)")
	@Pointcut("args(int,*)")
	public void pointcut() {}
	
	@Before("pointcut()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}

	
	@Pointcut("args(temp)")
	public void pointcut2(int temp) {}
	
	@Before("pointcut2(temp)")
	public void testAdvice2(int temp) {
		System.out.println("Value received: " + temp);
	}
	
	@Before("args(temp1, temp2)")
	public void testAdvice3(int temp1, int temp2) {
		System.out.println("Values received: " + temp1 + " " + temp2);
	}
}
