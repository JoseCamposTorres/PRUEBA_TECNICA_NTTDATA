package com.nttdata.backend.mapper;

import com.nttdata.backend.domain.entity.Oficina;
import com.nttdata.backend.dto.response.OficinaResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OficinaMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public OficinaMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public OficinaResponseDTO oficinaToOficinaResponseDTO(Oficina oficina) {
        return modelMapper.map(oficina, OficinaResponseDTO.class);
    }

    public List<OficinaResponseDTO> oficinasToOficinaResponseDTOs(List<Oficina> oficinas) {
        return oficinas.stream()
                .map(this::oficinaToOficinaResponseDTO)
                .collect(Collectors.toList());
    }
}