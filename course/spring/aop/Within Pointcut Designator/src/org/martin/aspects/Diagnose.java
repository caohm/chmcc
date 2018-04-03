package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

//	@Pointcut("within(org.martin.cars.ElectricCar)")
//	@Pointcut("within(org.martin.cars.*)")
	@Pointcut("within(org.martin.service.Cars)")
	public void run() {}
	
	@Before("run()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}
		
}
