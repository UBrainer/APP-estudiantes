import { PrismaClient } from '@prisma/client';
export interface SearchStrategy {
    search(term: string): Promise<any[]>;
}
export declare class NameSearchStrategy implements SearchStrategy {
    private prisma;
    constructor(prisma: PrismaClient);
    search(term: string): Promise<any[]>;
}
export declare class DocumentSearchStrategy implements SearchStrategy {
    private prisma;
    constructor(prisma: PrismaClient);
    search(term: string): Promise<any[]>;
}
export declare class EmailSearchStrategy implements SearchStrategy {
    private prisma;
    constructor(prisma: PrismaClient);
    search(term: string): Promise<any[]>;
}
export declare class StatusSearchStrategy implements SearchStrategy {
    private prisma;
    constructor(prisma: PrismaClient);
    search(term: string): Promise<any[]>;
}
