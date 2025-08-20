import { useState } from 'react';
import './App.css';
import Estudiantes from "./modules/Estudiantes/Students";

function App() {
  const [activeModule, setActiveModule] = useState<string>("");

  return (
    <div>
      {/* Header fijo */}
      <header className="header">
        <span>Gestión</span>
        <span>Académica</span>
      </header>

      {/* Sidebar fija */}
      <aside className="sidebar">
        <ul>
          <li onClick={() => setActiveModule("estudiantes")}>
            Estudiantes
          </li>
          <li onClick={() => setActiveModule("asistencias")}>
            Asistencia a clases
          </li>
          <li onClick={() => setActiveModule("calificaciones")}>
            Registro de calificaciones
          </li>
          <li onClick={() => setActiveModule("planificacion")}>
            Planificación de cursos
          </li>
          <li onClick={() => setActiveModule("evaluaciones")}>
            Evaluaciones
          </li>
          <li onClick={() => setActiveModule("usuarios")}>
            Control de usuarios
          </li>
          <li onClick={() => setActiveModule("reportes")}>
            Reportes académicos
          </li>
        </ul>
      </aside>

      {/* Contenido dinámico */}
      <main className="main-content">
        {activeModule === "" && <p>Bienvenido al sistema académico.</p>}
        {activeModule === "estudiantes" && <Estudiantes />}
        {activeModule === "asistencias" && <h2>Módulo de Asistencias</h2>}
        {activeModule === "calificaciones" && <h2>Módulo de Calificaciones</h2>}
        {activeModule === "planificacion" && <h2>Módulo de Planificación</h2>}
        {activeModule === "evaluaciones" && <h2>Módulo de Evaluaciones</h2>}
        {activeModule === "usuarios" && <h2>Módulo de Usuarios</h2>}
        {activeModule === "reportes" && <h2>Módulo de Reportes</h2>}
      </main>
    </div>
  );
}

export default App;
