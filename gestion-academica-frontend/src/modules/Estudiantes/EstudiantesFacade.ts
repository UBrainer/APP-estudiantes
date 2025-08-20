// src/modules/Estudiantes/EstudiantesFacade.ts
import type { Estudiante } from "./type";
import { AddStrategy } from "../Strategies/AddStrategy";
import { EditStrategy } from "../Strategies/EditStrategy";
import { DeleteStrategy } from "../Strategies/DeleteStrategy";
import type { BusquedaStrategy } from "../Strategies/BusquedaStrategy"; // 👈 CORRECTO

export class EstudiantesFacade {
  private estudiantes: Estudiante[] = [
    {
      id: 1,
      nombre: "Juan",
      apellido: "Pérez",
      documento: "123456",
      correo: "juan@mail.com",
      fechaNacimiento: "2000-01-01",
      activo: true,
    },
  ];

  private addStrategy = new AddStrategy();
  private editStrategy = new EditStrategy();
  private deleteStrategy = new DeleteStrategy();

  getAll(): Estudiante[] {
    return this.estudiantes;
  }

  add(estudiante: Estudiante): void {
    this.addStrategy.execute(this.estudiantes, estudiante);
  }

  edit(estudiante: Estudiante): void {
    this.editStrategy.execute(this.estudiantes, estudiante);
  }

  delete(id: number): void {
    this.deleteStrategy.execute(this.estudiantes, id);
  }

  search(strategy: BusquedaStrategy, criterio: string): Estudiante[] {
    return strategy.search(this.estudiantes, criterio);
  }
}