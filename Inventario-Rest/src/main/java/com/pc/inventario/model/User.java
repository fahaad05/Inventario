package com.pc.inventario.model;

import net.bytebuddy.implementation.bind.annotation.Default;
import org.springframework.boot.context.properties.bind.DefaultValue;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String name;
    private String surname;
    @Column(columnDefinition = "integer default 0")
    private int numDotazioni;

    public User(String name, String surname) {
        this.name = name;
        this.surname = surname;
    }

    public User() {
    }

    public int getNumDotazioni() {
        return numDotazioni;
    }

    public void setNumDotazioni(int numDotazioni) {
        this.numDotazioni = numDotazioni;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", nome='" + name + '\'' +
                ", cognome='" + surname + '\'' +
                '}';
    }
}
