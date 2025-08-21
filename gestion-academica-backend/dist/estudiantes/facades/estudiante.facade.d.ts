import { PrismaService } from '../../prisma/prisma.service';
import { EstudianteMediator } from '../mediators/estudiante.mediator';
export declare class EstudianteFacade {
    private prisma;
    private mediator;
    constructor(prisma: PrismaService, mediator: EstudianteMediator);
    registrarEstudiante(data: {
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
        fecha_nacimiento: Date;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
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
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    actualizarEstudiante(id: number, data: any): Promise<{
        success: boolean;
        message: string;
        data: {
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
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    importarEstudiantes(estudiantesData: any[]): Promise<{
        total: number;
        exitosos: number;
        fallidos: number;
        errores: Array<{
            datos: any;
            error: string;
        }>;
    }>;
    desactivarEstudiante(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
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
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    reactivarEstudiante(id: number): Promise<{
        success: boolean;
        message: string;
        data: {
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
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    buscarEstudianteAvanzado(criterios: {
        nombre?: string;
        apellido?: string;
        documento?: string;
        correo?: string;
        estado?: boolean;
    }): Promise<{
        success: boolean;
        message: string;
        data: {
            id: number;
            nombre: string;
            apellido: string;
            documento: string;
            correo: string;
            fecha_nacimiento: Date;
            estado: boolean | null;
            creado_en: Date | null;
            actualizado_en: Date | null;
        }[];
        total: number;
    } | {
        success: boolean;
        message: any;
        data: null;
        total: number;
    }>;
    obtenerEstadisticas(): Promise<{
        success: boolean;
        data: {
            total: number;
            activos: number;
            inactivos: number;
            porcentajeActivos: number;
            porcentajeInactivos: number;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        data: null;
    }>;
    private verificarDuplicados;
    private validarDatosEstudiante;
}
