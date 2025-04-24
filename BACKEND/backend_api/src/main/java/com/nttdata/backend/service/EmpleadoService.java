package com.nttdata.backend.service;

import com.nttdata.backend.domain.entity.Empleado;
import com.nttdata.backend.domain.entity.Oficina;
import com.nttdata.backend.dto.response.EmpleadoResponseDTO;
import com.nttdata.backend.exception.BadRequestException;
import com.nttdata.backend.exception.ResourceNotFoundException;
import com.nttdata.backend.mapper.EmpleadoMapper;
import com.nttdata.backend.repository.EmpleadoRepository;
import com.nttdata.backend.repository.OficinaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmpleadoService {

    private final EmpleadoRepository empleadoRepository;
    private final OficinaRepository oficinaRepository;
    private final EmpleadoMapper empleadoMapper;

    @Autowired
    public EmpleadoService(EmpleadoRepository empleadoRepository, OficinaRepository oficinaRepository, EmpleadoMapper empleadoMapper) {
        this.empleadoRepository = empleadoRepository;
        this.oficinaRepository = oficinaRepository;
        this.empleadoMapper = empleadoMapper;
    }

    public EmpleadoResponseDTO crearEmpleado(Empleado empleado) {
        if (empleadoRepository.findByDni(empleado.getDni()).isPresent()) {
            throw new BadRequestException("Ya existe un empleado registrado con el DNI: " + empleado.getDni());
        }
        try {
            Empleado nuevoEmpleado = empleadoRepository.save(empleado);
            return empleadoMapper.empleadoToEmpleadoResponseDTO(nuevoEmpleado);
        } catch (Exception e) {
            throw new BadRequestException("Error al crear el empleado: " + e.getMessage());
        }
    }

    public List<EmpleadoResponseDTO> obtenerTodosLosEmpleados() {
        List<Empleado> empleados = empleadoRepository.findAll();
        return empleadoMapper.empleadosToEmpleadoResponseDTOs(empleados);
    }

    public Optional<EmpleadoResponseDTO> obtenerEmpleadoPorId(Long id) {
        return empleadoRepository.findById(id)
                .map(empleadoMapper::empleadoToEmpleadoResponseDTO);
        // .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + id));
    }

    public EmpleadoResponseDTO actualizarEmpleado(Long id, Empleado empleado) {
        return empleadoRepository.findById(id)
                .map(empleadoExistente -> {
                    empleado.setIdEmpleado(id);
                    try {
                        Empleado empleadoActualizado = empleadoRepository.save(empleado);
                        return empleadoMapper.empleadoToEmpleadoResponseDTO(empleadoActualizado);
                    } catch (Exception e) {
                        throw new BadRequestException("Error al actualizar el empleado: " + e.getMessage());
                    }
                })
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + id));
    }

    public void eliminarEmpleado(Long id) {
        if (!empleadoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Empleado no encontrado con ID: " + id);
        }
        empleadoRepository.deleteById(id);
    }

    @Transactional
    public EmpleadoResponseDTO asignarOficinas(Long empleadoId, List<Long> oficinaIds) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + empleadoId));
        List<Oficina> oficinas = oficinaRepository.findAllById(oficinaIds);

        if (oficinas.size() != oficinaIds.size()) {
            throw new BadRequestException("Una o más oficinas no existen.");
        }

        empleado.getOficinas().addAll(oficinas);
        return empleadoMapper.empleadoToEmpleadoResponseDTO(empleadoRepository.save(empleado));
    }

    @Transactional
    public void desasignarOficina(Long empleadoId, Long oficinaId) {
        Empleado empleado = empleadoRepository.findById(empleadoId)
                .orElseThrow(() -> new ResourceNotFoundException("Empleado no encontrado con ID: " + empleadoId));
        boolean removed = empleado.getOficinas().removeIf(oficina -> oficina.getIdOficina().equals(oficinaId));
        if (!removed) {
            throw new BadRequestException("El empleado no está asignado a la oficina con ID: " + oficinaId);
        }
    }
}