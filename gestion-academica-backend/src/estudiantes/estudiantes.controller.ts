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

  // Obtener todos los estudiantes
  @Get()
  async getAll() {
    try {
      return await this.estudiantesService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // Obtener un estudiante por ID
  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      return await this.estudiantesService.findOne(Number(id));
    } catch (error) {
      if (error.message === 'Estudiante no encontrado') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Crear nuevo estudiante
  @Post()
  async create(@Body() data: any) {
    try {
      return await this.estudiantesService.create(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Actualizar estudiante
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any) {
    try {
      return await this.estudiantesService.update(Number(id), data);
    } catch (error) {
      if (error.message === 'Estudiante no encontrado') {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Desactivar estudiante
  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.estudiantesService.remove(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // Búsqueda simple por nombre
  @Get('buscar/nombre')
  async buscarPorNombre(@Query('q') query: string) {
    try {
      if (!query) {
        throw new HttpException('Término de búsqueda requerido', HttpStatus.BAD_REQUEST);
      }
      return await this.estudiantesService.buscarPorNombre(query);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
