import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  getAll() {
    return this.estudiantesService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.estudiantesService.findOne(Number(id));
  }

  @Post()
  create(@Body() data: any) {
    return this.estudiantesService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.estudiantesService.update(Number(id), data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.estudiantesService.remove(Number(id));
  }
}

