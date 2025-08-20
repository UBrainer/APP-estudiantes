import { PrismaService } from './prisma/prisma.service';
export declare class AppController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getEstudiantes(): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
        estado: boolean | null;
        creado_en: Date | null;
        actualizado_en: Date | null;
    }[]>;
}
