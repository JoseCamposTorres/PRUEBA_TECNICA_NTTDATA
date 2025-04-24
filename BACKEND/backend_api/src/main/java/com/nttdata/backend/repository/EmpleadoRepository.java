package com.nttdata.backend.repository;

import com.nttdata.backend.domain.entity.Empleado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmpleadoRepository extends JpaRepository<Empleado, Long> {

    Optional<Empleado> findByDni(String dni);

    List<Empleado> findByNombresContainingIgnoreCase(String nombres);

    @Query("SELECT e FROM Empleado e JOIN e.oficinas o WHERE o.idOficina = :oficinaId")
    List<Empleado> findByOficinas_IdOficina(@Param("oficinaId") Long oficinaId);

    @Query("SELECT e FROM Empleado e WHERE SIZE(e.oficinas) = 0")
    List<Empleado> findByOficinasIsEmpty();

    @Query("SELECT e FROM Empleado e WHERE SIZE(e.oficinas) > 0")
    List<Empleado> findByOficinasIsNotEmpty();
}