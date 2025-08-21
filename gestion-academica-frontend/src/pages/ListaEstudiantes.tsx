import { useEffect, useState } from "react";
import { EstudiantesAPI } from "../services/estudiantes";
import { Estudiante } from "../types/estudiante";
import { Link } from "react-router-dom";

export default function ListaEstudiantes() {
  const [data, setData] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const res = await EstudiantesAPI.list();
      setData(res);
    } catch (e: any) {
      setError(e?.message ?? "Error cargando estudiantes");
    } finally {
      setLoading(false);
    }
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Seguro que quieres eliminar este estudiante?")) return;
    try {
      await EstudiantesAPI.remove(id);
      await load();
    } catch (e: any) {
      alert(e?.response?.data?.message ?? "Error eliminando");
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const isActivo = (e: Estudiante) =>
    (e.estado ?? e.activo ?? true) ? "Activo" : "Inactivo";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">📚 Lista de Estudiantes</h1>
        <Link
          to="/estudiantes/nuevo"
          className="px-3 py-2 rounded bg-blue-600 text-white"
        >
          + Nuevo
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Nombre</th>
              <th className="p-3">Email</th>
              <th className="p-3">Estado</th>
              <th className="p-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((e) => (
              <tr key={e.id} className="border-t">
                <td className="p-3">{e.id}</td>
                <td className="p-3">{e.nombre}</td>
                <td className="p-3">{e.email ?? "—"}</td>
                <td className="p-3">{isActivo(e)}</td>
                <td className="p-3 text-right space-x-2">
                  {/* Más adelante: botón Editar */}
                  <button
                    onClick={() => eliminar(e.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="p-6 text-center text-gray-500">
                  No hay estudiantes. Crea el primero.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
