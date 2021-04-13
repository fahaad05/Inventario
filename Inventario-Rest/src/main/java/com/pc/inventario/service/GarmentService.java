package com.pc.inventario.service;

import com.pc.inventario.exception.GarmentNotFoundException;
import com.pc.inventario.model.Garment;
import com.pc.inventario.repositories.GarmentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class GarmentService {
    private final GarmentRepository garmentRepository;
    private static Logger logger = (Logger) LoggerFactory.getLogger(GarmentService.class);

    @Autowired
    public GarmentService(GarmentRepository garmentRepository) {
        this.garmentRepository = garmentRepository;
    }

    public Garment addGarment(Garment garment) {
        return garmentRepository.save(garment);
    }

    public List<Garment> findAllGarments() {
        return garmentRepository.findAll();
    }

    public Optional<List<Garment>> findAllAvailableGarments() {
        return garmentRepository.findGarmentByQuantAttualeGreaterThan(0);
    }

    public Garment updateGarment(Garment garment) {
        return garmentRepository.save(garment);
    }

    public void updateGarmentQuant(Long id, int fieldToTouch) {
        Optional<Garment> garment = garmentRepository.findGarmentById(id);
        if (fieldToTouch >= 0 && fieldToTouch < 3) {
            switch (fieldToTouch) {
                case 0:
                    garment.ifPresentOrElse(this::updateQuantAttualeMinusAndQuantAssegnatiPlus, () -> new GarmentNotFoundException("Garment by id " + id + " was not found!"));
                    break;
                case 1:
                    garment.ifPresentOrElse(this::updateQuantAttualePlusAndQuantAssegnatiMinus, () -> new GarmentNotFoundException("Garment by id " + id + " was not found!"));
                    break;
                case 2:
                    garment.ifPresentOrElse(this::updateQuantityNdPlus, () -> new GarmentNotFoundException("Garment by id "+ id+" was not found!"));
            }
        }
    }

    private Garment updateQuantityNdPlus(Garment garment) {
        int quantNdPlus = garment.getQuantNd();
        quantNdPlus++;
        garment.setQuantNd(quantNdPlus);
        return garmentRepository.save(garment);
    }

    private Garment updateQuantAttualeMinusAndQuantAssegnatiPlus(Garment garment) {
        int quant = garment.getQuantAttuale();
        quant--;
        garment.setQuantAttuale(quant);
        quant = garment.getQuantAssegnati();
        quant++;
        garment.setQuantAssegnati(quant);
        return garmentRepository.save(garment);
    }

    private Garment updateQuantAttualePlusAndQuantAssegnatiMinus(Garment garment) {
        int quant = garment.getQuantAttuale();
        quant++;
        garment.setQuantAttuale(quant);
        quant = garment.getQuantAssegnati();
        quant--;
        garment.setQuantAssegnati(quant);
        return garmentRepository.save(garment);
    }

    public Garment findGarmentById(Long id) {
        return garmentRepository.findGarmentById(id).orElseThrow(() ->
                new GarmentNotFoundException("Garment by id " + id + " was not found!"));
    }

    public List<Garment> findGarmentByName(String name) {
        return garmentRepository.findGarmentByName(name).orElseThrow(() ->
                new GarmentNotFoundException("Garment by name " + name + " was not found!"));
    }

    public void deleteGarment(Long id) {
        garmentRepository.deleteGarmentById(id);
    }
}
