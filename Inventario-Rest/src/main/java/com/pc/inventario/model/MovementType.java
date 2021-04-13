package com.pc.inventario.model;

public enum MovementType {
    ASSEGNAZIONE("Assignation"), RICONSEGNATO("Returned"), PERSO("Lost"), DANNEGGIATO("Damaged");

    private String code;

    private MovementType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
