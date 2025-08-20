import type { Estudiante } from "../Estudiantes/type";

export class AddStrategy {
  execute(estudiantes: Estudiante[], nuevo: Estudiante) {
    estudiantes.push(nuevo);
  }
}