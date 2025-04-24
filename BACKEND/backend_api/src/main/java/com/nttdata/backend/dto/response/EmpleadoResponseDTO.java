package com.nttdata.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmpleadoResponseDTO {
    private Long idEmpleado;
    private String nombres;
    private String telefono;
    private String dni;
    private String direccion;
    private Date fechaNacimiento;
    private List<OficinaResponseDTO> oficinas; // Lista de DTOs de Oficina
}