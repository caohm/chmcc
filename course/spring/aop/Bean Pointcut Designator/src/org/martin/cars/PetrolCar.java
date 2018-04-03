package org.martin.cars;

public class PetrolCar implements Machine {

	public void run(){
		System.out.println("Running petrol car");
	}
	
	public void run(int speed){
		System.out.println("Running at: " + speed + "km/h");
	}
	
	public void run(int speed, int kms){
		System.out.println("Running at: " + speed + " for " + kms + " KM");
	}

	public String run(String msg) {
		System.out.println(msg);
		return msg;
	}
	
	public String run(int id, String msg) {
		System.out.println(id + " " + msg);
		return msg;
	}
}
