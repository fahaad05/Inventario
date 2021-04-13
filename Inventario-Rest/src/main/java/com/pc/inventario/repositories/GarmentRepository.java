package com.pc.inventario.repositories;

import com.pc.inventario.model.Garment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GarmentRepository extends JpaRepository<Garment, Long> {
    void deleteGarmentById(Long id);

    Optional<Garment> findGarmentById(Long id);

    Optional<List<Garment>> findGarmentByName(String name);

    Optional<List<Garment>> findGarmentByQuantAttualeGreaterThan(Integer quantAttuale);
}
