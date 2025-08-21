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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudiantesController = void 0;
const common_1 = require("@nestjs/common");
const estudiantes_service_1 = require("./estudiantes.service");
let EstudiantesController = class EstudiantesController {
    estudiantesService;
    constructor(estudiantesService) {
        this.estudiantesService = estudiantesService;
    }
    async getAll() {
        try {
            return await this.estudiantesService.findAll();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getOne(id) {
        try {
            return await this.estudiantesService.findOne(Number(id));
        }
        catch (error) {
            if (error.message === 'Estudiante no encontrado') {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(data) {
        try {
            return await this.estudiantesService.create(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async update(id, data) {
        try {
            return await this.estudiantesService.update(Number(id), data);
        }
        catch (error) {
            if (error.message === 'Estudiante no encontrado') {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        try {
            return await this.estudiantesService.remove(Number(id));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async search(campo, termino) {
        try {
            if (!termino) {
                throw new common_1.HttpException('Término de búsqueda requerido', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.estudiantesService.search(campo, termino);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async searchAll(termino) {
        try {
            if (!termino) {
                throw new common_1.HttpException('Término de búsqueda requerido', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.estudiantesService.searchAll(termino);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async filterByStatus(estado) {
        try {
            const estadoBoolean = estado.toLowerCase() === 'true';
            return await this.estudiantesService.filterByStatus(estadoBoolean);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getSearchFields() {
        try {
            return await this.estudiantesService.getSearchFields();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerListaParaModulos() {
        try {
            return await this.estudiantesService.obtenerListaParaModulos();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async verificarExistencia(id) {
        try {
            return await this.estudiantesService.verificarEstudianteExiste(Number(id));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerActivosParaModulos() {
        try {
            return await this.estudiantesService.obtenerEstudiantesActivos();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async obtenerModulosRegistrados() {
        try {
            return await this.estudiantesService.obtenerModulosRegistrados();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async registrarModuloExterno(body) {
        try {
            const mockModule = {
                notify: async (event, data) => {
                    console.log(`📨 Módulo ${body.moduleName} recibió:`, { event, data });
                }
            };
            await this.estudiantesService.registrarModuloExterno(body.moduleName, mockModule);
            return {
                message: `Módulo ${body.moduleName} registrado exitosamente`,
                modulosRegistrados: await this.estudiantesService.obtenerModulosRegistrados()
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async registrarConFacade(data) {
        try {
            return await this.estudiantesService.registrarEstudianteFacade(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async actualizarConFacade(id, data) {
        try {
            return await this.estudiantesService.actualizarEstudianteFacade(Number(id), data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async importarConFacade(data) {
        try {
            if (!Array.isArray(data) || data.length === 0) {
                throw new common_1.HttpException('Datos de importación inválidos', common_1.HttpStatus.BAD_REQUEST);
            }
            return await this.estudiantesService.importarEstudiantesFacade(data);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async desactivarConFacade(id) {
        try {
            return await this.estudiantesService.desactivarEstudianteFacade(Number(id));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async reactivarConFacade(id) {
        try {
            return await this.estudiantesService.reactivarEstudianteFacade(Number(id));
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async buscarAvanzadoConFacade(query) {
        try {
            return await this.estudiantesService.buscarAvanzadoFacade(query);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async obtenerEstadisticasConFacade() {
        try {
            return await this.estudiantesService.obtenerEstadisticasFacade();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.EstudiantesController = EstudiantesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('buscar/:campo'),
    __param(0, (0, common_1.Param)('campo')),
    __param(1, (0, common_1.Query)('termino')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('buscar'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "searchAll", null);
__decorate([
    (0, common_1.Get)('filtro/estado'),
    __param(0, (0, common_1.Query)('estado')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "filterByStatus", null);
__decorate([
    (0, common_1.Get)('campos-busqueda'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "getSearchFields", null);
__decorate([
    (0, common_1.Get)('modulo/lista'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "obtenerListaParaModulos", null);
__decorate([
    (0, common_1.Get)('modulo/verificar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "verificarExistencia", null);
__decorate([
    (0, common_1.Get)('modulo/activos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "obtenerActivosParaModulos", null);
__decorate([
    (0, common_1.Get)('mediator/modulos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "obtenerModulosRegistrados", null);
__decorate([
    (0, common_1.Post)('mediator/registrar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "registrarModuloExterno", null);
__decorate([
    (0, common_1.Post)('facade/registrar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "registrarConFacade", null);
__decorate([
    (0, common_1.Put)('facade/actualizar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "actualizarConFacade", null);
__decorate([
    (0, common_1.Post)('facade/importar'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "importarConFacade", null);
__decorate([
    (0, common_1.Post)('facade/desactivar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "desactivarConFacade", null);
__decorate([
    (0, common_1.Post)('facade/reactivar/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "reactivarConFacade", null);
__decorate([
    (0, common_1.Get)('facade/buscar-avanzado'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "buscarAvanzadoConFacade", null);
__decorate([
    (0, common_1.Get)('facade/estadisticas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstudiantesController.prototype, "obtenerEstadisticasConFacade", null);
exports.EstudiantesController = EstudiantesController = __decorate([
    (0, common_1.Controller)('estudiantes'),
    __metadata("design:paramtypes", [estudiantes_service_1.EstudiantesService])
], EstudiantesController);
//# sourceMappingURL=estudiantes.controller.js.map