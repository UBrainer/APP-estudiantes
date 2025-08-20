import { PrismaClient } from '@prisma/client';
import { Estudiante } from '../types/estudiante.type';

export interface SearchStrategy {
  search(term: string): Promise<any[]>;
}

export class NameSearchStrategy implements SearchStrategy {
  constructor(private prisma: PrismaClient) {}
  
  async search(term: string): Promise<any[]> {
    return this.prisma.estudiante.findMany({
      where: {
        OR: [
          { nombre: { contains: term, mode: 'insensitive' } },
          { apellido: { contains: term, mode: 'insensitive' } }
        ]
      }
    });
  }
}

export class DocumentSearchStrategy implements SearchStrategy {
  constructor(private prisma: PrismaClient) {}
  
  async search(term: string): Promise<any[]> {
    return this.prisma.estudiante.findMany({
      where: {
        documento: { contains: term, mode: 'insensitive' }
      }
    });
  }
}

export class EmailSearchStrategy implements SearchStrategy {
  constructor(private prisma: PrismaClient) {}
  
  async search(term: string): Promise<any[]> {
    return this.prisma.estudiante.findMany({
      where: {
        correo: { contains: term, mode: 'insensitive' }
      }
    });
  }
}

export class StatusSearchStrategy implements SearchStrategy {
  constructor(private prisma: PrismaClient) {}
  
  async search(term: string): Promise<any[]> {
    const status = term.toLowerCase() === 'activo' ? true : 
                  term.toLowerCase() === 'inactivo' ? false : undefined;
    
    if (status === undefined) return [];
    
    return this.prisma.estudiante.findMany({
      where: { estado: status }
    });
  }
}