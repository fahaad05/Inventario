package com.pc.inventario.controller;

import com.pc.inventario.model.Movement;
import com.pc.inventario.service.MovementService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;

@RestController
@RequestMapping("movement/")
public class MovementController {

    private final MovementService movementService;
    private static Logger logger = (Logger) LoggerFactory.getLogger(MovementController.class);


    @Autowired
    public MovementController(MovementService movementService) {
        this.movementService = movementService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Movement>> getAllMovements() {
        List<Movement> movements = movementService.findAllMovements();
        return new ResponseEntity<>(movements, HttpStatus.OK);
    }

    @GetMapping("/find/garment/{id}")
    public ResponseEntity<List<Movement>> getAllMovementsByGarmentIdWithTypeAssigned(@PathVariable("id") Long garmentId) {
        List<Movement> movements = movementService.findAllMovementsByGarmentIdWithTypeAssigned(garmentId);
        if (movements == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(movements, HttpStatus.OK);
    }

    @GetMapping("/find/user/{id}")
    public ResponseEntity<List<Movement>> getAllMovementsByUserIdWithTypeAssigned(@PathVariable("id") Long userId) {
        List<Movement> movements = movementService.findAllMovementsByUserIdWithTypeAssigned(userId);
        if (movements == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(movements, HttpStatus.OK);
    }

    @GetMapping("/find/user/{id}/notAssigned")
    public ResponseEntity<List<Movement>> findAllMovementsByUserIdWithTypeNotAssigned(@PathVariable("id") Long userId) {
        List<Movement> movements = movementService.findAllMovementsByUserIdWithTypeNotAssigned(userId);

        if (movements == null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        return new ResponseEntity<>(movements, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Movement> addMovement(@RequestBody Movement movement, @RequestParam("date") String date) {

        //Logica per la data
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE LLL dd yyyy", Locale.ENGLISH);
        if (StringUtils.hasText(date)) {
            logger.info("addMovement - Date Retrieved from Client in param: "+date);
            LocalDate newDate = LocalDate.parse(date, formatter);
            logger.info("addMovement - Date Set: "+newDate);
            movement.setMovementDate(newDate);
        }

        Movement newMovement = movementService.addMovement(movement);
        return new ResponseEntity<>(newMovement, HttpStatus.CREATED);
    }

    @PutMapping("/update/status/{id}")
    public ResponseEntity<Movement> updateMovementStatus(@RequestBody Movement movement, @PathVariable("id") int id, @RequestParam("date") String date) {

        //Logica per la data
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE LLL dd yyyy", Locale.ENGLISH);
        if (StringUtils.hasText(date)) {
            logger.info("updateMovementStatus - Date Retrieved from Client in param: "+date);
            LocalDate newDate = LocalDate.parse(date, formatter);
            logger.info("updateMovementStatus - Date Set: "+newDate);
            movement.setMovementDate(newDate);
        }

        Movement updateMovement = movementService.updateStatus(movement, id);
        if (updateMovement == null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(updateMovement, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteupdateMovement(@PathVariable("id") Long id) {
        movementService.deleteMovement(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
