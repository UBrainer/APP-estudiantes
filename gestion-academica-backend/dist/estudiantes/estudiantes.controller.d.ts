import { EstudiantesService } from './estudiantes.service';
export declare class EstudiantesController {
    private readonly estudiantesService;
    constructor(estudiantesService: EstudiantesService);
    search(campo: string, termino: string): Promise<any[]>;
    searchAll(termino: string): Promise<any[]>;
    filterByStatus(estado: string): Promise<any[]>;
    getSearchFields(): Promise<string[]>;
}
