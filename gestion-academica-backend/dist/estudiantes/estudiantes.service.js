"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudiantesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const search_context_1 = require("./strategies/search.context");
const search_strategy_1 = require("./strategies/search.strategy");
const estudiante_mediator_1 = require("./mediators/estudiante.mediator");
let EstudiantesService = class EstudiantesService {
    prisma;
    mediator;
    searchContext;
    constructor(prisma, mediator) {
        this.prisma = prisma;
        this.mediator = mediator;
        const nameStrategy = new search_strategy_1.NameSearchStrategy(prisma);
        const documentStrategy = new search_strategy_1.DocumentSearchStrategy(prisma);
        const emailStrategy = new search_strategy_1.EmailSearchStrategy(prisma);
        const statusStrategy = new search_strategy_1.StatusSearchStrategy(prisma);
        this.searchContext = new search_context_1.SearchContext(nameStrategy, documentStrategy, emailStrategy, statusStrategy);
    }
    async findAll() {
        try {
            return await this.prisma.estudiante.findMany({
                orderBy: { creado_en: 'desc' }
            });
        }
        catch (error) {
            throw new Error(`Error obteniendo estudiantes: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const estudiante = await this.prisma.estudiante.findUnique({
                where: { id }
            });
            if (!estudiante) {
                throw new Error('Estudiante no encontrado');
            }
            return estudiante;
        }
        catch (error) {
            throw new Error(`Error obteniendo estudiante: ${error.message}`);
        }
    }
    async create(data) {
        try {
            this.validarDatosEstudiante(data);
            const existe = await this.prisma.estudiante.findFirst({
                where: {
                    OR: [
                        { documento: data.documento },
                        { correo: data.correo }
                    ]
                }
            });
            if (existe) {
                throw new Error('Ya existe un estudiante con ese documento o correo');
            }
            const estudiante = await this.prisma.estudiante.create({
                data: {
                    ...data,
                    estado: true,
                }
            });
            await this.mediator.notifyAll('ESTUDIANTE_CREADO', estudiante);
            return estudiante;
        }
        catch (error) {
            throw new Error(`Error creando estudiante: ${error.message}`);
        }
    }
    async update(id, data) {
        try {
            const existe = await this.prisma.estudiante.findUnique({ where: { id } });
            if (!existe) {
                throw new Error('Estudiante no encontrado');
            }
            const estudiante = await this.prisma.estudiante.update({
                where: { id },
                data: { ...data, actualizado_en: new Date() }
            });
            await this.mediator.notifyAll('ESTUDIANTE_ACTUALIZADO', estudiante);
            return estudiante;
        }
        catch (error) {
            throw new Error(`Error actualizando estudiante: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const estudiante = await this.prisma.estudiante.update({
                where: { id },
                data: { estado: false, actualizado_en: new Date() }
            });
            await this.mediator.notifyAll('ESTUDIANTE_DESACTIVADO', estudiante);
            return { message: 'Estudiante desactivado correctamente', estudiante };
        }
        catch (error) {
            throw new Error(`Error desactivando estudiante: ${error.message}`);
        }
    }
    async search(field, term) {
        try {
            return await this.searchContext.executeSearch(field, term);
        }
        catch (error) {
            throw new Error(`Error en búsqueda: ${error.message}`);
        }
    }
    async searchAll(term) {
        try {
            return await this.searchContext.searchAll(term);
        }
        catch (error) {
            throw new Error(`Error en búsqueda general: ${error.message}`);
        }
    }
    async filterByStatus(estado) {
        try {
            return await this.prisma.estudiante.findMany({
                where: { estado },
                orderBy: { nombre: 'asc' }
            });
        }
        catch (error) {
            throw new Error(`Error filtrando por estado: ${error.message}`);
        }
    }
    async obtenerListaParaModulos() {
        try {
            return await this.prisma.estudiante.findMany({
                where: { estado: true },
                select: {
                    id: true,
                    nombre: true,
                    apellido: true,
                    documento: true,
                    correo: true
                }
            });
        }
        catch (error) {
            throw new Error(`Error obteniendo lista para módulos: ${error.message}`);
        }
    }
    async verificarEstudianteExiste(id) {
        try {
            const estudiante = await this.prisma.estudiante.findUnique({
                where: { id },
                select: { id: true, nombre: true, apellido: true, estado: true }
            });
            return {
                existe: !!estudiante,
                estudiante,
                activo: estudiante?.estado || false
            };
        }
        catch (error) {
            throw new Error(`Error verificando estudiante: ${error.message}`);
        }
    }
    async obtenerEstudiantesActivos() {
        try {
            return await this.prisma.estudiante.findMany({
                where: { estado: true },
                orderBy: { nombre: 'asc' }
            });
        }
        catch (error) {
            throw new Error(`Error obteniendo estudiantes activos: ${error.message}`);
        }
    }
    getSearchFields() {
        return this.searchContext.getAvailableSearchFields();
    }
    getMediator() {
        return this.mediator;
    }
    async registrarModuloExterno(moduleName, module) {
        this.mediator.registerModule(moduleName, module);
    }
    async obtenerModulosRegistrados() {
        return this.mediator.getRegisteredModules();
    }
    validarDatosEstudiante(data) {
        const requiredFields = ['nombre', 'apellido', 'documento', 'correo', 'fecha_nacimiento'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.correo)) {
            throw new Error('Formato de correo electrónico inválido');
        }
        if (isNaN(new Date(data.fecha_nacimiento).getTime())) {
            throw new Error('Fecha de nacimiento inválida');
        }
    }
};
exports.EstudiantesService = EstudiantesService;
exports.EstudiantesService = EstudiantesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        estudiante_mediator_1.EstudianteMediator])
], EstudiantesService);
//# sourceMappingURL=estudiantes.service.js.map