import React from "react";
import ReporteForm from "./components/ReporteForm";
import ReporteLista from "./components/ReporteLista";

function App() {
  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#ffffff"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "2rem", textShadow: "0 0 8px #39ff14" }}>
        🛡️ Cartagena Segura
      </h1>
      <ReporteForm />
      <ReporteLista />
    </div>
  );
}

export default App;
