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
import { EstudianteFacade } from './facades/estudiante.facade';

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
    EstudianteFacade,
  ],
  exports: [
    EstudiantesService,
    EstudianteMediator,
    EstudianteFacade,
  ],
})
export class EstudiantesModule {}