import type { Estudiante } from "../Estudiantes/type";

export class EditStrategy {
  execute(estudiantes: Estudiante[], actualizado: Estudiante) {
    const index = estudiantes.findIndex(e => e.id === actualizado.id);
    if (index !== -1) {
      estudiantes[index] = actualizado;
    }
  }
}