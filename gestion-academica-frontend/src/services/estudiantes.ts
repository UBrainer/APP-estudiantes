import { api } from './api';
import { CrearEstudianteDto, ActualizarEstudianteDto, Estudiante } from '../types/estudiante';

export const EstudiantesAPI = {
  list: async (): Promise<Estudiante[]> =>
    (await api.get('/estudiantes')).data,

  get: async (id: number): Promise<Estudiante> =>
    (await api.get(`/estudiantes/${id}`)).data,

  create: async (data: CrearEstudianteDto): Promise<Estudiante> =>
    (await api.post('/estudiantes', data)).data, // si quieres usar facade: /estudiantes/facade/registrar

  update: async (id: number, data: ActualizarEstudianteDto): Promise<Estudiante> =>
    (await api.put(`/estudiantes/${id}`, data)).data,

  remove: async (id: number): Promise<void> =>
    (await api.delete(`/estudiantes/${id}`)).data,
};