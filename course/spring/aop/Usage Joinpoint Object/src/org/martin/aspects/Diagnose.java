package org.martin.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.martin.cars.PetrolCar;

@Aspect
public class Diagnose {

	@Pointcut("within(org.martin.service.Cars)")
	public void run() {}
	
	@Before("execution(void run(int))")
	public void testAdvice(JoinPoint jp) {
		System.out.println(jp.toString());
		PetrolCar car = (PetrolCar) jp.getTarget();
		car.run("Test call to run method");

		for (Object ob : jp.getArgs()) {
			System.out.println("Arg received: " + ob);
		}
		
		
		System.out.println("Test Advice");
	}
		
}
