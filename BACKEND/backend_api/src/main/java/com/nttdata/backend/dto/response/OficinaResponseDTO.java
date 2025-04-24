package com.nttdata.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OficinaResponseDTO {
    private Long idOficina;
    private String nombreOficina;
    private String direccionOficina;
}