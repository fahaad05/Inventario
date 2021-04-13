package com.pc.inventario.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.Date;

@Entity
public class Movement {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long userId;
    private Long garmentId;

    private MovementType movementType;

    public Movement(Long userId, Long garmentId) {
        this.userId = userId;
        this.garmentId = garmentId;
    }

    public Movement() {
    }

    public MovementType getMovementType() {
        return movementType;
    }

    public void setMovementType(MovementType movementType) {
        this.movementType = movementType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getGarmentId() {
        return garmentId;
    }

    public void setGarmentId(Long garmentId) {
        this.garmentId = garmentId;
    }

}
