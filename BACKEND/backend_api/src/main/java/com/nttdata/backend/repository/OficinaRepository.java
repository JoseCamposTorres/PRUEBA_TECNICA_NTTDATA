package com.nttdata.backend.repository;

import com.nttdata.backend.domain.entity.Oficina;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OficinaRepository extends JpaRepository<Oficina, Long> {

    List<Oficina> findByNombreOficinaContainingIgnoreCase(String nombreOficina);
}