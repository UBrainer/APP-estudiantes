"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudiantesModule = void 0;
const common_1 = require("@nestjs/common");
const estudiantes_service_1 = require("./estudiantes.service");
const estudiantes_controller_1 = require("./estudiantes.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const search_strategy_1 = require("./strategies/search.strategy");
const search_context_1 = require("./strategies/search.context");
let EstudiantesModule = class EstudiantesModule {
};
exports.EstudiantesModule = EstudiantesModule;
exports.EstudiantesModule = EstudiantesModule = __decorate([
    (0, common_1.Module)({
        controllers: [estudiantes_controller_1.EstudiantesController],
        providers: [
            estudiantes_service_1.EstudiantesService,
            prisma_service_1.PrismaService,
            search_strategy_1.NameSearchStrategy,
            search_strategy_1.DocumentSearchStrategy,
            search_strategy_1.EmailSearchStrategy,
            search_strategy_1.StatusSearchStrategy,
            search_context_1.SearchContext,
        ],
        exports: [estudiantes_service_1.EstudiantesService],
    })
], EstudiantesModule);
//# sourceMappingURL=estudiantes.module.js.map