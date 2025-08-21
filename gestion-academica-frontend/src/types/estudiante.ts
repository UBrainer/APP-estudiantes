export interface Estudiante {
  id: number;
  nombre: string;
  email?: string;
  estado?: boolean;   // o "activo", según tu modelo
  activo?: boolean;   // dejamos ambos por si acaso
}

export type CrearEstudianteDto = {
  nombre: string;
  email?: string;
  estado?: boolean;
};
export type ActualizarEstudianteDto = Partial<CrearEstudianteDto>;