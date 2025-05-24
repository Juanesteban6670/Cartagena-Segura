package com.proaula.cartagena_segura.controller;

import com.proaula.cartagena_segura.model.Reporte;
import com.proaula.cartagena_segura.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


@RestController
@RequestMapping("/api/reportes")
//@CrossOrigin(origins = "*")
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @PostMapping
    public Reporte crearReporte(@RequestBody Reporte reporte) {
        return reporteService.guardarReporte(reporte);
    }

    // Cambiado para paginación
    @GetMapping
    public Page<Reporte> obtenerTodosLosReportes(Pageable pageable) {
        return reporteService.obtenerTodosLosReportes(pageable);
    }

    @GetMapping("/{id}")
    public Reporte obtenerReportePorId(@PathVariable String id) {
        return reporteService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarReporte(@PathVariable String id) {
        reporteService.eliminarReporte(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Reporte> cambiarEstado(@PathVariable String id, @RequestBody Reporte reporteActualizado) {
        Reporte reporteExistente = reporteService.obtenerPorId(id);
        if (reporteExistente == null) {
            return ResponseEntity.notFound().build();
        }
        reporteExistente.setEstado(reporteActualizado.getEstado());
        Reporte reporteGuardado = reporteService.guardarReporte(reporteExistente);
        return ResponseEntity.ok(reporteGuardado);
    }
}
