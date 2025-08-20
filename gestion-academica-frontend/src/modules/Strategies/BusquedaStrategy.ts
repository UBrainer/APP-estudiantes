import type { Estudiante } from "../Estudiantes/type";

export interface BusquedaStrategy {
  search(estudiantes: Estudiante[], criterio: string): Estudiante[];
}

export class BuscarPorNombre implements BusquedaStrategy {
  search(estudiantes: Estudiante[], criterio: string): Estudiante[] {
    return estudiantes.filter(e =>
      e.nombre.toLowerCase().includes(criterio.toLowerCase())
    );
  }
}

export class BuscarPorDocumento implements BusquedaStrategy {
  search(estudiantes: Estudiante[], criterio: string): Estudiante[] {
    return estudiantes.filter(e =>
      e.documento.toLowerCase().includes(criterio.toLowerCase())
    );
  }
}

export class BuscarPorCorreo implements BusquedaStrategy {
  search(estudiantes: Estudiante[], criterio: string): Estudiante[] {
    return estudiantes.filter(e =>
      e.correo.toLowerCase().includes(criterio.toLowerCase())
    );
  }
}