package org.martin.aspects;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

	@Pointcut("execution(void org.martin.cars.PetrolCar.run())")
	public void run() {}
	
	@Before("execution(void org.martin.cars.PetrolCar.run())")
	public void engine(){
		System.out.println("Checking engine...");
	}
	
//	@After("run()")
//	public void engineAfter(){
//		System.out.println("After control ...");
//	}
	
//	returning in no kind of exception
//	@AfterReturning("run()")
//	public void engineAfter(){
//		System.out.println("After Returning control ...");
//	}
	
//	returning in exception
	@AfterThrowing("run()")
	public void engineAfter(){
		System.out.println("After Returning control ...");
	}
	
}
