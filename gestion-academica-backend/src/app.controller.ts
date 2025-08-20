import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('test')
  async testConnection() {
    try {
      const count = await this.prisma.estudiante.count();
      return { 
        message: '✅ Conexión exitosa a la base de datos',
        estudiantesCount: count 
      };
    } catch (error) {
      return { 
        error: '❌ Error de conexión a la base de datos',
        details: error.message 
      };
    }
  }
}
