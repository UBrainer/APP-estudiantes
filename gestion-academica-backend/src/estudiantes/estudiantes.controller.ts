import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Delete, 
  Body, 
  Param, 
  Query, 
  HttpException, 
  HttpStatus 
} from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  // ... (mantén todos los métodos existentes del CRUD) ...

  // Búsqueda por campo específico usando Strategy Pattern
  @Get('buscar/:campo')
  async search(
    @Param('campo') campo: string,
    @Query('termino') termino: string
  ) {
    try {
      if (!termino) {
        throw new HttpException('Término de búsqueda requerido', HttpStatus.BAD_REQUEST);
      }
      return await this.estudiantesService.search(campo, termino);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Búsqueda general en todos los campos
  @Get('buscar')
  async searchAll(@Query('q') termino: string) {
    try {
      if (!termino) {
        throw new HttpException('Término de búsqueda requerido', HttpStatus.BAD_REQUEST);
      }
      return await this.estudiantesService.searchAll(termino);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Filtrar por estado (activo/inactivo)
  @Get('filtro/estado')
  async filterByStatus(@Query('estado') estado: string) {
    try {
      const estadoBoolean = estado.toLowerCase() === 'true';
      return await this.estudiantesService.filterByStatus(estadoBoolean);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Obtener campos de búsqueda disponibles
  @Get('campos-busqueda')
  async getSearchFields() {
    try {
      return await this.estudiantesService.getSearchFields();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
