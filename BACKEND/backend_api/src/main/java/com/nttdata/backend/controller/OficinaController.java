package com.nttdata.backend.controller;

import com.nttdata.backend.domain.entity.Oficina;
import com.nttdata.backend.dto.response.OficinaResponseDTO;
import com.nttdata.backend.service.OficinaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/oficinas")
public class OficinaController {

    private final OficinaService oficinaService;

    @Autowired
    public OficinaController(OficinaService oficinaService) {
        this.oficinaService = oficinaService;
    }

    @PostMapping
    public ResponseEntity<OficinaResponseDTO> crearOficina(@Valid @RequestBody Oficina oficina) {
        OficinaResponseDTO nuevaOficina = oficinaService.crearOficina(oficina);
        return new ResponseEntity<>(nuevaOficina, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<OficinaResponseDTO>> obtenerTodasLasOficinas() {
        List<OficinaResponseDTO> oficinas = oficinaService.obtenerTodasLasOficinas();
        return new ResponseEntity<>(oficinas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<OficinaResponseDTO>> obtenerOficinaPorId(@PathVariable Long id) {
        Optional<OficinaResponseDTO> oficina = oficinaService.obtenerOficinaPorId(id);
        return ResponseEntity.of(Optional.ofNullable(oficina)); // Corrección: Usa ResponseEntity.of() para envolver el Optional
    }

    @PutMapping("/{id}")
    public ResponseEntity<OficinaResponseDTO> actualizarOficina(@PathVariable Long id, @Valid @RequestBody Oficina oficina) {
        OficinaResponseDTO oficinaActualizada = oficinaService.actualizarOficina(id, oficina);
        return oficinaActualizada != null ? new ResponseEntity<>(oficinaActualizada, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarOficina(@PathVariable Long id) {
        oficinaService.eliminarOficina(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}