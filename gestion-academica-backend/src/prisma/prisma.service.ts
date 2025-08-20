import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private static instance: PrismaService;

  constructor() {
    super();
    if (!PrismaService.instance) {
      PrismaService.instance = this;
    }
    return PrismaService.instance;
  }

  async onModuleInit() {
    await this.$connect();
    console.log('✅ Conectado a la base de datos con Prisma (Singleton + NestJS)');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}