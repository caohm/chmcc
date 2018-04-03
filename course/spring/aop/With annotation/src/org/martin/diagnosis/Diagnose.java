package org.martin.diagnosis;

import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class Diagnose {

//	@Before("execution(void run())")
	@Before("execution(void org.martin.cars.PetrolCar.run())")
	public void engine(){
		System.out.println("Checking engine...");
	}
	
	@After("execution(void run())")
	public void engineAfter(){
		System.out.println("After control ...");
	}
}
