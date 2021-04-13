package com.pc.inventario.exception;

public class GarmentNotFoundException extends RuntimeException{
    public GarmentNotFoundException(String message) {
        super(message);
    }
}
