package com.proaula.cartagena_segura.repository;

import com.proaula.cartagena_segura.model.Usuario;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    @Cacheable(value = "usuarios", key = "#email")
    Optional<Usuario> findByEmail(String email);
}
