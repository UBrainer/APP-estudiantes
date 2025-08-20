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
let EstudiantesService = class EstudiantesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
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
            return await this.prisma.estudiante.create({
                data: {
                    ...data,
                    estado: true,
                }
            });
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
            return await this.prisma.estudiante.update({
                where: { id },
                data: { ...data, actualizado_en: new Date() }
            });
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
            return { message: 'Estudiante desactivado correctamente', estudiante };
        }
        catch (error) {
            throw new Error(`Error desactivando estudiante: ${error.message}`);
        }
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
    async buscarPorNombre(nombre) {
        try {
            return await this.prisma.estudiante.findMany({
                where: {
                    OR: [
                        { nombre: { contains: nombre, mode: 'insensitive' } },
                        { apellido: { contains: nombre, mode: 'insensitive' } }
                    ]
                }
            });
        }
        catch (error) {
            throw new Error(`Error en búsqueda: ${error.message}`);
        }
    }
};
exports.EstudiantesService = EstudiantesService;
exports.EstudiantesService = EstudiantesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EstudiantesService);
//# sourceMappingURL=estudiantes.service.js.map