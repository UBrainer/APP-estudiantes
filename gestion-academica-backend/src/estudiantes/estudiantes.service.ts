import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstudiantesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.estudiante.findMany();
  }

  findOne(id: number) {
    return this.prisma.estudiante.findUnique({ where: { id } });
  }

  create(data: any) {
    return this.prisma.estudiante.create({ data });
  }

  update(id: number, data: any) {
    return this.prisma.estudiante.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.estudiante.delete({ where: { id } });
  }
}
