package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

	// * - one parameter
	// .. - does not matter how many parameters is it
//	@Pointcut("execution(void org.martin.cars.PetrolCar.run(..))")
//	@Pointcut("execution(* org.martin.cars.PetrolCar.run(*,*))")
//	@Pointcut("execution(* org.martin.cars.PetrolCar.*(*,*))")
	@Pointcut("execution(* org.martin.cars.PetrolCar.run(..))")
	public void run() {}
	
	@Before("run()")
	public void testAdvice() {
		System.out.println("Test Advice");
	}
		
}
