package com.pc.inventario.exception;

public class MovementNotFoundException extends RuntimeException{
    public MovementNotFoundException(String message) {
        super(message);
    }
}
