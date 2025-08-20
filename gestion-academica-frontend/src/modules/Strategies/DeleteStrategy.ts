import type { Estudiante } from "../Estudiantes/type";

export class DeleteStrategy {
  execute(estudiantes: Estudiante[], id: number) {
    const index = estudiantes.findIndex(e => e.id === id);
    if (index !== -1) {
      estudiantes.splice(index, 1);
    }
  }
}