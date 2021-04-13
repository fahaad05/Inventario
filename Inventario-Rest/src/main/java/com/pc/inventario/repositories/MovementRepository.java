package com.pc.inventario.repositories;

import com.pc.inventario.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MovementRepository extends JpaRepository<Movement, Long> {
    void deleteMovementById(Long id);

    Optional<List<Movement>> findMovementByGarmentId(Long garmentId);
    Optional<List<Movement>> findMovementByUserId(Long userId);
    Optional<Movement> findMovementById(Long id);

}
