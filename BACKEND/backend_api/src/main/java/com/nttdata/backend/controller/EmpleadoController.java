package com.nttdata.backend.controller;

import com.nttdata.backend.domain.entity.Empleado;
import com.nttdata.backend.dto.response.EmpleadoResponseDTO;
import com.nttdata.backend.service.EmpleadoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {

    private final EmpleadoService empleadoService;

    @Autowired
    public EmpleadoController(EmpleadoService empleadoService) {
        this.empleadoService = empleadoService;
    }

    @PostMapping
    public ResponseEntity<EmpleadoResponseDTO> crearEmpleado(@Valid @RequestBody Empleado empleado) {
        EmpleadoResponseDTO nuevoEmpleado = empleadoService.crearEmpleado(empleado);
        return new ResponseEntity<>(nuevoEmpleado, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<EmpleadoResponseDTO>> obtenerTodosLosEmpleados() {
        List<EmpleadoResponseDTO> empleados = empleadoService.obtenerTodosLosEmpleados();
        return new ResponseEntity<>(empleados, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<EmpleadoResponseDTO>> obtenerEmpleadoPorId(@PathVariable Long id) {
        Optional<EmpleadoResponseDTO> empleado = empleadoService.obtenerEmpleadoPorId(id);
        return ResponseEntity.of(Optional.ofNullable(empleado));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmpleadoResponseDTO> actualizarEmpleado(@PathVariable Long id, @Valid @RequestBody Empleado empleado) {
        EmpleadoResponseDTO empleadoActualizado = empleadoService.actualizarEmpleado(id, empleado);
        return empleadoActualizado != null ? new ResponseEntity<>(empleadoActualizado, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarEmpleado(@PathVariable Long id) {
        empleadoService.eliminarEmpleado(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{empleadoId}/oficinas")
    public ResponseEntity<EmpleadoResponseDTO> asignarOficinas(@PathVariable Long empleadoId, @RequestBody List<Long> oficinaIds) {
        EmpleadoResponseDTO empleadoActualizado = empleadoService.asignarOficinas(empleadoId, oficinaIds);
        return empleadoActualizado != null ? new ResponseEntity<>(empleadoActualizado, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{empleadoId}/oficinas/{oficinaId}")
    public ResponseEntity<Void> desasignarOficina(@PathVariable Long empleadoId, @PathVariable Long oficinaId) {
        empleadoService.desasignarOficina(empleadoId, oficinaId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}