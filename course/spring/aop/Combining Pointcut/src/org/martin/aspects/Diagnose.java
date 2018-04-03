package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

	@Pointcut("@annotation(Deprecated)")
	public void annotationPointcut() {}
	
	@Pointcut("within(org.martin.cars.*)")
	public void withinPointcut() {}
	
	@Pointcut("target(org.martin.cars.ElectricCar)")
	public void targetPointcut() {}
	
//	@Before("withinPointcut() && annotationPointcut()")
//	@Before("withinPointcut() || annotationPointcut()")
	@Before("withinPointcut() && !annotationPointcut()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}
	
}
