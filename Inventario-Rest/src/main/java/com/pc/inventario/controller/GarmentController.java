package com.pc.inventario.controller;

import com.pc.inventario.model.Garment;
import com.pc.inventario.model.User;
import com.pc.inventario.service.GarmentService;
import com.pc.inventario.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/garment")
public class GarmentController {

    private final GarmentService garmentService;

    @Autowired
    public GarmentController(GarmentService garmentService) {
        this.garmentService = garmentService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Garment>> getAllGarments() {
        List<Garment> garments = garmentService.findAllGarments();
        return new ResponseEntity<>(garments, HttpStatus.OK);
    }

    @GetMapping("/all/available")
    public ResponseEntity<Optional<List<Garment>>> getAllAvailableGarments() {
        Optional<List<Garment>> garments = garmentService.findAllAvailableGarments();
        return new ResponseEntity<>(garments, HttpStatus.OK);
    }

    @GetMapping("/find/id/{id}")
    public ResponseEntity<Garment> getGarment(@PathVariable("id") Long id) {
        Garment garment = garmentService.findGarmentById(id);
        return new ResponseEntity<>(garment, HttpStatus.OK);
    }

    @GetMapping("/find/name/{name}")
    public ResponseEntity<List<Garment>> getGarmentByName(@PathVariable("name") String name) {
        List<Garment> garments = garmentService.findGarmentByName(name);
        return new ResponseEntity<>(garments, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Garment> addGarment(@RequestBody Garment garment) {
        Garment newGarment = garmentService.addGarment(garment);
        return new ResponseEntity<>(newGarment, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Garment> updateGarment(@RequestBody Garment garment) {
        Garment updateGarment = garmentService.updateGarment(garment);
        return new ResponseEntity<>(updateGarment, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteupdateGarment(@PathVariable("id") Long id) {
        garmentService.deleteGarment(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
