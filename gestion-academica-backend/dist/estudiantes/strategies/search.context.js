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
exports.SearchContext = void 0;
const common_1 = require("@nestjs/common");
const search_strategy_1 = require("./search.strategy");
let SearchContext = class SearchContext {
    nameStrategy;
    documentStrategy;
    emailStrategy;
    statusStrategy;
    strategies = new Map();
    constructor(nameStrategy, documentStrategy, emailStrategy, statusStrategy) {
        this.nameStrategy = nameStrategy;
        this.documentStrategy = documentStrategy;
        this.emailStrategy = emailStrategy;
        this.statusStrategy = statusStrategy;
        this.strategies.set('nombre', nameStrategy);
        this.strategies.set('apellido', nameStrategy);
        this.strategies.set('documento', documentStrategy);
        this.strategies.set('correo', emailStrategy);
        this.strategies.set('estado', statusStrategy);
    }
    setStrategy(field, strategy) {
        this.strategies.set(field, strategy);
    }
    async executeSearch(field, term) {
        const strategy = this.strategies.get(field);
        if (!strategy) {
            throw new Error(`Estrategia no encontrada para el campo: ${field}`);
        }
        return strategy.search(term);
    }
    async searchAll(term) {
        const results = [];
        for (const strategy of this.strategies.values()) {
            const found = await strategy.search(term);
            results.push(...found);
        }
        const uniqueResults = results.reduce((acc, current) => {
            if (!acc.find(item => item.id === current.id)) {
                acc.push(current);
            }
            return acc;
        }, []);
        return uniqueResults;
    }
    getAvailableSearchFields() {
        return Array.from(this.strategies.keys());
    }
};
exports.SearchContext = SearchContext;
exports.SearchContext = SearchContext = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [search_strategy_1.NameSearchStrategy,
        search_strategy_1.DocumentSearchStrategy,
        search_strategy_1.EmailSearchStrategy,
        search_strategy_1.StatusSearchStrategy])
], SearchContext);
//# sourceMappingURL=search.context.js.map