package com.proaula.cartagena_segura.controller;

import com.proaula.cartagena_segura.model.Usuario;
import com.proaula.cartagena_segura.repository.UsuarioRepository;
import com.proaula.cartagena_segura.model.HistorialEvento;
import com.proaula.cartagena_segura.repository.HistorialEventoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
//@CrossOrigin(origins = "*")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private HistorialEventoRepository historialEventoRepository;

    @PostMapping("/registro")
    public String registrarUsuario(@RequestBody Usuario usuario) {
        Optional<Usuario> existente = usuarioRepository.findByEmail(usuario.getEmail());
        if (existente.isPresent()) {
            return "El correo ya está registrado ❌";
        }
        usuario.setRol("CIUDADANO");
        usuarioRepository.save(usuario);

        registrarEvento("REGISTRO", usuario.getEmail()); // Historial

        return "Usuario registrado correctamente ✅";
    }

    @PostMapping("/login")
    public Object login(@RequestBody Usuario usuario) {
        Optional<Usuario> usuarioBD = usuarioRepository.findByEmail(usuario.getEmail());
        if (usuarioBD.isPresent() && usuarioBD.get().getPassword().equals(usuario.getPassword())) {
            registrarEvento("LOGIN", usuario.getEmail()); // Historial
            return usuarioBD.get(); // Retornar el usuario
        }
        return "Credenciales incorrectas ❌";
    }

    private void registrarEvento(String tipo, String email) {
        HistorialEvento evento = new HistorialEvento();
        evento.setTipo(tipo);
        evento.setEmail(email);
        evento.setFechaHora(LocalDateTime.now());
        historialEventoRepository.save(evento);
    }
}
