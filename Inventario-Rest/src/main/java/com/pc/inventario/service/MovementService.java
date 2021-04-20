package com.pc.inventario.service;

import com.pc.inventario.controller.MovementController;
import com.pc.inventario.exception.MovementNotFoundException;
import com.pc.inventario.model.Movement;
import com.pc.inventario.model.MovementType;
import com.pc.inventario.repositories.MovementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@Transactional
public class MovementService {
    private final MovementRepository movementRepository;

    @Autowired
    private final GarmentService garmentService;

    @Autowired
    private final UserService userService;

    private static Logger logger = (Logger) LoggerFactory.getLogger(MovementService.class);


    @Autowired
    public MovementService(MovementRepository movementRepository, GarmentService garmentService, UserService userService) {
        this.movementRepository = movementRepository;
        this.garmentService = garmentService;
        this.userService = userService;
    }

    public Movement addMovement(Movement movement) {
        //Modifico la quantità attuale dell'indumento selezionato
        movement.setMovementType(MovementType.ASSEGNAZIONE);

        garmentService.updateGarmentQuant(movement.getGarmentId(), 0);
        userService.updateNumDotazioniPlus(movement.getUserId());
        return movementRepository.save(movement);
    }

    public Movement updateStatus(Movement movement, int id) {
        if (id >= 0 && id < 3) {
            switch (id) {
                case 0:
                    movement.setMovementType(MovementType.RICONSEGNATO);
                    garmentService.updateGarmentQuant(movement.getGarmentId(), 1);
                    break;
                case 1:
                    movement.setMovementType(MovementType.PERSO);
                    garmentService.updateGarmentQuant(movement.getGarmentId(), 2);
                    break;
                case 2:
                    movement.setMovementType(MovementType.DANNEGGIATO);
                    garmentService.updateGarmentQuant(movement.getGarmentId(), 2);
                    break;
            }
            userService.updateNumDotazioniMinus(movement.getUserId());
            return movementRepository.save(movement);
        }
        return null;
    }

    public void deleteMovement(Long id) {
        Movement movement = findMovementById(id);
        garmentService.updateGarmentQuant(movement.getGarmentId(),1);
        userService.updateNumDotazioniMinus(movement.getUserId());
        movementRepository.deleteMovementById(id);
    }

    public List<Movement> findAllMovements() {
        return movementRepository.findAll();
    }

    public Movement findMovementById(Long id) {
        return movementRepository.findMovementById(id).orElseThrow(() ->
                new MovementNotFoundException("Movement by id " + id + " was not found!"));
    }

    public List<Movement> findAllMovementsByGarmentIdWithTypeAssigned(Long garmentId) {
        List<Movement> movementList = movementRepository.findMovementByGarmentId(garmentId)
                .orElse(null);
        movementList.removeIf(m -> m.getMovementType() != MovementType.ASSEGNAZIONE);
        return movementList;
    }

    public List<Movement> findAllMovementsByUserIdWithTypeAssigned(Long userId) {
        List<Movement> movementList = movementRepository.findMovementByUserId(userId)
                .orElse(null);
        movementList.removeIf(m -> m.getMovementType() != MovementType.ASSEGNAZIONE);
        return movementList;
    }

    public List<Movement> findAllMovementsByUserIdWithTypeNotAssigned(Long userId) {
        List<Movement> movementList = movementRepository.findMovementByUserId(userId).orElse(null);
        movementList.removeIf(m -> m.getMovementType() == MovementType.ASSEGNAZIONE);
        return movementList;

    }


}
