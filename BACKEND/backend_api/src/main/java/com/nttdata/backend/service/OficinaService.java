package com.nttdata.backend.service;

import com.nttdata.backend.domain.entity.Oficina;
import com.nttdata.backend.dto.response.OficinaResponseDTO;
import com.nttdata.backend.exception.BadRequestException;
import com.nttdata.backend.exception.ResourceNotFoundException;
import com.nttdata.backend.mapper.OficinaMapper;
import com.nttdata.backend.repository.OficinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OficinaService {

    private final OficinaRepository oficinaRepository;
    private final OficinaMapper oficinaMapper;

    @Autowired
    public OficinaService(OficinaRepository oficinaRepository, OficinaMapper oficinaMapper) {
        this.oficinaRepository = oficinaRepository;
        this.oficinaMapper = oficinaMapper;
    }

    public OficinaResponseDTO crearOficina(Oficina oficina) {
        try {
            Oficina nuevaOficina = oficinaRepository.save(oficina);
            return oficinaMapper.oficinaToOficinaResponseDTO(nuevaOficina);
        } catch (Exception e) {
            throw new BadRequestException("Error al crear la oficina: " + e.getMessage());
        }
    }

    public List<OficinaResponseDTO> obtenerTodasLasOficinas() {
        List<Oficina> oficinas = oficinaRepository.findAll();
        return oficinaMapper.oficinasToOficinaResponseDTOs(oficinas);
    }

    public Optional<OficinaResponseDTO> obtenerOficinaPorId(Long id) {
        return oficinaRepository.findById(id)
                .map(oficinaMapper::oficinaToOficinaResponseDTO);
        // .orElseThrow(() -> new ResourceNotFoundException("Oficina no encontrada con ID: " + id));
    }

    public OficinaResponseDTO actualizarOficina(Long id, Oficina oficina) {
        return oficinaRepository.findById(id)
                .map(oficinaExistente -> {
                    oficina.setIdOficina(id);
                    try {
                        Oficina oficinaActualizada = oficinaRepository.save(oficina);
                        return oficinaMapper.oficinaToOficinaResponseDTO(oficinaActualizada);
                    } catch (Exception e) {
                        throw new BadRequestException("Error al actualizar la oficina: " + e.getMessage());
                    }
                })
                .orElseThrow(() -> new ResourceNotFoundException("Oficina no encontrada con ID: " + id));
    }

    public void eliminarOficina(Long id) {
        if (!oficinaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Oficina no encontrada con ID: " + id);
        }
        oficinaRepository.deleteById(id);
    }
}