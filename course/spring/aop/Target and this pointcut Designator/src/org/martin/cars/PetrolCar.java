package org.martin.cars;

public class PetrolCar implements Machine {

	@Override
	public void run(){
		System.out.println("Running petrol car");
	}
	
	@Override
	public void run(int speed){
		System.out.println("Running at: " + speed + "km/h");
	}
	
	@Override
	public void run(int speed, int kms){
		System.out.println("Running at: " + speed + " for " + kms + " KM");
	}

	@Override
	public String run(String msg) {
		System.out.println(msg);
		return msg;
	}
	
	@Override
	public String run(int id, String msg) {
		System.out.println(id + " " + msg);
		return msg;
	}
}
