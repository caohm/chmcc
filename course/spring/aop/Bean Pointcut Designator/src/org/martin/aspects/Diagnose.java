package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {
	
//	@Pointcut("bean(*Car)")
	@Pointcut("bean(petrolCar)")
	public void beanPointcut() {
	}
	
	@Before("beanPointcut()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}

}
