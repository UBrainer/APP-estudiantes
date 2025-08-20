import { Injectable } from '@nestjs/common';
import { 
  SearchStrategy, 
  NameSearchStrategy, 
  DocumentSearchStrategy, 
  EmailSearchStrategy, 
  StatusSearchStrategy 
} from './search.strategy';

@Injectable()
export class SearchContext {
  private strategies: Map<string, SearchStrategy> = new Map();

  constructor(
    private nameStrategy: NameSearchStrategy,
    private documentStrategy: DocumentSearchStrategy,
    private emailStrategy: EmailSearchStrategy,
    private statusStrategy: StatusSearchStrategy
  ) {
    this.strategies.set('nombre', nameStrategy);
    this.strategies.set('apellido', nameStrategy);
    this.strategies.set('documento', documentStrategy);
    this.strategies.set('correo', emailStrategy);
    this.strategies.set('estado', statusStrategy);
  }

  setStrategy(field: string, strategy: SearchStrategy) {
    this.strategies.set(field, strategy);
  }

  async executeSearch(field: string, term: string): Promise<any[]> {
    const strategy = this.strategies.get(field);
    if (!strategy) {
      throw new Error(`Estrategia no encontrada para el campo: ${field}`);
    }
    return strategy.search(term);
  }

  async searchAll(term: string): Promise<any[]> {
    const results: any[] = [];
    
    for (const strategy of this.strategies.values()) {
      const found = await strategy.search(term);
      results.push(...found);
    }
    
    // Eliminar duplicados usando un Set
    const uniqueResults = results.reduce((acc, current) => {
      if (!acc.find(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, [] as any[]);
    
    return uniqueResults;
  }

  getAvailableSearchFields(): string[] {
    return Array.from(this.strategies.keys());
  }
}