package io.github.kri2.server;

public class CarNotFoundException extends RuntimeException {
    
    public CarNotFoundException(Long id) {
        super("Could not find car " + id);
    }
}
