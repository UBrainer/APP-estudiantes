import { Routes, Route, Link, Navigate } from "react-router-dom";
import ListaEstudiantes from "./pages/ListaEstudiantes";
import CrearEstudiante from "./pages/CrearEstudiante";

export default function App() {
  return (
    <>
      <header className="p-4 bg-gray-100 border-b flex gap-4">
        <Link to="/" className="font-semibold">Estudiantes</Link>
        <Link to="/estudiantes/nuevo" className="text-blue-600">Crear</Link>
      </header>

      <main className="p-4 max-w-5xl mx-auto">
        <Routes>
          <Route path="/" element={<Navigate to="/estudiantes" replace />} />
          <Route path="/estudiantes" element={<ListaEstudiantes />} />
          <Route path="/estudiantes/nuevo" element={<CrearEstudiante />} />
        </Routes>
      </main>
    </>
  );
}