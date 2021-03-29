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
    private Date movementDate;

    public Movement(Long userId, Long garmentId, Date movementDate) {
        this.userId = userId;
        this.garmentId = garmentId;
        this.movementDate = movementDate;
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

    public Date getMovementDate() {
        return movementDate;
    }

    public void setMovementDate(Date movementDate) {
        this.movementDate = movementDate;
    }
}
