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
import { EstudianteMediator } from './mediators/estudiante.mediator';

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
    EstudianteMediator,
  ],
  exports: [
    EstudiantesService,
    EstudianteMediator,
  ],
})
export class EstudiantesModule {}