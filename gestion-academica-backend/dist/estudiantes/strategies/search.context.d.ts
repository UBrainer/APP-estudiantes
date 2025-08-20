import { SearchStrategy, NameSearchStrategy, DocumentSearchStrategy, EmailSearchStrategy, StatusSearchStrategy } from './search.strategy';
export declare class SearchContext {
    private nameStrategy;
    private documentStrategy;
    private emailStrategy;
    private statusStrategy;
    private strategies;
    constructor(nameStrategy: NameSearchStrategy, documentStrategy: DocumentSearchStrategy, emailStrategy: EmailSearchStrategy, statusStrategy: StatusSearchStrategy);
    setStrategy(field: string, strategy: SearchStrategy): void;
    executeSearch(field: string, term: string): Promise<any[]>;
    searchAll(term: string): Promise<any[]>;
    getAvailableSearchFields(): string[];
}
