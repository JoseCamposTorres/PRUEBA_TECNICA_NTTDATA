package com.nttdata.backend.domain.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data // <--- Asegúrate de tener esta anotación
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "empleados")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado")
    private Long idEmpleado;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombres;

    @Pattern(regexp = "^[0-9]{9}$", message = "El teléfono debe tener 9 dígitos numéricos")
    private String telefono;

    @NotBlank(message = "El DNI es obligatorio")
    @Size(min = 8, max = 8, message = "El DNI debe tener 8 dígitos")
    @Column(unique = true)
    private String dni;

    private String direccion;

    @NotNull(message = "La fecha de nacimiento es obligatoria")
    @Past(message = "La fecha de nacimiento debe ser en el pasado")
    @Column(name = "fecha_nacimiento")
    @Temporal(TemporalType.DATE)
    private Date fechaNacimiento;

    @ManyToMany
    @JoinTable(
            name = "empleados_oficinas",
            joinColumns = @JoinColumn(name = "id_empleado"),
            inverseJoinColumns = @JoinColumn(name = "id_oficina")
    )
    private List<Oficina> oficinas;
}