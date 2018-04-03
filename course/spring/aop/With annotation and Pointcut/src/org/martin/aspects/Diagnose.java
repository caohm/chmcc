package org.martin.aspects;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {

	@Pointcut("execution(void org.martin.cars.PetrolCar.run())")
	public void run() {}
	
	@Around("run()")
	public void aroundAdvice(ProceedingJoinPoint jp){
		System.out.println("Around advice initial msg");
		
		try {
			jp.proceed();
		} catch (Throwable e) {
			System.out.println("In aroundAdvice catch: " + e.getMessage());
		}
		System.out.println("Around advice later message");
	}
	
	
}
