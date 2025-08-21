import { PrismaService } from '../prisma/prisma.service';
import { EstudianteMediator } from './mediators/estudiante.mediator';
import { EstudianteFacade } from './facades/estudiante.facade';
export declare class EstudiantesService {
    private readonly prisma;
    private readonly mediator;
    private readonly facade;
    private searchContext;
    constructor(prisma: PrismaService, mediator: EstudianteMediator, facade: EstudianteFacade);
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
    obtenerListaParaModulos(): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
    }[]>;
    verificarEstudianteExiste(id: number): Promise<{
        existe: boolean;
        estudiante: {
            id: number;
            nombre: string;
            apellido: string;
            estado: boolean | null;
        } | null;
        activo: boolean;
    }>;
    obtenerEstudiantesActivos(): Promise<{
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
    registrarEstudianteFacade(data: any): Promise<{
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
    actualizarEstudianteFacade(id: number, data: any): Promise<{
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
    importarEstudiantesFacade(data: any[]): Promise<{
        total: number;
        exitosos: number;
        fallidos: number;
        errores: {
            datos: any;
            error: string;
        }[];
    }>;
    desactivarEstudianteFacade(id: number): Promise<{
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
    reactivarEstudianteFacade(id: number): Promise<{
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
    buscarAvanzadoFacade(criterios: any): Promise<{
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
    obtenerEstadisticasFacade(): Promise<{
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
    getSearchFields(): string[];
    getMediator(): EstudianteMediator;
    registrarModuloExterno(moduleName: string, module: any): Promise<void>;
    obtenerModulosRegistrados(): Promise<string[]>;
    private validarDatosEstudiante;
}
