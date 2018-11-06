package io.github.kri2.server;

class CarNotFoundException extends RuntimeException {
    
    CarNotFoundException(Long id) {
        super("Could not find car " + id);
    }
}
