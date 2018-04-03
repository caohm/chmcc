package org.martin.cars;

public interface Machine {

	void run();

	void run(int speed);

	void run(int speed, int kms);

	String run(String msg);

	String run(int id, String msg);

}