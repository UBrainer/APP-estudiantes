import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchContext } from './strategies/search.context';
import { 
  NameSearchStrategy, 
  DocumentSearchStrategy, 
  EmailSearchStrategy, 
  StatusSearchStrategy 
} from './strategies/search.strategy';

@Injectable()
export class EstudiantesService {
  private searchContext: SearchContext;

  constructor(private readonly prisma: PrismaService) {
    // Inicializar estrategias de búsqueda
    const nameStrategy = new NameSearchStrategy(prisma);
    const documentStrategy = new DocumentSearchStrategy(prisma);
    const emailStrategy = new EmailSearchStrategy(prisma);
    const statusStrategy = new StatusSearchStrategy(prisma);

    this.searchContext = new SearchContext(
      nameStrategy,
      documentStrategy,
      emailStrategy,
      statusStrategy
    );
  }

  // CRUD básico
  async findAll() {
    try {
      return await this.prisma.estudiante.findMany({
        orderBy: { creado_en: 'desc' }
      });
    } catch (error) {
      throw new Error(`Error obteniendo estudiantes: ${error.message}`);
    }
  }

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

  // Búsquedas usando Strategy Pattern
  async search(field: string, term: string): Promise<any[]> {
    try {
      return await this.searchContext.executeSearch(field, term);
    } catch (error) {
      throw new Error(`Error en búsqueda: ${error.message}`);
    }
  }

  async searchAll(term: string): Promise<any[]> {
    try {
      return await this.searchContext.searchAll(term);
    } catch (error) {
      throw new Error(`Error en búsqueda general: ${error.message}`);
    }
  }

  async filterByStatus(estado: boolean): Promise<any[]> {
    try {
      return await this.prisma.estudiante.findMany({
        where: { estado },
        orderBy: { nombre: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error filtrando por estado: ${error.message}`);
    }
  }

  // Métodos auxiliares para el frontend
  getSearchFields(): string[] {
    return this.searchContext.getAvailableSearchFields();
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
}