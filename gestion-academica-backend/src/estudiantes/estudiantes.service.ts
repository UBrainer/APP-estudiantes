import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SearchContext } from './strategies/search.context';
import { 
  NameSearchStrategy, 
  DocumentSearchStrategy, 
  EmailSearchStrategy, 
  StatusSearchStrategy 
} from './strategies/search.strategy';
import { EstudianteMediator } from './mediators/estudiante.mediator';
import { EstudianteFacade } from './facades/estudiante.facade';

@Injectable()
export class EstudiantesService {
  private searchContext: SearchContext;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mediator: EstudianteMediator,
    private readonly facade: EstudianteFacade
  ) {
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
      this.validarDatosEstudiante(data);

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

      const estudiante = await this.prisma.estudiante.create({
        data: {
          ...data,
          estado: true,
        }
      });

      await this.mediator.notifyAll('ESTUDIANTE_CREADO', estudiante);

      return estudiante;
    } catch (error) {
      throw new Error(`Error creando estudiante: ${error.message}`);
    }
  }

  async update(id: number, data: any) {
    try {
      const existe = await this.prisma.estudiante.findUnique({ where: { id } });
      if (!existe) {
        throw new Error('Estudiante no encontrado');
      }

      const estudiante = await this.prisma.estudiante.update({
        where: { id },
        data: { ...data, actualizado_en: new Date() }
      });

      await this.mediator.notifyAll('ESTUDIANTE_ACTUALIZADO', estudiante);

      return estudiante;
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

      await this.mediator.notifyAll('ESTUDIANTE_DESACTIVADO', estudiante);

      return { message: 'Estudiante desactivado correctamente', estudiante };
    } catch (error) {
      throw new Error(`Error desactivando estudiante: ${error.message}`);
    }
  }

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

  async obtenerListaParaModulos() {
    try {
      return await this.prisma.estudiante.findMany({
        where: { estado: true },
        select: {
          id: true,
          nombre: true,
          apellido: true,
          documento: true,
          correo: true
        }
      });
    } catch (error) {
      throw new Error(`Error obteniendo lista para módulos: ${error.message}`);
    }
  }

  async verificarEstudianteExiste(id: number) {
    try {
      const estudiante = await this.prisma.estudiante.findUnique({
        where: { id },
        select: { id: true, nombre: true, apellido: true, estado: true }
      });

      return { 
        existe: !!estudiante, 
        estudiante,
        activo: estudiante?.estado || false
      };
    } catch (error) {
      throw new Error(`Error verificando estudiante: ${error.message}`);
    }
  }

  async obtenerEstudiantesActivos() {
    try {
      return await this.prisma.estudiante.findMany({
        where: { estado: true },
        orderBy: { nombre: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error obteniendo estudiantes activos: ${error.message}`);
    }
  }

  async registrarEstudianteFacade(data: any) {
    return this.facade.registrarEstudiante(data);
  }

  async actualizarEstudianteFacade(id: number, data: any) {
    return this.facade.actualizarEstudiante(id, data);
  }

  async importarEstudiantesFacade(data: any[]) {
    return this.facade.importarEstudiantes(data);
  }

  async desactivarEstudianteFacade(id: number) {
    return this.facade.desactivarEstudiante(id);
  }

  async reactivarEstudianteFacade(id: number) {
    return this.facade.reactivarEstudiante(id);
  }

  async buscarAvanzadoFacade(criterios: any) {
    return this.facade.buscarEstudianteAvanzado(criterios);
  }

  async obtenerEstadisticasFacade() {
    return this.facade.obtenerEstadisticas();
  }

  getSearchFields(): string[] {
    return this.searchContext.getAvailableSearchFields();
  }

  getMediator(): EstudianteMediator {
    return this.mediator;
  }

  async registrarModuloExterno(moduleName: string, module: any): Promise<void> {
    this.mediator.registerModule(moduleName, module);
  }

  async obtenerModulosRegistrados(): Promise<string[]> {
    return this.mediator.getRegisteredModules();
  }

  private validarDatosEstudiante(data: any) {
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
  }
}