package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class Diagnose {
	
	@Before("execution(public void run())")
	public void testAdvice() {
		System.out.println("Test Advice");
	}

}
