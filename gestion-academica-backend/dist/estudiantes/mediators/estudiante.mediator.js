"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteMediator = void 0;
const common_1 = require("@nestjs/common");
let EstudianteMediator = class EstudianteMediator {
    modules = new Map();
    registerModule(moduleName, module) {
        this.modules.set(moduleName, module);
        console.log(`✅ Módulo registrado: ${moduleName}`);
    }
    unregisterModule(moduleName) {
        this.modules.delete(moduleName);
        console.log(`❌ Módulo removido: ${moduleName}`);
    }
    async notifyAll(event, data) {
        const promises = Array.from(this.modules.entries()).map(async ([moduleName, module]) => {
            try {
                await module.notify(event, data);
                console.log(`📢 Notificación enviada a ${moduleName}: ${event}`);
            }
            catch (error) {
                console.error(`❌ Error notificando a ${moduleName}:`, error);
            }
        });
        await Promise.all(promises);
    }
    async notifyModule(moduleName, event, data) {
        const module = this.modules.get(moduleName);
        if (!module) {
            throw new Error(`Módulo no encontrado: ${moduleName}`);
        }
        try {
            await module.notify(event, data);
            console.log(`📢 Notificación enviada a ${moduleName}: ${event}`);
        }
        catch (error) {
            console.error(`❌ Error notificando a ${moduleName}:`, error);
            throw error;
        }
    }
    getRegisteredModules() {
        return Array.from(this.modules.keys());
    }
    isModuleRegistered(moduleName) {
        return this.modules.has(moduleName);
    }
};
exports.EstudianteMediator = EstudianteMediator;
exports.EstudianteMediator = EstudianteMediator = __decorate([
    (0, common_1.Injectable)()
], EstudianteMediator);
//# sourceMappingURL=estudiante.mediator.js.map