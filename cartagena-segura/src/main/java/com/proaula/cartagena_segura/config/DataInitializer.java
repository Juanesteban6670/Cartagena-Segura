package com.proaula.cartagena_segura.config;

import com.proaula.cartagena_segura.model.Usuario;
import com.proaula.cartagena_segura.repository.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsuarioRepository usuarioRepository;

    public DataInitializer(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public void run(String... args) {
        String adminEmail = "admin@segura.com";
        String adminPassword = "admin123";

        usuarioRepository.findByEmail(adminEmail).ifPresentOrElse(
                user -> System.out.println("✅ Administrador ya existente"),
                () -> {
                    Usuario admin = new Usuario();
                    admin.setNombre("Administrador");
                    admin.setEmail(adminEmail);
                    admin.setPassword(adminPassword);
                    admin.setRol("ADMIN");
                    usuarioRepository.save(admin);
                    System.out.println("🛠️ Administrador creado por defecto");
                }
        );
    }
}
