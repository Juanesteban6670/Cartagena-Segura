package com.proaula.cartagena_segura.repository;

import com.proaula.cartagena_segura.model.Reporte;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReporteRepository extends MongoRepository<Reporte, String> {

}
