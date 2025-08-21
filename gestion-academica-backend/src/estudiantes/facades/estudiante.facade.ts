import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { EstudianteMediator } from '../mediators/estudiante.mediator';

@Injectable()
export class EstudianteFacade {
  constructor(
    private prisma: PrismaService,
    private mediator: EstudianteMediator
  ) {}

  async registrarEstudiante(data: {
    nombre: string;
    apellido: string;
    documento: string;
    correo: string;
    fecha_nacimiento: Date;
  }) {
    try {
      this.validarDatosEstudiante(data);
      await this.verificarDuplicados(data.documento, data.correo);

      const estudiante = await this.prisma.estudiante.create({
        data: {
          ...data,
          estado: true,
        }
      });

      await this.mediator.notifyAll('ESTUDIANTE_CREADO', estudiante);

      return {
        success: true,
        message: 'Estudiante registrado exitosamente',
        data: estudiante
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async actualizarEstudiante(id: number, data: any) {
    try {
      const existe = await this.prisma.estudiante.findUnique({ where: { id } });
      if (!existe) {
        throw new Error('Estudiante no encontrado');
      }

      if (data.nombre || data.apellido || data.documento || data.correo || data.fecha_nacimiento) {
        const datosCompletos = { ...existe, ...data };
        this.validarDatosEstudiante(datosCompletos);
      }

      const estudiante = await this.prisma.estudiante.update({
        where: { id },
        data: { ...data, actualizado_en: new Date() }
      });

      await this.mediator.notifyAll('ESTUDIANTE_ACTUALIZADO', estudiante);

      return {
        success: true,
        message: 'Estudiante actualizado exitosamente',
        data: estudiante
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async importarEstudiantes(estudiantesData: any[]) {
    const resultados = {
      total: estudiantesData.length,
      exitosos: 0,
      fallidos: 0,
      errores: [] as Array<{ datos: any; error: string }>
    };

    for (const [index, data] of estudiantesData.entries()) {
      try {
        if (!data.nombre || !data.apellido || !data.documento || !data.correo || !data.fecha_nacimiento) {
          throw new Error('Datos incompletos');
        }

        await this.verificarDuplicados(data.documento, data.correo);

        const estudiante = await this.prisma.estudiante.create({
          data: {
            ...data,
            estado: true,
          }
        });

        resultados.exitosos++;
        
        await this.mediator.notifyAll('ESTUDIANTE_IMPORTADO', {
          estudiante,
          index,
          total: estudiantesData.length
        });

      } catch (error) {
        resultados.fallidos++;
        resultados.errores.push({
          datos: data,
          error: error.message
        });
      }
    }

    await this.mediator.notifyAll('IMPORTACION_COMPLETADA', resultados);

    return resultados;
  }

  async desactivarEstudiante(id: number) {
    try {
      const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
      if (!estudiante) {
        throw new Error('Estudiante no encontrado');
      }

      if (!estudiante.estado) {
        throw new Error('El estudiante ya está desactivado');
      }

      const estudianteDesactivado = await this.prisma.estudiante.update({
        where: { id },
        data: { estado: false, actualizado_en: new Date() }
      });

      await this.mediator.notifyAll('ESTUDIANTE_DESACTIVADO', estudianteDesactivado);

      return {
        success: true,
        message: 'Estudiante desactivado exitosamente',
        data: estudianteDesactivado
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async reactivarEstudiante(id: number) {
    try {
      const estudiante = await this.prisma.estudiante.findUnique({ where: { id } });
      if (!estudiante) {
        throw new Error('Estudiante no encontrado');
      }

      if (estudiante.estado) {
        throw new Error('El estudiante ya está activo');
      }

      const estudianteReactivado = await this.prisma.estudiante.update({
        where: { id },
        data: { estado: true, actualizado_en: new Date() }
      });

      await this.mediator.notifyAll('ESTUDIANTE_REACTIVADO', estudianteReactivado);

      return {
        success: true,
        message: 'Estudiante reactivado exitosamente',
        data: estudianteReactivado
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  async buscarEstudianteAvanzado(criterios: {
    nombre?: string;
    apellido?: string;
    documento?: string;
    correo?: string;
    estado?: boolean;
  }) {
    try {
      const where: any = {};

      if (criterios.nombre) {
        where.nombre = { contains: criterios.nombre, mode: 'insensitive' };
      }

      if (criterios.apellido) {
        where.apellido = { contains: criterios.apellido, mode: 'insensitive' };
      }

      if (criterios.documento) {
        where.documento = { contains: criterios.documento, mode: 'insensitive' };
      }

      if (criterios.correo) {
        where.correo = { contains: criterios.correo, mode: 'insensitive' };
      }

      if (criterios.estado !== undefined) {
        where.estado = criterios.estado;
      }

      const estudiantes = await this.prisma.estudiante.findMany({
        where,
        orderBy: { nombre: 'asc' }
      });

      return {
        success: true,
        message: 'Búsqueda completada',
        data: estudiantes,
        total: estudiantes.length
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null,
        total: 0
      };
    }
  }

  async obtenerEstadisticas() {
    try {
      const total = await this.prisma.estudiante.count();
      const activos = await this.prisma.estudiante.count({ where: { estado: true } });
      const inactivos = await this.prisma.estudiante.count({ where: { estado: false } });

      return {
        success: true,
        data: {
          total,
          activos,
          inactivos,
          porcentajeActivos: total > 0 ? (activos / total) * 100 : 0,
          porcentajeInactivos: total > 0 ? (inactivos / total) * 100 : 0
        }
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
        data: null
      };
    }
  }

  private async verificarDuplicados(documento: string, correo: string): Promise<void> {
    const existe = await this.prisma.estudiante.findFirst({
      where: {
        OR: [
          { documento },
          { correo }
        ]
      }
    });

    if (existe) {
      if (existe.documento === documento) {
        throw new Error('Ya existe un estudiante con ese documento');
      }
      if (existe.correo === correo) {
        throw new Error('Ya existe un estudiante con ese correo');
      }
    }
  }

  private validarDatosEstudiante(data: any): void {
    const requiredFields = ['nombre', 'apellido', 'documento', 'correo', 'fecha_nacimiento'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.correo)) {
      throw new Error('Formato de correo electrónico inválido');
    }

    if (isNaN(new Date(data.fecha_nacimiento).getTime())) {
      throw new Error('Fecha de nacimiento inválida');
    }

    if (data.documento.length < 5 || data.documento.length > 20) {
      throw new Error('El documento debe tener entre 5 y 20 caracteres');
    }

    if (data.nombre.length < 2 || data.nombre.length > 50) {
      throw new Error('El nombre debe tener entre 2 y 50 caracteres');
    }

    if (data.apellido.length < 2 || data.apellido.length > 50) {
      throw new Error('El apellido debe tener entre 2 y 50 caracteres');
    }
  }
}