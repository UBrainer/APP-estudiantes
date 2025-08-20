import { PrismaService } from '../prisma/prisma.service';
export declare class EstudiantesService {
    private readonly prisma;
    private searchContext;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
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
    findOne(id: number): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
        estado: boolean | null;
        creado_en: Date | null;
        actualizado_en: Date | null;
    }>;
    create(data: {
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
    }): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
        estado: boolean | null;
        creado_en: Date | null;
        actualizado_en: Date | null;
    }>;
    update(id: number, data: any): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
        estado: boolean | null;
        creado_en: Date | null;
        actualizado_en: Date | null;
    }>;
    remove(id: number): Promise<{
        message: string;
        estudiante: {
            id: number;
            nombre: string;
            apellido: string;
            documento: string;
            correo: string;
            fecha_nacimiento: Date;
            estado: boolean | null;
            creado_en: Date | null;
            actualizado_en: Date | null;
        };
    }>;
    search(field: string, term: string): Promise<any[]>;
    searchAll(term: string): Promise<any[]>;
    filterByStatus(estado: boolean): Promise<any[]>;
    getSearchFields(): string[];
    private validarDatosEstudiante;
}
