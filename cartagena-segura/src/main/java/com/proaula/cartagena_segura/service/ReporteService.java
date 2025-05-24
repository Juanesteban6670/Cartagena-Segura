package com.proaula.cartagena_segura.service;

import com.proaula.cartagena_segura.model.Reporte;
import com.proaula.cartagena_segura.repository.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ReporteService {

    @Autowired
    private ReporteRepository reporteRepository;

    @Cacheable(value = "reportes")
    public Page<Reporte> obtenerTodosLosReportes(Pageable pageable) {
        return reporteRepository.findAll(pageable);
    }

    @CacheEvict(value = "reportes", allEntries = true)
    public Reporte guardarReporte(Reporte reporte) {
        return reporteRepository.save(reporte);
    }

    public Reporte obtenerPorId(String id) {
        return reporteRepository.findById(id).orElse(null);
    }

    @CacheEvict(value = "reportes", allEntries = true)
    public void eliminarReporte(String id) {
        reporteRepository.deleteById(id);
    }
}
