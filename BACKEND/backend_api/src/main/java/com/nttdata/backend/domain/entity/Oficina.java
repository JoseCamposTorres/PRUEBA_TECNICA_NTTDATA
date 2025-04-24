package com.nttdata.backend.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "oficinas")
public class Oficina {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_oficina")
    private Long idOficina;

    @NotBlank(message = "El nombre de la oficina es obligatorio")
    @Column(name = "nombre_oficina", nullable = false)
    private String nombreOficina;

    @Column(name = "direccion_oficina")
    private String direccionOficina;

    @ManyToMany(mappedBy = "oficinas")
    private List<Empleado> empleados;
}