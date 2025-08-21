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

  @Post()
  async create(@Body() data: any) {
    try {
      return await this.estudiantesService.create(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.estudiantesService.remove(Number(id));
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

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

  @Get('filtro/estado')
  async filterByStatus(@Query('estado') estado: string) {
    try {
      const estadoBoolean = estado.toLowerCase() === 'true';
      return await this.estudiantesService.filterByStatus(estadoBoolean);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('campos-busqueda')
  async getSearchFields() {
    try {
      return await this.estudiantesService.getSearchFields();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('modulo/lista')
  async obtenerListaParaModulos() {
    try {
      return await this.estudiantesService.obtenerListaParaModulos();
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('modulo/verificar/:id')
  async verificarExistencia(@Param('id') id: string) {
    try {
      return await this.estudiantesService.verificarEstudianteExiste(Number(id));
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('modulo/activos')
  async obtenerActivosParaModulos() {
    try {
      return await this.estudiantesService.obtenerEstudiantesActivos();
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get('mediator/modulos')
  async obtenerModulosRegistrados() {
    try {
      return await this.estudiantesService.obtenerModulosRegistrados();
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('mediator/registrar')
  async registrarModuloExterno(
    @Body() body: { moduleName: string; moduleUrl: string }
  ) {
    try {
      const mockModule = {
        notify: async (event: string, data: any) => {
          console.log(`📨 Módulo ${body.moduleName} recibió:`, { event, data });
        }
      };

      await this.estudiantesService.registrarModuloExterno(
        body.moduleName, 
        mockModule
      );

      return { 
        message: `Módulo ${body.moduleName} registrado exitosamente`,
        modulosRegistrados: await this.estudiantesService.obtenerModulosRegistrados()
      };
    } catch (error) {
      throw new HttpException(
        error.message, 
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
