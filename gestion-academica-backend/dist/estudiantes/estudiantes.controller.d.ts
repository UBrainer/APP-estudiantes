import { EstudiantesService } from './estudiantes.service';
export declare class EstudiantesController {
    private readonly estudiantesService;
    constructor(estudiantesService: EstudiantesService);
    getAll(): Promise<{
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
    getOne(id: string): Promise<{
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
    create(data: any): Promise<{
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
    update(id: string, data: any): Promise<{
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
    remove(id: string): Promise<{
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
    buscarPorNombre(query: string): Promise<{
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
