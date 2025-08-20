"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusSearchStrategy = exports.EmailSearchStrategy = exports.DocumentSearchStrategy = exports.NameSearchStrategy = void 0;
class NameSearchStrategy {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(term) {
        return this.prisma.estudiante.findMany({
            where: {
                OR: [
                    { nombre: { contains: term, mode: 'insensitive' } },
                    { apellido: { contains: term, mode: 'insensitive' } }
                ]
            }
        });
    }
}
exports.NameSearchStrategy = NameSearchStrategy;
class DocumentSearchStrategy {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(term) {
        return this.prisma.estudiante.findMany({
            where: {
                documento: { contains: term, mode: 'insensitive' }
            }
        });
    }
}
exports.DocumentSearchStrategy = DocumentSearchStrategy;
class EmailSearchStrategy {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(term) {
        return this.prisma.estudiante.findMany({
            where: {
                correo: { contains: term, mode: 'insensitive' }
            }
        });
    }
}
exports.EmailSearchStrategy = EmailSearchStrategy;
class StatusSearchStrategy {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async search(term) {
        const status = term.toLowerCase() === 'activo' ? true :
            term.toLowerCase() === 'inactivo' ? false : undefined;
        if (status === undefined)
            return [];
        return this.prisma.estudiante.findMany({
            where: { estado: status }
        });
    }
}
exports.StatusSearchStrategy = StatusSearchStrategy;
//# sourceMappingURL=search.strategy.js.map