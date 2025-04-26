package com.proaula.cartagena_segura.controller;

import com.proaula.cartagena_segura.model.Reporte;
import com.proaula.cartagena_segura.service.ReporteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*") // Permite llamadas desde cualquier origen (útil para frontend React o Vue)
public class ReporteController {

    @Autowired
    private ReporteService reporteService;

    @PostMapping
    public Reporte crearReporte(@RequestBody Reporte reporte) {
        return reporteService.guardarReporte(reporte);
    }

    @GetMapping
    public List<Reporte> obtenerTodosLosReportes() {
        return reporteService.obtenerTodosLosReportes();
    }

    @GetMapping("/{id}")
    public Reporte obtenerReportePorId(@PathVariable String id) {
        return reporteService.obtenerPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminarReporte(@PathVariable String id) {
        reporteService.eliminarReporte(id);
    }
}
