package com.nttdata.backend.mapper;

import com.nttdata.backend.domain.entity.Empleado;
import com.nttdata.backend.dto.response.EmpleadoResponseDTO;
import com.nttdata.backend.dto.response.OficinaResponseDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EmpleadoMapper {

    private final ModelMapper modelMapper;

    @Autowired
    public EmpleadoMapper(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public EmpleadoResponseDTO empleadoToEmpleadoResponseDTO(Empleado empleado) {
        EmpleadoResponseDTO empleadoResponseDTO = modelMapper.map(empleado, EmpleadoResponseDTO.class);
        if (empleado.getOficinas() != null) {
            List<OficinaResponseDTO> oficinaResponseDTOs = empleado.getOficinas().stream()
                    .map(this::oficinaToOficinaResponseDTO)
                    .collect(Collectors.toList());
            empleadoResponseDTO.setOficinas(oficinaResponseDTOs);
        }
        return empleadoResponseDTO;
    }

    public List<EmpleadoResponseDTO> empleadosToEmpleadoResponseDTOs(List<Empleado> empleados) {
        return empleados.stream()
                .map(this::empleadoToEmpleadoResponseDTO)
                .collect(Collectors.toList());
    }

    private OficinaResponseDTO oficinaToOficinaResponseDTO(com.nttdata.backend.domain.entity.Oficina oficina) {
        return modelMapper.map(oficina, OficinaResponseDTO.class);
    }
}