import { useState } from "react";
import type { Estudiante } from "./type";
import { EstudiantesFacade } from "./EstudiantesFacade";
import { BuscarPorNombre, BuscarPorDocumento, BuscarPorCorreo } from "../Strategies/BusquedaStrategy";

const facade = new EstudiantesFacade();

export default function Students() {
  const [criterio, setCriterio] = useState("");
  const [filtro, setFiltro] = useState("nombre");
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>(facade.getAll());
  const [nuevo, setNuevo] = useState<Partial<Estudiante>>({});
  const [editando, setEditando] = useState<number | null>(null);
  const [estudianteAEliminar, setEstudianteAEliminar] = useState<Estudiante | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  const validarFecha = (fecha: string): boolean => {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = fecha.match(regex);
    if (!match) return false;

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1;
    const anio = parseInt(match[3], 10);

    const date = new Date(anio, mes, dia);
    return date.getFullYear() === anio &&
           date.getMonth() === mes &&
           date.getDate() === dia;
  };

  const validarCampos = (data: Partial<Estudiante>): boolean => {
    if (!data.nombre || !data.apellido || !data.documento || !data.correo || !data.fechaNacimiento) {
      alert("⚠️ Debes llenar todos los campos.");
      return false;
    }

    if (isNaN(Number(data.documento)) || !Number.isInteger(Number(data.documento))) {
      alert("⚠️ El documento debe ser un número entero.");
      return false;
    }

    if (!validarFecha(data.fechaNacimiento)) {
      alert("⚠️ La fecha debe tener formato DD/MM/AAAA y ser válida.");
      return false;
    }

    return true;
  };

  const handleAdd = () => {
    if (!validarCampos(nuevo)) return;

    const estudiante: Estudiante = {
      id: estudiantes.length + 1,
      nombre: nuevo.nombre!,
      apellido: nuevo.apellido!,
      documento: String(Number(nuevo.documento)),
      correo: nuevo.correo!,
      fechaNacimiento: nuevo.fechaNacimiento!,
      activo: nuevo.activo ?? true,
    };

    facade.add(estudiante);
    setEstudiantes([...facade.getAll()]);
    setNuevo({});
  };

  const handleEdit = (id: number) => {
    setEditando(id);
    const est = estudiantes.find((e) => e.id === id);
    if (est) setNuevo(est);
  };

  const handleUpdate = () => {
    if (!editando) return;
    if (!validarCampos(nuevo)) return;

    facade.edit({ ...(nuevo as Estudiante), id: editando, documento: String(Number(nuevo.documento)) });
    setEstudiantes([...facade.getAll()]);
    setEditando(null);
    setNuevo({});
  };

  const handleDelete = (id: number) => {
    const estudiante = estudiantes.find(e => e.id === id);
    if (!estudiante) return;
    setEstudianteAEliminar(estudiante);
    setMostrarModal(true);
  };

  const confirmarEliminacion = () => {
    if (!estudianteAEliminar) return;
    facade.delete(estudianteAEliminar.id);
    setEstudiantes([...facade.getAll()]);
    setEstudianteAEliminar(null);
    setMostrarModal(false);
  };

  const cancelarEliminacion = () => {
    setEstudianteAEliminar(null);
    setMostrarModal(false);
  };

  const handleSearch = () => {
    let strategy;
    if (filtro === "nombre") strategy = new BuscarPorNombre();
    else if (filtro === "documento") strategy = new BuscarPorDocumento();
    else strategy = new BuscarPorCorreo();
    setEstudiantes(facade.search(strategy, criterio));
  };

  return (
    <div className="students-container">
      <h2 className="title">📚 Gestión de Estudiantes</h2>

      {/* 🔍 Búsqueda */}
      <div className="search-container">
        <select value={filtro} onChange={(e) => setFiltro(e.target.value)} className="input">
          <option value="nombre">Nombre</option>
          <option value="documento">Documento</option>
          <option value="correo">Correo</option>
        </select>
        <input className="input" placeholder="Criterio..." value={criterio} onChange={(e) => setCriterio(e.target.value)} />
        <button className="btn" onClick={handleSearch}>Buscar</button>
        <button className="btn-secondary" onClick={() => setEstudiantes(facade.getAll())}>Reset</button>
      </div>

      {/* 📝 Formulario */}
      <div className="form-container">
        <input className="input" placeholder="Nombre" value={nuevo.nombre || ""} onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input className="input" placeholder="Apellido" value={nuevo.apellido || ""} onChange={(e) => setNuevo({ ...nuevo, apellido: e.target.value })} />
        <input className="input" type="number" placeholder="Documento" value={nuevo.documento || ""} onChange={(e) => setNuevo({ ...nuevo, documento: e.target.value })} />
        <input className="input" placeholder="Correo" value={nuevo.correo || ""} onChange={(e) => setNuevo({ ...nuevo, correo: e.target.value })} />
        <input className="input" type="text" placeholder="DD/MM/AAAA" value={nuevo.fechaNacimiento || ""} onChange={(e) => setNuevo({ ...nuevo, fechaNacimiento: e.target.value })} />
        <label>
          <input type="checkbox" checked={nuevo.activo ?? true} onChange={(e) => setNuevo({ ...nuevo, activo: e.target.checked })} /> Activo
        </label>
        {editando ? <button className="btn" onClick={handleUpdate}>Actualizar</button> : <button className="btn" onClick={handleAdd}>Agregar</button>}
      </div>

      {/* 📋 Listado */}
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Fecha Nacimiento</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {estudiantes.map((e) => (
            <tr key={e.id}>
              <td>{e.nombre}</td>
              <td>{e.apellido}</td>
              <td>{e.documento}</td>
              <td>{e.correo}</td>
              <td>{e.fechaNacimiento}</td>
              <td>{e.activo ? "✅ Activo" : "❌ Inactivo"}</td>
              <td>
                <button className="btn-small" onClick={() => handleEdit(e.id)}>✏️</button>
                <button className="btn-danger" onClick={() => handleDelete(e.id)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Modal de confirmación */}
      {mostrarModal && estudianteAEliminar && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Estás seguro de eliminar al estudiante <strong>{estudianteAEliminar.nombre} {estudianteAEliminar.apellido}</strong>?</p>
            <div className="modal-buttons">
              <button className="btn-danger" onClick={confirmarEliminacion}>Sí, eliminar</button>
              <button className="btn-secondary" onClick={cancelarEliminacion}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}