package com.pc.inventario.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Garment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String size;
    private int quantAttuale;
    private int quantObiettivo;
    private int quantAssegnati;
    private int quantNd;

    public Garment(String name, String size, int quantAttuale, int quantObiettivo) {
        this.name = name;
        this.size = size;
        this.quantAttuale = quantAttuale;
        this.quantObiettivo = quantObiettivo;
    }

    public int getQuantAssegnati() {
        return quantAssegnati;
    }

    public void setQuantAssegnati(int quantAssegnati) {
        this.quantAssegnati = quantAssegnati;
    }

    public int getQuantNd() {
        return quantNd;
    }

    public void setQuantNd(int quantNd) {
        this.quantNd = quantNd;
    }

    public Garment() {
    }

    public int getQuantAttuale() {
        return quantAttuale;
    }

    public void setQuantAttuale(int quantAttuale) {
        this.quantAttuale = quantAttuale;
    }

    public int getQuantObiettivo() {
        return quantObiettivo;
    }

    public void setQuantObiettivo(int quantObiettivo) {
        this.quantObiettivo = quantObiettivo;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

}
