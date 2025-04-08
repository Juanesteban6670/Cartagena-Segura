package com.proaula.cartagena_segura.service;

import com.proaula.cartagena_segura.model.Reporte;
import com.proaula.cartagena_segura.repository.ReporteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReporteService {

    @Autowired
    private ReporteRepository reporteRepository;

    public Reporte guardarReporte(Reporte reporte) {
        return reporteRepository.save(reporte);
    }

    public List<Reporte> obtenerTodosLosReportes() {
        return reporteRepository.findAll();
    }

    public Reporte obtenerPorId(String id) {
        return reporteRepository.findById(id).orElse(null);
    }

    public void eliminarReporte(String id) {
        reporteRepository.deleteById(id);
    }
}
