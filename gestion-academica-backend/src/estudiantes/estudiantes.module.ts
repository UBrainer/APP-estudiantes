import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { PrismaService } from '../prisma/prisma.service';
import { 
  NameSearchStrategy, 
  DocumentSearchStrategy, 
  EmailSearchStrategy, 
  StatusSearchStrategy 
} from './strategies/search.strategy';
import { SearchContext } from './strategies/search.context';

@Module({
  controllers: [EstudiantesController],
  providers: [
    EstudiantesService,
    PrismaService,
    NameSearchStrategy,
    DocumentSearchStrategy,
    EmailSearchStrategy,
    StatusSearchStrategy,
    SearchContext,
  ],
  exports: [EstudiantesService],
})
export class EstudiantesModule {}