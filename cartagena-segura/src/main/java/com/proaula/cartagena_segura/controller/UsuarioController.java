package com.proaula.cartagena_segura.controller;

import com.proaula.cartagena_segura.model.Usuario;
import com.proaula.cartagena_segura.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/registro")
    public String registrarUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(usuario.getEmail());
        if (existente.isPresent()) {
            return "El correo ya está registrado ❌";
        }
        usuario.setRol("CIUDADANO");
        usuarioRepository.save(usuario);
        return "Usuario registrado correctamente ✅";
    }

    @PostMapping("/login")
    public Object login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioBD = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioBD.isPresent() && usuarioBD.get().getPassword().equals(usuario.getPassword())) {
            return usuarioBD.get(); // Devolver info del usuario (sin ocultar por ahora)
        }
        return "Credenciales incorrectas ❌";
    }
}
