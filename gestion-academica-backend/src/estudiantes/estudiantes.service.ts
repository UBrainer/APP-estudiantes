import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudiantesService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los estudiantes
  async findAll() {
    try {
      return await this.prisma.estudiante.findMany({
        orderBy: { creado_en: 'desc' }
      });
    } catch (error) {
      throw new Error(`Error obteniendo estudiantes: ${error.message}`);
    }
  }

  // Obtener un estudiante por ID
  async findOne(id: number) {
    try {
      const estudiante = await this.prisma.estudiante.findUnique({ 
        where: { id }
      });
      
      if (!estudiante) {
        throw new Error('Estudiante no encontrado');
      }
      
      return estudiante;
    } catch (error) {
      throw new Error(`Error obteniendo estudiante: ${error.message}`);
    }
  }

  // Crear un nuevo estudiante
  async create(data: {
    nombre: string;
    apellido: string;
    documento: string;
    correo: string;
    fecha_nacimiento: Date;
  }) {
    try {
      // Validar datos básicos
      this.validarDatosEstudiante(data);

      // Verificar si ya existe el documento o correo
      const existe = await this.prisma.estudiante.findFirst({
        where: {
          OR: [
            { documento: data.documento },
            { correo: data.correo }
          ]
        }
      });

      if (existe) {
        throw new Error('Ya existe un estudiante con ese documento o correo');
      }

      // Crear estudiante
      return await this.prisma.estudiante.create({
        data: {
          ...data,
          estado: true,
        }
      });
    } catch (error) {
      throw new Error(`Error creando estudiante: ${error.message}`);
    }
  }

  // Actualizar estudiante
  async update(id: number, data: any) {
    try {
      // Verificar que el estudiante existe
      const existe = await this.prisma.estudiante.findUnique({ where: { id } });
      if (!existe) {
        throw new Error('Estudiante no encontrado');
      }

      // Actualizar estudiante
      return await this.prisma.estudiante.update({
        where: { id },
        data: { ...data, actualizado_en: new Date() }
      });
    } catch (error) {
      throw new Error(`Error actualizando estudiante: ${error.message}`);
    }
  }

  // Desactivar estudiante (eliminación lógica)
  async remove(id: number) {
    try {
      const estudiante = await this.prisma.estudiante.update({
        where: { id },
        data: { estado: false, actualizado_en: new Date() }
      });

      return { message: 'Estudiante desactivado correctamente', estudiante };
    } catch (error) {
      throw new Error(`Error desactivando estudiante: ${error.message}`);
    }
  }

  // Método de validación básica
  private validarDatosEstudiante(data: any) {
    const requiredFields = ['nombre', 'apellido', 'documento', 'correo', 'fecha_nacimiento'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      throw new Error('Formato de correo electrónico inválido');
    }

    // Validar que la fecha sea válida
    if (isNaN(new Date(data.fecha_nacimiento).getTime())) {
      throw new Error('Fecha de nacimiento inválida');
    }
  }

  // Método simple de búsqueda (luego lo convertiremos en Strategy)
  async buscarPorNombre(nombre: string) {
    try {
      return await this.prisma.estudiante.findMany({
        where: {
          OR: [
            { nombre: { contains: nombre, mode: 'insensitive' } },
            { apellido: { contains: nombre, mode: 'insensitive' } }
          ]
        }
      });
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  }
}
