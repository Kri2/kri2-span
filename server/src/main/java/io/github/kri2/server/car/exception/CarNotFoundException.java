package io.github.kri2.server.car.exception;

public class CarNotFoundException extends RuntimeException {
    
    public CarNotFoundException(Long id) {
        super("Could not find car " + id);
    }
}
