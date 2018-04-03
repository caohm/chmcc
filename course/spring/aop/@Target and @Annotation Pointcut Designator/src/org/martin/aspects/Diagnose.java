package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {
/*
//	@Pointcut("within(@org.springframework.stereotype.Component org.martin.cars.*)")
	@Pointcut("@target(org.springframework.stereotype.Component)")
	public void targetPointcut() {}
	
	@Before("targetPointcut()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}
	*/
	
	@Pointcut("@annotation(Deprecated)")
	public void annotationPointcut() {}
	
	@Before("annotationPointcut()")
	public void testAdvice2() {
		System.out.println("Test Advice for annotation");
	}
		
}
