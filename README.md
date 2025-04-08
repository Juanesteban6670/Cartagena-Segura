# 📍 Cartagena Segura - Plataforma de Seguridad Ciudadana en Tiempo Real

**Cartagena Segura** es una plataforma web interactiva que permite a los ciudadanos reportar incidentes de seguridad en tiempo real dentro de la ciudad de Cartagena. A través de mapas dinámicos y zonas de calor, los usuarios pueden visualizar las áreas con mayor incidencia, contribuyendo así a una ciudad más segura e informada.

---

## 🚀 Funcionalidades Principales

- 📌 **Reporte en tiempo real** de incidentes de seguridad.
- 🗺️ **Mapa interactivo** con visualización de reportes y zonas de calor.
- 📊 Estadísticas y visualización dinámica de datos.
- 🔒 **Sistema de autenticación** con roles diferenciados:
  - **Ciudadano:** Reporte de incidentes.
  - **Administrador:** Visualización avanzada y gestión de reportes.
- 📍 Geolocalización de incidentes usando Leaflet.js o Google Maps API.

---

## 🧰 Tecnologías Utilizadas

### 🔙 Backend
- **Java + Spring Boot**
- **API REST**
- **MongoDB / Firebase** para almacenamiento NoSQL
- **SQL** para persistencia estructurada (opcional)

### 🔜 Frontend
- **React.js** (con página introductoria)
- **Leaflet.js** o **Google Maps API** para visualización de mapas

### 📦 Otros
- **WireMock** para pruebas con datos mockeados
- **JWT** (opcional, para autenticación segura)

---

## 🏗️ Estructura del Proyecto

/cartagena-segura │ ├── backend/ → Java + Spring Boot │ ├── src/main/java/ │ └── ... │ ├── frontend/ → React.js │ ├── public/ │ ├── src/ │ └── ... │ ├── README.md → Este archivo └── ...

yaml
Copiar
Editar

---

## 🛠️ Cómo Ejecutar el Proyecto

### 🖥️ Backend
```bash
cd backend
./mvnw spring-boot:run
