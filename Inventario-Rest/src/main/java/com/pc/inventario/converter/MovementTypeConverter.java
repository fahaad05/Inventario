package com.pc.inventario.converter;

import com.pc.inventario.model.MovementType;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import java.util.stream.Stream;

@Converter(autoApply = true)
public class MovementTypeConverter implements AttributeConverter<MovementType, String> {
    @Override
    public String convertToDatabaseColumn(MovementType movementType) {
        if (movementType == null) {
        return null;
        }
        return movementType.getCode();
    }

    @Override
    public MovementType convertToEntityAttribute(String code) {
        if (code == null) {
        return null;
        }

        return Stream.of(MovementType.values())
                .filter(m -> m.getCode().equals(code))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
