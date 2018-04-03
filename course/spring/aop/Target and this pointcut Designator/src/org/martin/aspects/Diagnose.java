package org.martin.aspects;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class Diagnose {
	
	@Pointcut("target(org.martin.cars.Machine)")
	public void targetPointcut(){		
	}
	
	@Before("targetPointcut()")
	public void targetAdvice() {
		System.out.println("Target Advice");
	}
	
	@Pointcut("this(org.martin.cars.PetrolCar)")
	public void thisPointcut(){
	}
	
	@Before("thisPointcut()")
	public void thisAdvice() {
		System.out.println("This Advice");
	}

}
