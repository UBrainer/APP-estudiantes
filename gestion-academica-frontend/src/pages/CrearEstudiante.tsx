import { useState } from "react";
import axios from "axios";

export default function CrearEstudiante() {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    correo: "",
    fecha_nacimiento: "",
    estado: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estado" ? value === "true" : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/estudiantes", {
        ...formData,
        fecha_nacimiento: new Date(formData.fecha_nacimiento),
      });
      alert("✅ Estudiante creado!");
      setFormData({
        nombre: "",
        apellido: "",
        documento: "",
        correo: "",
        fecha_nacimiento: "",
        estado: true,
      });
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("❌ Error creando estudiante: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-600">➕ Crear Estudiante</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 mt-4 max-w-lg">
        <input name="nombre" placeholder="Nombre" onChange={handleChange} value={formData.nombre} className="border p-2" required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} value={formData.apellido} className="border p-2" required />
        <input name="documento" placeholder="Documento" onChange={handleChange} value={formData.documento} className="border p-2" required />
        <input name="correo" placeholder="Correo" type="email" onChange={handleChange} value={formData.correo} className="border p-2" required />
        <input name="fecha_nacimiento" type="date" onChange={handleChange} value={formData.fecha_nacimiento} className="border p-2" required />
        <select name="estado" onChange={handleChange} value={String(formData.estado)} className="border p-2">
          <option value="true">Activo</option>
          <option value="false">Inactivo</option>
        </select>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Guardar</button>
      </form>
    </div>
  );
}
