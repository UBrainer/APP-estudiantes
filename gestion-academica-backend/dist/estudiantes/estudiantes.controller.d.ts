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
    search(campo: string, termino: string): Promise<any[]>;
    searchAll(termino: string): Promise<any[]>;
    filterByStatus(estado: string): Promise<any[]>;
    getSearchFields(): Promise<string[]>;
    obtenerListaParaModulos(): Promise<{
        id: number;
        nombre: string;
        apellido: string;
        documento: string;
        correo: string;
    }[]>;
    verificarExistencia(id: string): Promise<{
        existe: boolean;
        estudiante: {
            id: number;
            nombre: string;
            apellido: string;
            estado: boolean | null;
        } | null;
        activo: boolean;
    }>;
    obtenerActivosParaModulos(): Promise<{
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
    obtenerModulosRegistrados(): Promise<string[]>;
    registrarModuloExterno(body: {
        moduleName: string;
        moduleUrl: string;
    }): Promise<{
        message: string;
        modulosRegistrados: string[];
    }>;
    registrarConFacade(data: any): Promise<{
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
    actualizarConFacade(id: string, data: any): Promise<{
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
    importarConFacade(data: any[]): Promise<{
        total: number;
        exitosos: number;
        fallidos: number;
        errores: {
            datos: any;
            error: string;
        }[];
    }>;
    desactivarConFacade(id: string): Promise<{
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
    reactivarConFacade(id: string): Promise<{
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
    buscarAvanzadoConFacade(query: any): Promise<{
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
    obtenerEstadisticasConFacade(): Promise<{
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
}
